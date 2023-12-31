// @ts-nocheck
// @ts-nocheck
import { Currency, Pair, Token } from "@danielvindax/norswap-sdk";
import {
  Button,
  ChevronDownIcon,
  Text,
  useModal,
  Flex,
  Box,
  MetamaskIcon,
} from "@nswap/uikit";
import styled from "styled-components";
import { registerToken } from "utils/wallet";
import { isAddress } from "utils";
import { useTranslation } from "contexts/Localization";
import { WrappedTokenInfo } from "state/types";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useCurrencyBalance } from "../../state/wallet/hooks";
import CurrencySearchModal from "../SearchModal/CurrencySearchModal";
import { CurrencyLogo, DoubleCurrencyLogo } from "../Logo";

import { Input as NumericalInput } from "./NumericalInput";
import { CopyButton } from "../CopyButton";

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) =>
    selected ? "0.75rem 0.5rem 0.75rem 1rem" : "0.75rem 0.75rem 0.75rem 1rem"};
`;
const CurrencySelectButton = styled(Button).attrs({
  variant: "text",
  scale: "sm",
})`
  padding: 0 0.5rem;
`;
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background: #121212;
  border-radius: 100px;
`;
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  z-index: 1;
  min-width: 28%;
  @media(min-width:768px){
    min-width: 74%;
  }
`;
const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`;
interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect: (currency: Currency) => void;
  currency?: Currency | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  otherCurrency?: Currency | null;
  id: string;
  showCommonBases?: boolean;
}
export default function BannerCurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account, library } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(
    account ?? undefined,
    currency ?? undefined
  );
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation();

  const token = pair
    ? pair.liquidityToken
    : currency instanceof Token
    ? currency
    : null;
  const tokenAddress = token ? isAddress(token.address) : null;

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />
  );
  return (
    <Flex position="relative" id={id}>
      <Flex
        mb="6px"
        alignItems="center"
        className="selectorWrapper"
        justifyContent="space-between"
        // mt="30px"
      >
        <Flex>
          <CurrencySelectButton
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal();
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo
                  currency0={pair.token0}
                  currency1={pair.token1}
                  size={16}
                  margin
                />
              ) : currency ? (
                <CurrencyLogo
                  currency={currency}
                  size="24px"
                  style={{ marginRight: "8px" }}
                />
              ) : null}
              {pair ? (
                <Text id="pair" bold color="#fff">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" bold color="#fff">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length
                      )}`
                    : currency?.symbol) || t("Select a currency")}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon  />}
            </Flex>
          </CurrencySelectButton>
        </Flex>
        {account && (
          <Text
            onClick={onMax}
            color="#000000"
            fontSize="14px"
            style={{ display: "inline", cursor: "pointer" }}
          >
            {!hideBalance && !!currency
              ? t("Balance: %balance%", {
                  balance:
                    selectedCurrencyBalance?.toSignificant(6) ?? t("Loading"),
                })
              : " -"}
          </Text>
        )}
      </Flex>
      {/* <Flex width="40%" flexDirection="column">
        <Text ml="auto" mb="6px" color="#858585">
          to
        </Text> */}
        <InputPanel>
          <LabelRow>
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val);
              }}
            />
          </LabelRow>
        </InputPanel>
      {/* </Flex> */}
    </Flex>
  );
}
