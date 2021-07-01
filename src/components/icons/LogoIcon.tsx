import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { ReactComponent as Icon } from "../../assets/img/logo.svg";

const LogoIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <Icon />
    </SvgIcon>
  );
};

export default LogoIcon;
