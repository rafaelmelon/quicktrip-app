import React, { useState, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl
} from "react-map-gl";

import marker from "images/marker.png";
import { API_KEY_MAPBOX } from "constants/api";

import { MarkerUser } from "./styles";

const Map = ({ currentPosition }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStyles, setMapStyles] = useState(
    "mapbox://styles/mapbox/outdoors-v11"
  );
  const [viewport, setViewport] = useState({
    latitude: 29.976854499999998,
    longitude: 31.144190799999997,
    zoom: 9
  });

  const mapRef = useRef(null);
  // this runs after mapRef was mounted
  useLayoutEffect(() => {
    const map = mapRef.current.getMap();
    if (isLoaded) {
      /* map.on here to whatever you want, I am handling style toggle from here */
    }

    return () => {
      /* map.off everything */
    };
  });

  const handleOnLoad = e => {
    setMapStyles(e.target.style.stylesheet);
    setIsLoaded(true);
  };

  const renderCurrentLocationMarker = () => {
    return (
      <Marker
        latitude={currentPosition.get("latitude")}
        longitude={currentPosition.get("longitude")}
      >
        <MarkerUser>
          <img src={marker} alt="marker" />
        </MarkerUser>
      </Marker>
    );
  };

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          stroke: "#f06292",
          "stroke-width": 15,
          "stroke-opacity": 1,
          "line-join": "round",
          "line-cap": "round"
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107]
          ]
        }
      }
    ]
  };

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width="100%"
      height={400}
      mapStyle={mapStyles}
      mapboxApiAccessToken={API_KEY_MAPBOX}
      onLoad={handleOnLoad}
      onViewportChange={setViewport}
    >
      <GeolocateControl
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          margin: 10
        }}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer
          id="point"
          type="circle"
          paint={{
            "circle-radius": 10,
            "circle-color": "#007cbf"
          }}
        />
      </Source>
      {renderCurrentLocationMarker()}
    </ReactMapGL>
  );
};

Map.propTypes = {
  currentPosition: ImmutablePropTypes.map
};

export default Map;
