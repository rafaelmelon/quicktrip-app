import styled from "styled-components";

export const Container = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 24px;
  > img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }
`;

export const Suggestions = styled.div`
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 48px;
  z-index: 1;
`;

export const Suggestion = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.swamp};
  padding: 0 24px;
  cursor: pointer;
`;
