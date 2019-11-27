import React from "react";
import PropTypes from "prop-types";

import { Container, Description } from "./styles";

const Card = ({ info }) => {
  const { description } = info;

  const handleClick = () => {
    // onClick
  };

  return (
    <Container onClick={handleClick}>
      <Description>{description}</Description>
    </Container>
  );
};

Card.propTypes = {
  info: PropTypes.shape({})
};

Card.defaultProps = {
  info: {
    description: "Description"
  }
};

export default Card;
