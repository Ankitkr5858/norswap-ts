// @ts-nocheck
import React, { useContext } from "react";
import { MenuContext } from "../../widgets/Menu/context";
import { Flex } from "../Box";
import AnimatedIconComponent from "../Svg/AnimatedIconComponent";
import { StyledBottomNavItem, StyledBottomNavText } from "./styles";
import { BottomNavItemProps } from "./types";

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  icon,
  fillIcon,
  href,
  showItemsOnMobile = false,
  isActive = false,
  ...props
}) => {
  const { linkComponent } = useContext(MenuContext);
  const bottomNavItemContent = (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      {icon && (
        <AnimatedIconComponent
          icon={icon}
          fillIcon={fillIcon}
          height="22px"
          width="21px"
          color={isActive ? "secondary" : "contrast"}
          isActive={isActive}
          activeBackgroundColor="backgroundAlt"
        />
      )}
      <StyledBottomNavText
        color={isActive ? "secondary" : "contrast"}
        fontWeight={isActive ? "600" : "400"}
        fontSize="10px"
      >
        {label}
      </StyledBottomNavText>
    </Flex>
  );

  return showItemsOnMobile ? (
    <StyledBottomNavItem type="button" {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  ) : (
    <StyledBottomNavItem  {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  );
};
// as={linkComponent} href={href}
export default BottomNavItem;
