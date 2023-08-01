import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { FacebookIcon, TwitterIcon, TelegramIcon, InstagramIcon, YoutubeIcon, DiscordIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.nordekscan.com/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.nordekscan.com/contact-us/telegram",
      },
      {
        label: "NSWAP",
        href: "https://docs.nordekscan.com/tokenomics/nswap",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://nswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.nordekscan.com/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.nordekscan.com/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.nordekscan.com/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/Officialnordek",
      },
      {
        label: "Documentation",
        href: "https://docs.nordekscan.com",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@nswap-1/s/nswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.nordekscan.com/help/faq#is-nswap-safe-has-nswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.nordekscan.com/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/people/Nordek/100088971405149/?mibextid=ZbWKwL"
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/officialnordek",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/officialnordek/",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    href: "#",
  }
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
