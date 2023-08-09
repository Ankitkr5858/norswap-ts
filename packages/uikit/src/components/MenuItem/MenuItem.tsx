import React, { useContext } from "react";
import { MenuContext } from "../../widgets/Menu/context";
import StyledMenuItem, { StyledMenuItemContainer } from "./styles";
import { MenuItemProps } from "./types";
//@ts-ignore
const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive = false,
  variant = "default",
  statusColor,
  ...props
}) => {
  const { linkComponent } = useContext(MenuContext);
  const itemLinkProps: unknown = href
    ? {
        as: linkComponent,
        href,
      }
    : {
        as: "div",
      };
  return (//@ts-ignore
    <StyledMenuItemContainer $isActive={isActive} $variant={variant}>
    
      <StyledMenuItem
      //@ts-ignore
       {...itemLinkProps} $isActive={isActive} $variant={variant} $statusColor={statusColor} {...props}>
        {children}
      </StyledMenuItem>
    </StyledMenuItemContainer>
  );
};

export default MenuItem;
