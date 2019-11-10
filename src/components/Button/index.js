import React from "react";

import { CustomButton } from "./styles";

const Button = ({ children, disabled, onClick, ...rest }) => {
  return (
    <CustomButton {...rest} disabled={disabled} onClick={onClick}>
      {children}
    </CustomButton>
  );
};

export default Button;
