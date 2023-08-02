// @ts-nocheck
import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    81041: '0xb2056F916E2485bE08e25246974a1c88d8F57F9E',
    58875: '0xfdA0F4361258dFD4Cc7f936285874605e46a490D',
  }

  it(`get address for mainnet (chainId 81041)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '81041'
    const expected = address[81041]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 58875)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '58875'
    const expected = address[58875]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.NEXT_PUBLIC_CHAIN_ID = '31337'
    const expected = address[81041]
    expect(getAddress(address)).toEqual(expected)
  })
})
