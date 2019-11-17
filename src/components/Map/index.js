import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import ReactMapGL, { Marker } from "react-map-gl";

import { API_KEY_MAPBOX } from "constants/api";

const Map = ({ initialPosition, currentPosition, setCurrentPosition }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    setViewport({
      latitude: initialPosition.get("latitude"),
      longitude: initialPosition.get("longitude")
    });
  }, [initialPosition]);

  const handleChangeViewport = viewport => {
    setViewport(viewport);
  };

  return (
    <ReactMapGL
      {...viewport}
      width={400}
      height={400}
      zoom={8}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={handleChangeViewport}
      mapboxApiAccessToken={API_KEY_MAPBOX}
    >
      <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
        I'm Here!!!
      </Marker>
    </ReactMapGL>
  );
};

Map.propTypes = {
  initialPosition: ImmutablePropTypes.map,
  currentPosition: ImmutablePropTypes.map,
  setCurrentPosition: PropTypes.func.isRequired
};

export default Map;
