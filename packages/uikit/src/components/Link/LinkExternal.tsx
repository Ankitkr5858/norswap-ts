// @ts-nocheck
import React from "react";
import Link from "./Link";
import { LinkProps } from "./types";
import OpenNewIcon from "../Svg/Icons/OpenNew";

const LinkExternal: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon color={props.color ? props.color : "#029BE0"} ml="4px" />
    </Link>
  );
};

export default LinkExternal;
