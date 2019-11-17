import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.nm};
`;

export const CustomInput = styled.input`
  height: 34px;
  width: 100%;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: 14px;
  line-height: 1.42857;
  background-color: ${({ theme, alert }) =>
    alert ? theme.colors.darkBlue : theme.colors.white};
  background-image: none;
  outline: none;
  box-shadow: none;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, alert }) =>
      alert ? theme.colors.darkBlue : theme.colors.white};
  padding: 6px 12px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.darkBlue};
  }
  &:hover {
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.darkBlue};
    &::placeholder {
    }
  }
`;

export const Icon = styled.span`
  position: absolute;
`;
