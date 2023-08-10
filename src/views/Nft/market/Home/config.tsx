// @ts-nocheck
// @ts-nocheck
import { LinkExternal } from '@nswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config = (t: ContextApi['t']) => {
  return [
    {
      title: t('I sold an NFT, where’s my NRK?'),
      description: [
        t(
          'Trades are settled in WNRK, which is a wrapped version of NRK used on NRK Smart Chain. That means that when you sell an item, WNRK is sent to your wallet instead of NRK.',
        ),
        t('You can instantly swap your WNRK for NRK with no trading fees on NSWAP.'),
      ],
    },
    {
      title: t('How can I list my NFT collection on the Market?'),
      description: [
        t('In Phase 2 of the NFT Marketplace, collections must be whitelisted before they may be listed.'),
        t('We are now accepting applications from NFT collection owners seeking to list their collections.'),
        // <LinkExternal href="https://docs.nordekscan.com/contact-us/nft-market-applications">
        //   {t('Please apply here')}
        // </LinkExternal>,
      ],
    },
    {
      title: t('What are the fees?'),
      description: [
        t(
          '100% of all platform fees taken by NSWAP from sales are used to buy back and BURN NSWAP tokens in our weekly NSWAP burns.',
        ),
        t(
          'Platform fees: 2% is subtracted from NFT sales on the market. Subject to change.Collection fees: Additional fees may be taken by collection creators, once those collections are live. These will not contribute to the NSWAP burns.',
        ),
      ],
    },
  ]
}

export default config
