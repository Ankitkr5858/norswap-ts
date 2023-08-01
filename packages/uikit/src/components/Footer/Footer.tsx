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

const MenuItem: React.FC<FooterProps> = ({
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
    <StyledFooter p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          <LogoWithTextIcon isDark width="130px" />
        </StyledIconMobileContainer>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          {/* {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? baseColors.warning : darkColors.text}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))} */}
          <Box display={["none", null, "block"]}>
            <LogoWithTextIcon isDark width="160px" />
          </Box>
          <Box display={["none", null, "block"]} mt={["42px", null, "36px"]} mb={["8px"]}>
            <StyledTextDisclaimer>Disclaimer:</StyledTextDisclaimer>
          </Box>
          <Box display={["none", null, "block"]}>
            <StyledTextDisclaimerContent>
              Trading crypto assets has high opportunities and risks. Make sure you use good judgment in
              making buying and selling decisions on your assets. NORDEK Swap does not force users to make buying and
              selling transactions and all buying and selling decisions of your digital money assets are your own
              decisions and are not influenced by any party.
            </StyledTextDisclaimerContent>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">

          <StyledToolsContainer >
            {/* <Flex order={[1, null, 1]} alignItems="center">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            {/* <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color={darkColors.textSubtle as keyof Colors}
              dropdownPosition="top-right"
            />
          </Flex> */}
            {/* {buyBNBComponent} */}
            <Flex alignItems="center">

              <Button
                as="a"
                href="/swap"
                target="_blank"
                scale="sm"
                mr="20px"
                // endIcon={<ArrowForwardIcon color={lightColors.backgroundAlt} />}
                style={{ color: "#FFFFFF" }}
              >
                {buyCakeLabel}
              </Button>
              <Box >
                <CakePrice cakePriceUsd={cakePriceUsd} color="contrast" />
              </Box>
            </Flex>
          </StyledToolsContainer>
          <StyledSocialLinks />
        </Flex>
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
