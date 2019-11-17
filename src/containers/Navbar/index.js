import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchAutocomplete, selectorAutocomplete } from "redux/modules/geo";

import { Navbar as NavbarComponent } from "components";

class Navbar extends Component {
  componentDidMount() {}

  render() {
    const { fetchAutocomplete } = this.props;

    return <NavbarComponent {...{ fetchAutocomplete }} />;
  }
}

Navbar.propTypes = {
  autocomplete: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  autocomplete: selectorAutocomplete(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAutocomplete
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
