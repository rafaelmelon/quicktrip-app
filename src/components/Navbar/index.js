import React, { useState } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";

import logo from "images/logo.svg";
import { Input } from "components";
import { isListContain } from "utils/helpers";

import { Container, Suggestions, Suggestion } from "./styles";

const Navbar = ({
  fetchAutocomplete,
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

  const renderSuggestions = () => {
    return autocompleteResponse.map(item => (
      <Suggestion key={item.get("description")} onClick={() => setPlace(item)}>
        {item.get("description")}
      </Suggestion>
    ));
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
          placeholder={place.get("description")}
        />
      </Container>
      {isAutocomplete && <Suggestions>{renderSuggestions()}</Suggestions>}
    </>
  );
};

Navbar.propTypes = {
  fetchAutocomplete: PropTypes.func.isRequired,
  autocompleteResponse: ImmutablePropTypes.list.isRequired,
  autocompleteFetching: PropTypes.bool.isRequired,
  autocompleteError: ImmutablePropTypes.map,
  setPlace: PropTypes.func.isRequired,
  place: ImmutablePropTypes.map.isRequired
};

export default Navbar;
