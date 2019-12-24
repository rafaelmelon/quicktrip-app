import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  setCurrentPosition,
  setCurrentPositionError,
  selectorCurrentPosition,
  selectorCurrentPositionError,
  selectorPlacesResponse,
  selectorPlacesCenter,
  fetchPlaces
} from "redux/modules/geo";

import { Map, Carousel, Loader } from "components";

class Home extends Component {
  constructor(props) {
    super(props);
    this.positionInterval = null;

    this.state = {
      isGeoUserResponse: false,
      defaultPosition: { latitude: 40.415363, longitude: -3.707398 }
    };
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

  geoSuccess = result => {
    const { setCurrentPosition, fetchPlaces } = this.props;
    const position = {
      latitude: result.coords.latitude,
      longitude: result.coords.longitude
    };

    fetchPlaces({ name: null, position });
    this.setState({
      isGeoUserResponse: true
    });
    this.positionInterval = setInterval(
      () => setCurrentPosition(position),
      5000
    );
  };

  geoError = error => {
    const { setCurrentPositionError } = this.props;
    setCurrentPositionError(error.message);
    this.setState({
      isGeoUserResponse: true
    });
  };

  setCurrentPosition = () => {
    const { currentPosition, currentPositionError } = this.props;
    const { defaultPosition } = this.state;

    if (currentPositionError) {
      return {
        latitude: defaultPosition.latitude,
        longitude: defaultPosition.longitude
      };
    }
    return {
      latitude: currentPosition.get("latitude"),
      longitude: currentPosition.get("longitude")
    };
  };

  render() {
    const { placesResponse, placesCenter } = this.props;
    const { isGeoUserResponse } = this.state;

    if (!isGeoUserResponse) {
      return <Loader />;
    }

    return (
      <>
        <Map
          currentPosition={this.setCurrentPosition()}
          {...{ placesResponse, placesCenter }}
        />
        <Carousel {...{ placesResponse }} />
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
  fetchPlaces: PropTypes.func.isRequired,
  placesResponse: ImmutablePropTypes.list.isRequired,
  placesCenter: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
  currentPosition: selectorCurrentPosition(state),
  currentPositionError: selectorCurrentPositionError(state),
  placesResponse: selectorPlacesResponse(state),
  placesCenter: selectorPlacesCenter(state)
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
