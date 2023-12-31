// @ts-nocheck
import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainerSwap = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: linear-gradient(90deg,#009EE2 0%,#312681 100%);
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItemSwap = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ theme, $isActive }) => ($isActive ? "#009EE2" : "#FFFFF")};
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  &:hover {
    color: #009EE2;
    ${({ $variant }) => $variant === "default" && "border-radius: 16px;"};
  }
`;


export default StyledMenuItemSwap;
