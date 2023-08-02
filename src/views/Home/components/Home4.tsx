// @ts-nocheck
import { Flex, Text, Heading, Link, Button } from '@nswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import CommunityVote from '../../../../public/images/home/Community-Vote.png'
import NRKLogo from '../../../../public/images/home/Nrk-Logo.png'
import ColoredWordLastHeading from './ColoredWordLastHeading'

const Home4 = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const primaryButton = {
    to: '/swap',
    text: 'Buy NSWAP',
    external: false,
  }

  return (
    <>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        mb="50px"
        id="homepage-home4"
      >
        <Flex flex="1" flexDirection="column">
          <Heading color="#FFFFFF" scale="xxl">
            <Image src={NRKLogo} priority placeholder="blur" alt={t('NrkLogo')} />{" "}
            {t('NORDEK')}
          </Heading>
          <ColoredWordLastHeading color="#ffffff" text={t('COMMUNITY Vote')} />
          <Text color="#FFFFFF" fontSize="18px" mb="24px" mt="20px">
            {t('NORDEK Swap is governed by its community members who can create & vote on important proposals')}
          </Text>
          <Flex mt="90px">
            <Button mr="16px">
              <Link external href={primaryButton.to}>
                <Text color="#FFFFFF" bold fontSize="16px">
                  {primaryButton.text}
                </Text>
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home4
