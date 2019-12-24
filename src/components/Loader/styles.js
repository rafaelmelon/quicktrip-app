import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: blue;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 50px;
  }
`;
