import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  fetchAutocomplete,
  resetAutocomplete,
  fetchPlaces,
  setPlace,
  selectorAutocompleteResponse,
  selectorAutocompleteFetching,
  selectorAutocompleteError,
  selectorPlace
} from "redux/modules/geo";

import { Navbar as NavbarComponent } from "components";

class Navbar extends Component {
  componentDidMount() {}

  render() {
    const {
      fetchAutocomplete,
      resetAutocomplete,
      fetchPlaces,
      autocompleteResponse,
      autocompleteFetching,
      autocompleteError,
      setPlace,
      place
    } = this.props;

    return (
      <NavbarComponent
        {...{
          fetchAutocomplete,
          resetAutocomplete,
          fetchPlaces,
          autocompleteResponse,
          autocompleteFetching,
          autocompleteError,
          setPlace,
          place
        }}
      />
    );
  }
}

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

const mapStateToProps = state => ({
  autocompleteResponse: selectorAutocompleteResponse(state),
  autocompleteFetching: selectorAutocompleteFetching(state),
  autocompleteError: selectorAutocompleteError(state),
  place: selectorPlace(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAutocomplete,
      resetAutocomplete,
      fetchPlaces,
      setPlace
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
