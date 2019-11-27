import React from "react";
import PropTypes from "prop-types";

import { inputType } from "types/forms";

import { Container, Label, StyledInput, Button } from "./styles";

const Input = ({
  type,
  placeholder,
  label,
  disabled,
  input,
  inputButton,
  button,
  warning,
  error
}) => (
  <Container>
    {!!label && <Label>{label}</Label>}
    <StyledInput {...input} {...{ type, placeholder, disabled }} />
    {button && <Button onClick={button.onClick}>{button.icon}</Button>}
  </Container>
);

Input.propTypes = {
  input: inputType.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, null]),
  disabled: PropTypes.bool,
  button: PropTypes.shape({
    onClick: PropTypes.func,
    icon: PropTypes.node
  })
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  label: null,
  disabled: false,
  button: null
};

export default Input;
