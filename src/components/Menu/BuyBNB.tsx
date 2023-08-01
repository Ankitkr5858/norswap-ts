import { Box, Button, CakePrice, Flex, Text } from '@nswap/uikit'
import { CurrencyLogo } from 'components/Logo'

const BuyBNB = ({ currency, lpTokenPriceInUsd, buyBNBLabel }) => {
  return (
    <Flex order={[1, null, 2]} mb={['24px', null, '0']} justifyContent="space-between" alignItems="center">
      <Flex mr="20px">
        <CurrencyLogo currency={currency} size="34px" style={{ marginRight: '8px',height: '22px' }} />
        {/* <Text color="contrast" ml="10px" bold>{`${lpTokenPriceInUsd.toFixed(8)}`}</Text> */}
      </Flex>
      <Button
        as="a"
        href="/swap?inputCurrency=0xb2056F916E2485bE08e25246974a1c88d8F57F9E&outputCurrency=NRK"
        target="_blank"
        scale="sm"
        // endIcon={<ArrowForwardIcon color={lightColors.backgroundAlt} />}
        style={{ color: '#ffffff' }}
      >
        {buyBNBLabel}
      </Button>
    </Flex>
  )
}

export default BuyBNB
