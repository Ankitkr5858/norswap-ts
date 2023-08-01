import { Currency, ETHER, Token } from '@danielvindax/norswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'NRK'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
