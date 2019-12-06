import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  setCurrentPosition,
  setCurrentPositionError,
  selectorCurrentPosition,
  selectorCurrentPositionError,
  fetchPlaces
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
    const { setCurrentPosition, fetchPlaces } = this.props;

    fetchPlaces({ name: null, position });

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
    setCurrentPositionError(error.message);
  };

  render() {
    const { currentPosition, currentPositionError } = this.props;

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
  currentPositionError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null])
  ]),
  setCurrentPosition: PropTypes.func.isRequired,
  setCurrentPositionError: PropTypes.func.isRequired,
  fetchPlaces: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPosition: selectorCurrentPosition(state),
  currentPositionError: selectorCurrentPositionError(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPosition,
      setCurrentPositionError,
      fetchPlaces
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
