import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  setCurrentPosition,
  setCurrentPositionError,
  selectorCurrentPosition,
  selectorCurrentPositionError
} from "redux/modules/geo";

import { Map, Carousel } from "components";

class Home extends Component {
  constructor(props) {
    super(props);
    this.positionInterval = null;
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
  };

  componentWillUnmount() {
    if (this.positionInterval) {
      clearTimeout(this.positionInterval);
    }
  }

  geoSuccess = position => {
    const { setCurrentPosition } = this.props;

    this.positionInterval = setInterval(
      () =>
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      5000
    );
  };

  geoError = error => {
    const { setCurrentPositionError } = this.props;
    setCurrentPositionError(error);
  };

  render() {
    const { currentPosition } = this.props;

    return (
      <>
        <Map {...{ currentPosition }} />
        <Carousel />
      </>
    );
  }
}

Home.propTypes = {
  currentPosition: ImmutablePropTypes.map.isRequired,
  currentPositionError: ImmutablePropTypes.map,
  setCurrentPosition: PropTypes.func.isRequired,
  setCurrentPositionError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPosition: selectorCurrentPosition(state),
  currentPositionError: selectorCurrentPositionError(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPosition,
      setCurrentPositionError
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
