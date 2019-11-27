import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  flex: 1;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.nm};
`;

export const StyledInput = styled.input`
  height: 32px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: none;
  outline: none;
  box-shadow: none;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.swamp};
  padding-right: 20px;
  padding-left: 12px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.swamp};
  }
  &:hover {
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.swamp};
    &::placeholder {
    }
  }
`;

export const Button = styled.button`
  position: absolute;
  right: 6px;
  padding: 0;
  margin: 0;
  border: 0;
  > img {
    width: 25px;
    height: 25px;
  }
`;
