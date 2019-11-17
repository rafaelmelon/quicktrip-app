import {
  shape,
  number,
  string,
  oneOfType,
  arrayOf,
  func,
  bool,
  element
} from "prop-types";

export const optionType = shape({
  id: oneOfType([number, string]),
  value: oneOfType([number, string]),
  label: oneOfType([string, element])
});

export const inputType = shape({
  input: shape({
    name: string,
    value: oneOfType([number, string, optionType]),
    onChange: func
  })
});

export const inputCheckboxType = shape({
  input: shape({
    name: string,
    checkbox: bool,
    onChange: func
  })
});

export const optionsType = arrayOf(optionType);
