import React from "react";
import {
  //  baseColors,
  darkColors,
  lightColors,
} from "../../theme/colors";
import { Flex, Box } from "../Box";
// import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  // StyledList,
  // StyledListItem,
  // StyledText,
  StyledTextDisclaimer,
  StyledTextDisclaimerContent,
  StyledSocialLinks,
  StyledToolsContainer,
} from "./styles";
import { FooterProps } from "./types";
import { ThemeSwitcher } from "../ThemeSwitcher";
import LangSelector from "../LangSelector/LangSelector";
import CakePrice from "../CakePrice/CakePrice";
import { LogoWithTextIcon, ArrowForwardIcon } from "../Svg";
import { Button } from "../Button";
import { Colors } from "../..";

const FooterMenu: React.FC<FooterProps> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  buyBNBComponent,
  ...props
}) => {
  return (
    <StyledFooter p={["40px 16px", null, "65px 40px 100px 40px"]} {...props} justifyContent="center">
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          <LogoWithTextIcon isDark width="130px" />
        </StyledIconMobileContainer>
        <Flex flexDirection="column" justifyContent="space-between" alignItems="flex-start" mb={["42px", null, "36px"]}>
          <Box display={["none", null, "block"]}>
            <LogoWithTextIcon isDark width="160px" />
          </Box>
          <Box display={["", null, "block"]} mt={["42px", null, "36px"]} mb={["8px"]}>
            <StyledTextDisclaimer>Disclaimer:</StyledTextDisclaimer>
          </Box>
          <Box display={["", null, "block"]}>
            <StyledTextDisclaimerContent>
              Trading crypto assets has high opportunities and risks. Make sure you use good judgment in making buying
              and selling decisions on your assets. NORDEK Swap does not force users to make buying and selling
              transactions and all buying and selling decisions of your digital money assets are your own decisions and
              are not influenced by any party.
            </StyledTextDisclaimerContent>
          </Box>
        </Flex>
        <Flex flexDirection={["column", null, null, "row"]} justifyContent="space-between">
          {/* <StyledToolsContainer> */}
            <Flex alignItems="center" mb={["25px" , null,null,"0"]}>
              <Button as="a" href="/swap" target="_blank" scale="md" mr="20px" style={{ color: "#FFFFFF" }}>
                {buyCakeLabel}
              </Button>
              <Box>
                <CakePrice cakePriceUsd={cakePriceUsd} color="contrast" />
              </Box>
            </Flex>
          {/* </StyledToolsContainer> */}
          <StyledSocialLinks />
        </Flex>
      </Flex>
    </StyledFooter>
  );
};

export default FooterMenu;
