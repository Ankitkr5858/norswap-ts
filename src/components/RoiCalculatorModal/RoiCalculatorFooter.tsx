// @ts-nocheck
// @ts-nocheck
import { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text, ExpandableLabel, LinkExternal, Grid, HelpIcon, useTooltip } from '@nswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getApy } from 'utils/compoundApyHelpers'

const Footer = styled(Flex)`
  width: 100%;
  background: ${({ theme }) => theme.colors.dropdown};
`

const BulletList = styled.ul`
  list-style-type: none;
  margin-top: 16px;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.contrast};
  }
  li::marker {
    font-size: 12px;
  }
`

interface RoiCalculatorFooterProps {
  isFarm: boolean
  apr?: number
  apy?: number
  displayApr: string
  autoCompoundFrequency: number
  multiplier: string
  linkLabel: string
  linkHref: string
  performanceFee: number
}

const RoiCalculatorFooter: React.FC<RoiCalculatorFooterProps> = ({
  isFarm,
  apr,
  apy,
  displayApr,
  autoCompoundFrequency,
  multiplier,
  linkLabel,
  linkHref,
  performanceFee,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  const {
    targetRef: multiplierRef,
    tooltip: multiplierTooltip,
    tooltipVisible: multiplierTooltipVisible,
  } = useTooltip(
    <>
      <Text>
        {t(
          'The Multiplier represents the proportion of NSWAP rewards each farm receives, as a proportion of the NSWAP produced each block.',
        )}
      </Text>
      <Text my="24px">
        {t('For example, if a 1x farm received 1 NSWAP per block, a 40x farm would receive 40 NSWAP per block.')}
      </Text>
      <Text>{t('This amount is already included in all APR calculations for the farm.')}</Text>
    </>,
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  const gridRowCount = isFarm ? 4 : 2

  return (
    <Footer p="16px" flexDirection="column">
      <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? t('Hide') : t('Details')}
      </ExpandableLabel>
      {isExpanded && (
        <Box px="8px">
          <Grid gridTemplateColumns="2.5fr 1fr" gridRowGap="8px" gridTemplateRows={`repeat(${gridRowCount}, auto)`}>
            {isFarm && (
              <>
                <Text color="contrast" small>
                  {t('APR (incl. LP rewards)')}
                </Text>
                <Text small color="contrast" textAlign="right">
                  {displayApr}%
                </Text>
              </>
            )}
            {!Number.isFinite(apy) ? (
              <Text color="contrast" small>
                {isFarm ? t('Base APR (NSWAP yield only)') : t('APR')}
              </Text>
            ) : (
              <Text color="contrast" small>
                {t('APY')}
              </Text>
            )}
            <Text small color="contrast" textAlign="right">
              {(apy ?? apr ?? 0).toFixed(2)}%
            </Text>
            {!Number.isFinite(apy) && (
              <Text color="contrast" small>
                {t('APY (%compoundTimes%x daily compound)', {
                  compoundTimes: autoCompoundFrequency > 0 ? autoCompoundFrequency : 1,
                })}
              </Text>
            )}
            {!Number.isFinite(apy) && (
              <Text small color="contrast" textAlign="right">
                {(
                  getApy(apr, autoCompoundFrequency > 0 ? autoCompoundFrequency : 1, 365, performanceFee) * 100
                ).toFixed(2)}
                %
              </Text>
            )}
            {isFarm && (
              <>
                <Text color="contrast" small>
                  {t('Farm Multiplier')}
                </Text>
                <Flex justifyContent="flex-end" alignItems="flex-end">
                  <Text small color="contrast" textAlign="right" mr="4px">
                    {multiplier}
                  </Text>
                  <span ref={multiplierRef}>
                    <HelpIcon color="contrast" width="16px" height="16px" />
                  </span>
                  {multiplierTooltipVisible && multiplierTooltip}
                </Flex>
              </>
            )}
          </Grid>
          <BulletList>
            <li>
              <Text fontSize="12px" textAlign="center" color="contrast" display="inline" lineHeight={1.1}>
                {t('Calculated based on current rates.')}
              </Text>
            </li>
            {isFarm && (
              <li>
                <Text fontSize="12px" textAlign="center" color="contrast" display="inline">
                  {t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
                </Text>
              </li>
            )}
            <li>
              <Text fontSize="12px" textAlign="center" color="contrast" display="inline" lineHeight={1.1}>
                {t(
                  'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.',
                )}
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text mt="14px" fontSize="12px" textAlign="center" color="contrast" display="inline">
                  {t('All estimated rates take into account this pool’s %fee%% performance fee', {
                    fee: performanceFee,
                  })}
                </Text>
              </li>
            )}
          </BulletList>
          <Flex justifyContent="center" mt="24px">
            <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
          </Flex>
        </Box>
      )}
    </Footer>
  )
}

export default RoiCalculatorFooter
