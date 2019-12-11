import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";

import { Container, Description, ContainerImg } from "./styles";

const Card = ({ place, placeIndex }) => {
  const handleClick = () => {
    // onClick
  };

  const renderImgs = () =>
    place
      .get("photos")
      .map((photo, index) => (
        <img
          key={photo.get("name")}
          src={photo.get("link")}
          alt={photo.get("name")}
        />
      ));

  return (
    <Container onClick={handleClick}>
      <ContainerImg>{renderImgs()}</ContainerImg>
      <Description>
        <span>{placeIndex}</span>
        <span>{place.get("name")}</span>
        <span>Reviews</span>
      </Description>
    </Container>
  );
};

Card.propTypes = {
  place: ImmutablePropTypes.map.isRequired,
  placeIndex: PropTypes.number.isRequired
};

export default Card;
