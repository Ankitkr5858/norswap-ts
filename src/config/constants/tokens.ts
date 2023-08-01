import { ChainId, Token } from '@danielvindax/norswap-sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

export const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  wnrk: new Token(
    MAINNET,
    '0x9c294d255fBBf8E7bBb510D7E29e99c22D5962a8',
    18,
    'WNRK',
    'Wrapped NRK',
    'https://nordekscan.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  nrk: new Token(MAINNET, '0x9c294d255fBBf8E7bBb510D7E29e99c22D5962a8', 18, 'NRK', 'NRK', 'https://nordekscan.com/'),
  nswap: new Token(MAINNET, '0xb2056F916E2485bE08e25246974a1c88d8F57F9E', 18, 'NSWAP', 'NSWAP', 'https://nordekscan.com/'),
  
  lazio: new Token(
    MAINNET,
    '0x9dc4Cc360E50051EBaF6Cd34da8AFcD5f1ee2dc5',
    18,
    'LAZIO',
    'LAZIO',
    'https://tether.to/',
  ),
  porto: new Token(
    MAINNET,
    '0x9dc4Cc360E50051EBaF6Cd34da8AFcD5f1ee2dc5',
    18,
    'PORTO',
    'PORTO',
    'https://tether.to/',
  ),
  santos: new Token(
    MAINNET,
    '0x5ac338e348b7229A00d7CB1670F94e621514a4d8',
    18,
    'SANTOS',
    'SANTOS',
    'https://tether.to/',
  ),
  mbox: new Token(
    MAINNET,
    '0xfeb9A7ae1B42E46509cE917CC5B42fF5FF332B88',
    18,
    'MBOX',
    'MBOX',
    'https://tether.to/',
  ),
  dar: new Token(
    MAINNET,
    '0xa885f5BCDA64E5BcC76Df95dB0D2996A54d8a16b',
    18,
    'MBOX',
    'MBOX',
    'https://tether.to/',
  ),


  nusdt: new Token(
    MAINNET,
    '0x588119D82871d7EC88C1070A2c066A2be2dF36e1',
    18,
    'NUSDT',
    'NUSDT',
    'https://tether.to/',
  ),
  nusd: new Token(
    MAINNET,
    '0xE6CC1ede4E42b5d7b49B403D9056C9D444848836',
    18,
    'NUSD',
    'NUSD',
    '',
  ),
  syrup: new Token(
    MAINNET,
    '0xD4e84480993b0a463555DE8999dF54252fbEF953',
    18,
    'SYRUP',
    'SYRUP',
    '',
  ),
  flx: new Token(
    MAINNET,
    '0x5e3FAbb10368997D1e26883FaF9aFC1687d7Ea7A',
    18,
    'DICEX',
    'DICEX',
    '',
  ),
  
  // cbs: new Token(
  //   MAINNET,
  //   '0x3b95bB738447a27eB256DE4Cf2D7727D9595ECb9',
  //   18,
  //   'CBS',
  //   'CARBUNCLES',
  //   '',
  // ),
  // eld: new Token(
  //   MAINNET,
  //   '0xcbD98D548315c321ab05d4fe964b4Dc838CA51cf',
  //   18,
  //   'ELD',
  //   'EMERALD',
  //   '',
  // ),
  // sas: new Token(
  //   MAINNET,
  //   '0x3a945Ccf05001d34208b3336b2735F399f8065CB',
  //   18,
  //   'SAS',
  //   'SARDIUS',
  //   '',
  // ),
  // bel: new Token(
  //   MAINNET,
  //   '0x48177d55a2931372dB6662f92a7Dd33c3D471B19',
  //   18,
  //   'BEL',
  //   'BERYL',
  //   '',
  // ),
  // dai: new Token(
  //   MAINNET,
  //   '0x8c9513EC3075904Edd9423Fbfa4B367085D9080a',
  //   18,
  //   'DAI',
  //   'DAI',
  //   'https://binance.com/',
  // ),
  // btcb: new Token(
  //   MAINNET,
  //   '0x43f5e794C6167a7BdEA2CB930458FB0aE63593bF',
  //   18,
  //   'BTC',
  //   'Bitcoin Token',
  //   'https://bitcoin.org/',
  // ), 
  // zec: new Token(
  //   MAINNET,
  //   '0x7Fd90641AcD65d5cE9a0c54731A54b1d4BaE5d75',
  //   18,
  //   'ZEC',
  //   'Zcash Token',
  //   'https://www.z.cash/',
  // ),
} as const)

export const testnetTokens = defineTokens({
  wnrk: new Token(
    TESTNET,
    '0x9c294d255fBBf8E7bBb510D7E29e99c22D5962a8',
    18,
    'WNRK',
    'Wrapped NRK',
    'https://nordekscan.com/',
  ),
  nswap: new Token(
    TESTNET,
    '0xfdA0F4361258dFD4Cc7f936285874605e46a490D',
    18,
    'NSWAP',
    'NSWAP Token',
    'http://norswap.io/',
  ),
  nusd: new Token(
    TESTNET,
    '0x8B92eD4F4A663F75561c452caf4fdA801eFefCCd',
    18,
    'NUSD',
    'NSWAP Smart USD',
    '',
  ),
  syrup: new Token(
    TESTNET,
    '0x12f369B5a821f56924970262670b1aA10b0D62fF',
    18,
    'SYRUP',
    'SyrupBar Token',
    'http://norswap.io/',
  ),
  // bake: new Token(
  //   TESTNET,
  //   '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
  //   18,
  //   'BAKE',
  //   'Bakeryswap Token',
  //   'https://www.bakeryswap.org/',
  // ),
} as const)

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
