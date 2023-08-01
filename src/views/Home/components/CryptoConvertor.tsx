import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CurrencyAmount, Token, Trade } from "@danielvindax/norswap-sdk";
import { computeTradePriceBreakdown, warningSeverity } from "utils/exchange";
import {
  Button,
  Text,
  ArrowDownIcon,
  Box,
  useModal,
  Flex,
  IconButton,
  BottomDrawer,
  ArrowUpDownIcon,
  Skeleton,
  useMatchBreakpointsContext,
} from "@nswap/uikit";
import { useIsTransactionUnsupported } from "hooks/Trades";
import UnsupportedCurrencyFooter from "components/UnsupportedCurrencyFooter";
import Footer from "components/Menu/Footer";
import { useRouter } from "next/router";
import { useTranslation } from "contexts/Localization";
import { EXCHANGE_DOCS_URLS } from "config/constants";
import { BIG_INT_ZERO } from "config/constants/exchange";
import { maxAmountSpend } from "utils/maxAmountSpend";
import shouldShowSwapWarning from "utils/shouldShowSwapWarning";
import { useWeb3React } from "@web3-react/core";
import { useSwapActionHandlers } from "state/swap/useSwapActionHandlers";
import useRefreshBlockNumberID from "../../Swap/hooks/useRefreshBlockNumber";
import AddressInputPanel from "views/Swap/components/AddressInputPanel";
import Card, { GreyCard } from "components/Card";
import Column, { AutoColumn } from "components/Layout/Column";
import ConfirmSwapModal from "views/Swap/components/ConfirmSwapModal";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import BannerInputPanel from "components/CurrencyInputPanel/BannerInputPanel";

import { AutoRow, RowBetween } from "components/Layout/Row";
import { AdvancedSwapDetails } from "views/Swap/components/AdvancedSwapDetails";
import confirmPriceImpactWithoutFee from "views/Swap/components/confirmPriceImpactWithoutFee";
import {
  ArrowWrapper,
  Wrapper,
  SwapCallbackError,
} from "views/Swap/components/styleds";
import TradePrice from "views/Swap/components/TradePrice";
import ProgressSteps from "views/Migration/components/ProgressSteps";
import { AppBody } from "components/App";
import ConnectWalletButton from "components/ConnectWalletButton";
import { useCurrency, useAllTokens } from "hooks/Tokens";
import {
  ApprovalState,
  useApproveCallbackFromTrade,
} from "hooks/useApproveCallback";
import { useSwapCallback } from "hooks/useSwapCallback";

useWrapCallback;
import { Field } from "state/swap/actions";
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapState,
  useSingleTokenSwapInfo,
} from "state/swap/hooks";
import {
  useExpertModeManager,
  useUserSlippageTolerance,
  useUserSingleHopOnly,
  useExchangeChartManager,
} from "state/user/hooks";
import CircleLoader from "components/Loader/CircleLoader";
import Page from "views/Page";
import SwapWarningModal from "views/Swap/components/SwapWarningModal";
import PriceChartContainer from "views/Swap/components/Chart/PriceChartContainer";
import {
  StyledInputCurrencyWrapper,
  StyledSwapContainer,
} from "views/Swap/styles";
import CurrencyInputHeader from "views/Swap/components/CurrencyInputHeader";
import ImportTokenWarningModal from "components/ImportTokenWarningModal";
import useWrapCallback, { WrapType } from "hooks/useWrapCallback";
import AdvancedSwapDetailsDropdown from "views/Swap/components/AdvancedSwapDetailsDropdown";
import BannerCurrencyInputPanel from "components/CurrencyInputPanel/BannerCurrencyInputValue";

const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: #009ee2;
`;

const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  .icon-up-down {
    display: none;
  }
  &:hover {
    background-color: #009ee2;
    .icon-down {
      display: none;
      fill: white;
    }
    .icon-up-down {
      display: block;
      fill: white;
    }
  }
`;

