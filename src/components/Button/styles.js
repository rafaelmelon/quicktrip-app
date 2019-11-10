import styled from "styled-components";

export const CustomButton = styled("button")`
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  padding: ${({ icon }) => (icon ? "5px" : "10px 30px")};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  border: ${({ theme }) => theme.helpers.borderSolidAlpha(theme.colors.black)};
  background: none;
  border-radius: ${({ theme }) => theme.helpers.radius10};
  transition: ${({ theme }) => theme.helpers.transitionAll};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.helpers.borderSolid(theme.colors.black)};
    box-shadow: ${({ theme }) => theme.helpers.boxShadow(theme.colors.black)};
    transform: translate(-2px, -2px);
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;
