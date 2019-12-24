import React from "react";

import marker from "images/marker.png";

import { Container } from "./styles";

const Loader = () => (
  <Container>
    <img src={marker} alt="marker" />
  </Container>
);

export default Loader;
