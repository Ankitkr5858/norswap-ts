import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
   {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'NSWAP',
    lpAddresses: {
      58875: '0xfdA0F4361258dFD4Cc7f936285874605e46a490D',
      81041: '0xb2056F916E2485bE08e25246974a1c88d8F57F9E',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wnrk,
  },
  {
    pid: 2,
    // v1pid: 1,
    lpSymbol: 'NSWAP-NRK LP',
    lpAddresses: {
      58875: '0x04a87d67A487C38089736C738aEBc13D6B981c76',
      81041: '0x084a20597c84Cb5561fD4FCE205673100d60Eaed',
    },
    token: serializedTokens.nswap,
    quoteToken: serializedTokens.wnrk,
  },
  {
    pid: 3,
    // v1pid: 2,
    lpSymbol: 'NUSD-NRK LP',
    lpAddresses: {
      58875: '0xc8EdeC730CC6aBb57c213c840633071164357357',
      81041: '0x032785a375eff4E4c7323c25a6E13bdEC33A37C5',
    },
    token: serializedTokens.nusd,
    quoteToken: serializedTokens.wnrk,
  },
  //    * V3 by order of release (some may be out of PID order due to multiplier boost)
  {
    pid: 4,
    // v1pid: 3,
    lpSymbol: 'NUSDT-NRK LP',
    lpAddresses: {
      58875: '0x0DC8b02c393B3FD37dA5B3944Ad9d301377C5849',
      81041: '0x3752d0Ca09bAADfD0bE9900922e2859161a861DF',
    },
    token: serializedTokens.nusdt,
    quoteToken: serializedTokens.wnrk,
  },
  // {
  //   pid: 5,
  //   lpSymbol: 'ETH-NRK LP',
  //   lpAddresses: {
  //     58875: '',
  //     81041: '0xD30916af2D1E8F5da477057A95958e724528bcCa',
  //   },
  //   token: serializedTokens.eth,
  //   quoteToken: serializedTokens.wnrk,
  // },


  
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
