import React from "react";
import PropTypes from "prop-types";

import logo from "images/logo.svg";
import { Input } from "components";

import { Container } from "./styles";

const Navbar = ({ fetchAutocomplete }) => {
  const handleChange = e => {
    console.log(e.target.value);
    fetchAutocomplete();
  };

  return (
    <Container>
      <img src={logo} alt="logo" />
      <Input
        input={{
          onChange: handleChange,
          value: "values"
        }}
      />
    </Container>
  );
};

Navbar.propTypes = {
  fetchAutocomplete: PropTypes.func.isRequired
};

export default Navbar;
