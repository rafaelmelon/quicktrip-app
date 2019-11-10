import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
`;

export const CustomInput = styled.input`
  height: 34px;
  width: 100%;
  font-size: 14px;
  line-height: 1.42857;
  background-image: none;
  outline: none;
  box-shadow: none;
  border-radius: 4px;
  padding: 6px 12px;
  &::placeholder {
  }
  &:hover {
  }
  &:focus {
    &::placeholder {
    }
  }
`;

export const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 13px;
`;
