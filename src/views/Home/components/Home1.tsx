import { Flex, Heading, Text } from '@nswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import bunnyImage from '../../../../public/images/home/home-1.png'
import CryptoConvertor from './CryptoConvertor'


const Home1 = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>

      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
        padding={['10%', '14%']}
        background="linear-gradient(0deg,rgba(0,0,0,.59) 0%,rgba(0,0,0,.59) 100%)"
      >
        <Flex alignItems="center" flexDirection="column" justifyContent="center">
          <Heading scale="xl" color="#ffffff" mb="40px">
            {t('NORDEK Swap synergizes with MSMEs')}
          </Heading>
          <CryptoConvertor />
          <Text color="#ffffff" fontSize="18px" mb="24px">
            {t('The first Equity Crowdfunding platform built using NORDEK chain technology')}
          </Text>
          <Flex
          >{!account && <ConnectWalletButton mr="8px" />}</Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home1
