import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Home1 from './components/Home1'
import Home2 from './components/Home2'
import Home3 from './components/Home3'
import Home4 from './components/Home4'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'
import Home5 from './components/Home5'


const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
    padding-bottom: 0px
  }
`


const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }  
`

const CoVote = styled(Container)`
    
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 5rem 0;
`

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '1200px' }
  const { t } = useTranslation()

  return (
    <>
      <PageMeta />

      <video src="https://dotted-ranger-363617.web.app/videos/slider_for_nordek.mp4" className='video-tag' width="100%" height="auto"
        autoPlay={true} loop={true} style={{ position: "absolute" }}></video>
      {/* {account && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )} */}

      <Home1 />

      {/*<PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(77.89deg, #180923 19.17%, #312681 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Home2 />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.isDark
          ? '#FFFFFF'
          : '#FFFFFF'}
        index={2}
        hasCurvedDivider={false}
      >
        <Home3 />
      </PageSection>
       <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #0B4576 0%, #091115 100%)'
            : 'linear-gradient(180deg, #6FB6F1 0%, #EAF2F6 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection> */}
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        backgroundColor="#000 !important"
        padding="5rem 0"
        index={2}
        hasCurvedDivider={false}
      >
        <Home5 />

      </PageSection>

      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="url(https://dotted-ranger-363617.web.app/assets/bg-img-2242f147.png);"
        background-repeat="no-repeat"
        background-position="center"
        background-size="cover"
        backgroundColor="#000 !important"
        padding="5rem 0"
        index={2}
        hasCurvedDivider={false}
      >
        <Home4 />
        <CakeDataRow />
      </PageSection>

      <div
      >
        <video src="https://dotted-ranger-363617.web.app/videos/ready_for_nordek.mp4" width="100%" height="auto"
          autoPlay={true} loop={true} ></video>
        <Footer
        />
      </div>
    </>
  )
}
export default Home



{/*<Flex
    position="relative"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    mt={[account ? '280px' : '50px', null, 0]}
    id="homepage-hero"
  >
    <Flex flex="1" flexDirection="column">
      <Heading scale="xxl" color="#ffffff" mb="40px">
        {t('SWAP CRYPTO')}
      </Heading>
      <Text color="#ffffff" fontSize="18px" mb="24px">
        {t("with Norswap's ease")}
      </Text>
      <Flex>{!account && <ConnectWalletButton mr="8px" />}</Flex>
    </Flex>
    <Flex
      height={['192px', null, null, '100%']}
      width={['192px', null, null, '100%']}
      flex={[null, null, null, '1']}
      mb={['24px', null, null, '0']}
      position="relative"
    >

    </Flex>
</Flex>*/}






