// @ts-nocheck
// @ts-nocheck
import styled from 'styled-components'
import { Card, CardHeader, Box, Heading, Text } from '@nswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PrizesGrid from '../../../components/PrizesInfo/PrizesGrid/PrizesGrid'
import { mboxPrizes } from '../../../../../config/constants/trading-competition/prizes'

const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`

const MoboxPrizesCard = () => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <CardHeader>
        <Heading scale="lg" color="secondary">
          {t('Prizes by Team')}
        </Heading>
        <Text color="textSubtle" fontSize="14px">
          {t('Higher trading volume = higher rank!')}
        </Text>
      </CardHeader>
      <PrizesGrid prizesConfig={mboxPrizes} />
      <Box p="24px">
        <Text color="textSubtle" fontSize="14px">
          {t(
            'Prizes to be distributed in NSWAP and DAR in a distribution of 1:5 and shared by all members of each respective tier. The price of token prizes ($NSWAP and $DAR) in USD will be determined as per their NUSD pair price during the tally period.',
          )}
        </Text>
      </Box>
    </StyledCard>
  )
}

export default MoboxPrizesCard
