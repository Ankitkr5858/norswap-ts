// @ts-nocheck
import { FooterLinkType } from '@nswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.nordekscan.com/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.nordekscan.com/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/',
      },
      {
        label: t('Community'),
        href: 'https://docs.nordekscan.com/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.nordekscan.com/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://nswap.creator-spring.com/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.nordekscan.com/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.nordekscan.com/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.nordekscan.com/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.nordekscan.com',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.nordekscan.com/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.nordekscan.com/help/faq',
      },
      {
        label: t('Careers'),
        href: 'https://docs.nordekscan.com/hiring/become-a-chef',
      },
    ],
  },
]