const CryptoConvertor = () => {
  const router = useRouter();
  const loadedUrlParams = useDefaultsFromURLSearch();
  const { t } = useTranslation();
  const { isMobile } = useMatchBreakpointsContext();
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [userChartPreference, setUserChartPreference] =
    useExchangeChartManager(isMobile);
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference);
  const { refreshBlockNumber, isLoading } = useRefreshBlockNumberID();

  useEffect(() => {
    setUserChartPreference(isChartDisplayed);
  }, [isChartDisplayed, setUserChartPreference]);

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ];
  const urlLoadedTokens: Token[] = useMemo(
    () =>
      [loadedInputCurrency, loadedOutputCurrency]?.filter(
        (c): c is Token => c instanceof Token
      ) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  );

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens();
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens);
    });

  const { account } = useWeb3React();

  // for expert mode
  const [isExpertMode] = useExpertModeManager();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // swap state & price data
  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);
  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo(
    independentField,
    typedValue,
    inputCurrency,
    outputCurrency,
    recipient
  );

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  );
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const trade = showWrap ? undefined : v2Trade;

  const singleTokenPrice = useSingleTokenSwapInfo(
    inputCurrencyId,
    inputCurrency,
    outputCurrencyId,
    outputCurrency
  );

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]:
          independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]:
          independentField === Field.OUTPUT
            ? parsedAmount
            : trade?.outputAmount,
      };

  const {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
  } = useSwapActionHandlers();
  const isValid = !swapInputError;
  const dependentField: Field =
    independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput]
  );
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput]
  );

  // modal and loading
  const [
    { tradeToConfirm, swapErrorMessage, attemptingTxn, txHash },
    setSwapState,
  ] = useState<{
    tradeToConfirm: Trade | undefined;
    attemptingTxn: boolean;
    swapErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  });

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ""
      : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  };

  const route = trade?.route;
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] &&
      currencies[Field.OUTPUT] &&
      parsedAmounts[independentField]?.greaterThan(BIG_INT_ZERO)
  );
  const noRoute = !route;

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(
    trade,
    allowedSlippage
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(
    currencyBalances[Field.INPUT]
  );
  const atMaxAmountInput = Boolean(
    maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput)
  );

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient
  );

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);

  const [singleHopOnly] = useUserSingleHopOnly();

  const handleSwap = useCallback(() => {
    if (
      priceImpactWithoutFee &&
      !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)
    ) {
      return;
    }
    if (!swapCallback) {
      return;
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      swapErrorMessage: undefined,
      txHash: undefined,
    });
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        });
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        });
      });
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t]);

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false);

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode);

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, "");
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
    });
  }, [attemptingTxn, swapErrorMessage, trade, txHash]);

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null);
  const [onPresentSwapWarningModal] = useModal(
    <SwapWarningModal swapCurrency={swapWarningCurrency} />,
    false
  );

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency]);

  const handleInputSelect = useCallback(
    (currencyInput) => {
      setApprovalSubmitted(false); // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, currencyInput);
      const showSwapWarning = shouldShowSwapWarning(currencyInput);
      if (showSwapWarning) {
        setSwapWarningCurrency(currencyInput);
      } else {
        setSwapWarningCurrency(null);
      }
    },
    [onCurrencySelection]
  );

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact());
    }
  }, [maxAmountInput, onUserInput]);

  const handleOutputSelect = useCallback(
    (currencyOutput) => {
      onCurrencySelection(Field.OUTPUT, currencyOutput);
      const showSwapWarning = shouldShowSwapWarning(currencyOutput);
      if (showSwapWarning) {
        setSwapWarningCurrency(currencyOutput);
      } else {
        setSwapWarningCurrency(null);
      }
    },

    [onCurrencySelection]
  );

  const swapIsUnsupported = useIsTransactionUnsupported(
    currencies?.INPUT,
    currencies?.OUTPUT
  );

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal
      tokens={importTokensNotInDefault}
      onCancel={() => router.push("/swap")}
    />
  );

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length]);

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    "confirmSwapModal"
  );

  const hasAmount = Boolean(parsedAmount);

  const onRefreshPrice = useCallback(() => {
    if (hasAmount) {
      refreshBlockNumber();
    }
  }, [hasAmount, refreshBlockNumber]);

  return (
    <Flex width="100%" justifyContent="center" position="relative">
      <Flex width="100%" flexDirection="column">
        <Wrapper width="100%" id="swap-page" style={{ padding: "0" }}>
          <AutoColumn gap="sm">
            <Flex
              width="100%"
              className="inputFieldWrapper"
              flexDirection="row"
            >
              <BannerInputPanel
                label={
                  independentField === Field.OUTPUT && !showWrap && trade
                    ? t("From (estimated)")
                    : t("From")
                }
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />

              <AutoColumn justify="space-between">
                <AutoRow
                  width="100%"
                  justify={isExpertMode ? "space-between" : "center"}
                //   style={{ padding: "0 1rem" }}
                >
                  <SwitchIconButton
                    variant="light"
                    scale="sm"
                    onClick={() => {
                      setApprovalSubmitted(false); // reset 2 step UI for approvals
                      onSwitchTokens();
                    }}
                  >
                    <ArrowDownIcon
                      className="icon-down"
                      color={
                        currencies[Field.INPUT] && currencies[Field.OUTPUT]
                          ? "#009EE2"
                          : "text"
                      }
                    />
                    <ArrowUpDownIcon
                      className="icon-up-down"
                      color={
                        currencies[Field.INPUT] && currencies[Field.OUTPUT]
                          ? "primary"
                          : "text"
                      }
                    />
                  </SwitchIconButton>
                  {recipient === null && !showWrap && isExpertMode ? (
                    <Button
                      variant="text"
                      id="add-recipient-button"
                      onClick={() => onChangeRecipient("")}
                    >
                      {t("+ Add a send (optional)")}
                    </Button>
                  ) : null}
                </AutoRow>
              </AutoColumn>
              <BannerCurrencyInputPanel
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                label={
                  independentField === Field.INPUT && !showWrap && trade
                    ? t("To (estimated)")
                    : t("To")
                }
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                id="swap-currency-output"
              />
            </Flex>
          </AutoColumn>

          {/* <Box mt="0.25rem">
                  {swapIsUnsupported ? (
                    <Button width="100%" disabled>
                      {t("Unsupported Asset")}
                    </Button>
                  ) : !account ? (
                    <ConnectWalletButton width="100%" />
                  ) : showWrap ? (
                    <Button
                      width="100%"
                      disabled={Boolean(wrapInputError)}
                      onClick={onWrap}
                    >
                      {wrapInputError ??
                        (wrapType === WrapType.WRAP
                          ? "Wrap"
                          : wrapType === WrapType.UNWRAP
                          ? "Unwrap"
                          : null)}
                    </Button>
                  ) : noRoute && userHasSpecifiedInputOutput ? (
                    <GreyCard
                      style={{ textAlign: "center", padding: "0.75rem" }}
                    >
                      <Text color="white">
                        {t("Insufficient liquidity for this trade.")}
                      </Text>
                      {singleHopOnly && (
                        <Text color="white">
                          {t("Try enabling multi-hop trades.")}
                        </Text>
                      )}
                    </GreyCard>
                  ) : showApproveFlow ? (
                    <RowBetween>
                      <Button
                        variant={
                          approval === ApprovalState.APPROVED
                            ? "success"
                            : "primary"
                        }
                        onClick={approveCallback}
                        disabled={
                          approval !== ApprovalState.NOT_APPROVED ||
                          approvalSubmitted
                        }
                        width="48%"
                      >
                        {approval === ApprovalState.PENDING ? (
                          <AutoRow gap="6px" justify="center">
                            {t("Enabling")} <CircleLoader stroke="white" />
                          </AutoRow>
                        ) : approvalSubmitted &&
                          approval === ApprovalState.APPROVED ? (
                          t("Enabled")
                        ) : (
                          t("Enable %asset%", {
                            asset: currencies[Field.INPUT]?.symbol ?? "",
                          })
                        )}
                      </Button>
                      <Button
                        variant={
                          isValid && priceImpactSeverity > 2
                            ? "danger"
                            : "primary"
                        }
                        onClick={() => {
                          if (isExpertMode) {
                            handleSwap();
                          } else {
                            setSwapState({
                              tradeToConfirm: trade,
                              attemptingTxn: false,
                              swapErrorMessage: undefined,
                              txHash: undefined,
                            });
                            onPresentConfirmModal();
                          }
                        }}
                        width="48%"
                        id="swap-button"
                        disabled={
                          !isValid ||
                          approval !== ApprovalState.APPROVED ||
                          (priceImpactSeverity > 3 && !isExpertMode)
                        }
                      >
                        {priceImpactSeverity > 3 && !isExpertMode
                          ? t("Price Impact High")
                          : priceImpactSeverity > 2
                          ? t("Swap Anyway")
                          : t("Swap")}
                      </Button>
                    </RowBetween>
                  ) : (
                    <Button
                      variant={
                        isValid && priceImpactSeverity > 2 && !swapCallbackError
                          ? "danger"
                          : "primary"
                      }
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap();
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            txHash: undefined,
                          });
                          onPresentConfirmModal();
                        }
                      }}
                      id="swap-button"
                      width="100%"
                      disabled={
                        !isValid ||
                        (priceImpactSeverity > 3 && !isExpertMode) ||
                        !!swapCallbackError
                      }
                    >
                      {swapInputError ||
                        (priceImpactSeverity > 3 && !isExpertMode
                          ? t("Price Impact Too High")
                          : priceImpactSeverity > 2
                          ? t("Swap Anyway")
                          : t("Swap"))}
                    </Button>
                  )}
                  {showApproveFlow && (
                    <Column style={{ marginTop: "1rem" }}>
                      <ProgressSteps
                        steps={[approval === ApprovalState.APPROVED]}
                      />
                    </Column>
                  )}
                  {isExpertMode && swapErrorMessage ? (
                    <SwapCallbackError error={swapErrorMessage} />
                  ) : null}
                </Box> */}
        </Wrapper>

        <Flex justifyContent="center" mt="15px">
          <Text ml="15px" mb="6px" color="#858585">
            Slippage Tolerance
          </Text>
          <Text ml="15px" color="#949494">
            {allowedSlippage / 100}%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CryptoConvertor;
