import React from "react";
import PropTypes from "prop-types";

import { inputType } from "types/forms";

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
    <CustomInput {...input} {...{ type, placeholder, disabled }} />
    {icon && <Icon>{icon}</Icon>}
  </Container>
);

Input.propTypes = {
  input: inputType.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, null]),
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, null])
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  label: null,
  disabled: false,
  icon: null
};

export default Input;
