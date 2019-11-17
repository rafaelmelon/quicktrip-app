import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  setInitialPosition,
  setInitialPositionError,
  setCurrentPosition,
  selectorInitialPosition,
  selectorInitialPositionError,
  selectorCurrentPosition
} from "redux/modules/geo";

import { Map } from "components";

class Home extends Component {
  componentDidMount() {
    this.getInitialPosition();
  }

  getInitialPosition = () => {
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
  };

  geoSuccess = position => {
    const { setInitialPosition } = this.props;

    setInitialPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  geoError = error => {
    const { setInitialPositionError } = this.props;
    setInitialPositionError(error);
  };

  render() {
    const { initialPosition, currentPosition, setCurrentPosition } = this.props;

    return (
      <Map {...{ initialPosition, currentPosition, setCurrentPosition }} />
    );
  }
}

Home.propTypes = {
  initialPosition: ImmutablePropTypes.map,
  initialPositionError: ImmutablePropTypes.map,
  currentPosition: ImmutablePropTypes.map,
  setInitialPosition: PropTypes.func.isRequired,
  setInitialPositionError: PropTypes.func.isRequired,
  setCurrentPosition: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialPosition: selectorInitialPosition(state),
  initialPositionError: selectorInitialPositionError(state),
  currentPosition: selectorCurrentPosition(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setInitialPosition,
      setInitialPositionError,
      setCurrentPosition
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
