import React, { useState } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";

import logo from "images/logo.svg";
import { Input } from "components";
import { isListContain } from "utils/helpers";

import { Container, Suggestions, Suggestion } from "./styles";

const Navbar = ({
  fetchAutocomplete,
  resetAutocomplete,
  fetchPlaces,
  autocompleteResponse,
  autocompleteFetching,
  autocompleteError,
  setPlace,
  place
}) => {
  const [value, setValue] = useState("");
  const handleChange = e => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (inputValue.length > 5) {
      fetchAutocomplete(inputValue);
    }
  };

  const handleClickSuggestion = value => {
    const coordinates = value.getIn(["geometry", "coordinates"]);
    const name = value.get("place_name");
    const place = {
      name,
      position: {
        latitude: coordinates.get(1),
        longitude: coordinates.get(0)
      }
    };

    fetchPlaces(place);
    setPlace(place);
    setValue(name);
    resetAutocomplete();
  };

  const handleClickSearch = () => {
    if (value) {
      fetchPlaces({ name: value, position: null });
      resetAutocomplete();
    }
  };

  const isAutocomplete = isListContain(autocompleteResponse);

  return (
    <>
      <Container>
        <img src={logo} alt="logo" />
        <Input
          input={{
            onChange: handleChange,
            value
          }}
          placeholder={"Search location"}
          button={{
            onClick: handleClickSearch,
            icon: <img src={logo} alt="logo" />
          }}
        />
      </Container>
      {isAutocomplete && (
        <Suggestions>
          {autocompleteResponse.map(item => (
            <Suggestion
              key={item.get("place_name")}
              onClick={() => handleClickSuggestion(item)}
            >
              {item.get("place_name")}
            </Suggestion>
          ))}
        </Suggestions>
      )}
    </>
  );
};

Navbar.propTypes = {
  fetchAutocomplete: PropTypes.func.isRequired,
  resetAutocomplete: PropTypes.func.isRequired,
  fetchPlaces: PropTypes.func.isRequired,
  autocompleteResponse: ImmutablePropTypes.list.isRequired,
  autocompleteFetching: PropTypes.bool.isRequired,
  autocompleteError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null])
  ]),
  setPlace: PropTypes.func.isRequired,
  place: ImmutablePropTypes.map.isRequired
};

export default Navbar;
