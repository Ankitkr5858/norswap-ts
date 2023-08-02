// @ts-nocheck
import { JSBI, Token, TokenAmount } from '@danielvindax/norswap-sdk'
import getPriceForOneToken from './getPriceForOneToken'

const NSWAP = new Token(81041, '0xb2056F916E2485bE08e25246974a1c88d8F57F9E', 18, 'NSWAP', 'NSWAP Token')
const NUSD = new Token(81041, '0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288', 18, 'NUSD', 'Binance USD')
const DOGE = new Token(81041, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 8, 'DOGE', 'Binance-Peg Dogecoin')

const EIGHT_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(8))
const EIGHTEEN_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
const ZERO = JSBI.multiply(JSBI.BigInt(0), EIGHTEEN_DECIMALS)
const ONE = JSBI.multiply(JSBI.BigInt(1), EIGHTEEN_DECIMALS)
const ONE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(1), EIGHT_DECIMALS)
const FIVE = JSBI.multiply(JSBI.BigInt(5), EIGHTEEN_DECIMALS)
const FIVE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(5), EIGHT_DECIMALS)

describe('limitOrders/utils/getPriceForOneToken', () => {
  describe.each([
    [new TokenAmount(NSWAP, ONE), new TokenAmount(NUSD, ONE), '1'],
    [new TokenAmount(NSWAP, FIVE), new TokenAmount(NUSD, FIVE), '1'],
    [new TokenAmount(NSWAP, ONE), new TokenAmount(NUSD, FIVE), '5'],
    [new TokenAmount(NSWAP, FIVE), new TokenAmount(NUSD, ONE), '0.2'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(NUSD, ONE), '1'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(NUSD, FIVE), '1'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(NUSD, FIVE), '5'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(NUSD, ONE), '0.2'],
    [new TokenAmount(NSWAP, ZERO), new TokenAmount(NUSD, ONE), undefined],
    [new TokenAmount(NSWAP, ONE), new TokenAmount(NUSD, ZERO), undefined],
  ])(`returns correct price`, (input, output, expected) => {
    it(`for ${input.toSignificant(6)} ${input.currency.symbol} -> ${output.toSignificant(6)} ${
      output.currency.symbol
    }`, () => {
      const price = getPriceForOneToken(input, output)
      expect(price?.toSignificant(6)).toBe(expected)
    })
  })
})
