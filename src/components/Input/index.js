import React from "react";

import { Container, Label, CustomInput, Icon } from "./styles";

const Input = ({
  type,
  placeholder,
  label,
  disabled,
  input,
  icon,
  warning,
  error
}) => (
  <Container>
    {!!label && <Label>{label}</Label>}
    <CustomInput
      {...input}
      {...{ type, placeholder, warning, error, disabled }}
    />
    {icon && <Icon>{icon}</Icon>}
  </Container>
);

export default Input;
