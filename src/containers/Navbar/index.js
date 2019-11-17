import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  fetchAutocomplete,
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
      autocompleteResponse,
      autocompleteFetching,
      autocompleteError,
      place
    } = this.props;

    return (
      <NavbarComponent
        {...{
          fetchAutocomplete,
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
  autocompleteResponse: ImmutablePropTypes.list.isRequired,
  autocompleteFetching: PropTypes.bool.isRequired,
  autocompleteError: ImmutablePropTypes.map,
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
      setPlace
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
