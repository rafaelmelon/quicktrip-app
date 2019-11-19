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

  const handleClick = item => {
    fetchPlaces(item);
    setPlace(item);
    setValue(item.get("description"));
    resetAutocomplete();
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
          placeholder={place.get("description") || "Search location"}
        />
      </Container>
      {isAutocomplete && (
        <Suggestions>
          {autocompleteResponse.map(item => (
            <Suggestion
              key={item.get("description")}
              onClick={() => handleClick(item)}
            >
              {item.get("description")}
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
  autocompleteError: PropTypes.oneOfType([ImmutablePropTypes.map, null]),
  setPlace: PropTypes.func.isRequired,
  place: ImmutablePropTypes.map.isRequired
};

export default Navbar;
