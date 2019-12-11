import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { List } from "immutable";

import { Card } from "components";

import { Container } from "./styles";

const Carousel = ({ placesResponse }) => {
  const renderPlaces = () => {
    return placesResponse.map((place, placeIndex) => {
      return <Card key={place.get("id")} {...{ place, placeIndex }} />;
    });
  };

  return <Container>{renderPlaces()}</Container>;
};

Carousel.propTypes = {
  placesResponse: ImmutablePropTypes.list
};

Carousel.defaultProps = {
  placesResponse: List()
};

export default Carousel;
