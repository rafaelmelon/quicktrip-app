import React from "react";
import PropTypes from "prop-types";

import { Card } from "components";

import { Container } from "./styles";

const Carousel = ({ places }) => {
  const renderPlaces = () => {
    return places.map(info => {
      return <Card key={info.description} {...{ info }} />;
    });
  };

  return <Container>{renderPlaces()}</Container>;
};

Carousel.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({}))
};

Carousel.defaultProps = {
  places: [
    {
      description: "Card 1"
    },
    {
      description: "Card 2"
    }
  ]
};

export default Carousel;
