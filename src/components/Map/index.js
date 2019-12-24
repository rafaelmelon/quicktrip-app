import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "immutable-prop-types";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl
} from "react-map-gl";

import { isListContain } from "utils/helpers";
import marker from "images/marker.png";
import { API_KEY_MAPBOX } from "constants/api";

import { MarkerUser } from "./styles";

const Map = ({ currentPosition, placesResponse, placesCenter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStyles, setMapStyles] = useState(
    "mapbox://styles/mapbox/outdoors-v11"
  );
  const [viewport, setViewport] = useState({
    latitude: currentPosition.latitude,
    longitude: currentPosition.longitude,
    zoom: 9
  });

  const mapRef = useRef(null);

  useEffect(() => {
    setViewport(prevValues => ({
      ...prevValues,
      latitude: placesCenter.get("latitude"),
      longitude: placesCenter.get("longitude")
    }));
  }, [placesCenter]);

  useLayoutEffect(() => {
    const map = mapRef.current.getMap();
    if (isLoaded) {
      setViewport(prevValues => ({
        ...prevValues,
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude
      }));
    }

    return () => {
      /* map.off everything */
    };
  }, [isLoaded, currentPosition]);

  const handleOnLoad = e => {
    setMapStyles(e.target.style.stylesheet);
    setIsLoaded(true);
  };

  const renderCurrentLocationMarker = () => {
    return (
      <Marker
        latitude={currentPosition.latitude}
        longitude={currentPosition.longitude}
      >
        <MarkerUser>
          <img src={marker} alt="marker" />
        </MarkerUser>
      </Marker>
    );
  };

  const renderMarkers = () =>
    placesResponse.map(place => (
      <Marker
        key={place.getIn(["geometry", "location", "lat"])}
        latitude={place.getIn(["geometry", "location", "lat"])}
        longitude={place.getIn(["geometry", "location", "lng"])}
      >
        <MarkerUser>
          <img src={marker} alt="marker" />
        </MarkerUser>
      </Marker>
    ));

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
            [-122.48369693756104, 31.83381888486939],
            [-122.48348236083984, 31.83317489144141],
            [-122.48339653015138, 31.83270036637107]
          ]
        }
      }
    ]
  };

  const geojson2 = {
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
            [29.48369693756104, 31.83381888486939],
            [29.48348236083984, 31.83317489144141],
            [29.48339653015138, 31.83270036637107]
          ]
        }
      }
    ]
  };

  const renderLayerLine = () => {
    const parkLayer = {
      id: "lines",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                color: "#F7455D" // red
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [-122.4833858013153, 37.829607404976734],
                  [-122.4830961227417, 37.82932776098012],
                  [-122.4830746650696, 37.82932776098012],
                  [-122.48218417167662, 37.82889558180985],
                  [-122.48218417167662, 37.82890193740421],
                  [-122.48221099376678, 37.82868372835086],
                  [-122.4822163581848, 37.82868372835086],
                  [-122.48205006122589, 37.82801003030873]
                ]
              }
            },
            {
              type: "Feature",
              properties: {
                color: "#33C9EB" // blue
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [-122.48393028974533, 37.829471820141016],
                  [-122.48395174741744, 37.82940826466351],
                  [-122.48395174741744, 37.829412501697064],
                  [-122.48423874378203, 37.829357420242125],
                  [-122.48422533273697, 37.829361657278575],
                  [-122.48459815979002, 37.8293425906126],
                  [-122.48458743095398, 37.8293447091313],
                  [-122.4847564101219, 37.82932776098012],
                  [-122.48474299907684, 37.829331998018276],
                  [-122.4849334359169, 37.829298101706186],
                  [-122.48492807149889, 37.82930022022615],
                  [-122.48509705066681, 37.82920488676767],
                  [-122.48509168624878, 37.82920912381288],
                  [-122.48520433902739, 37.82905870855876],
                  [-122.48519897460936, 37.82905870855876],
                  [-122.4854403734207, 37.828594749716714],
                  [-122.48543500900269, 37.82860534241688],
                  [-122.48571664094925, 37.82808206121068],
                  [-122.48570591211319, 37.82809689109353],
                  [-122.4858346581459, 37.82797189627337],
                  [-122.48582661151886, 37.82797825194729],
                  [-122.4859634041786, 37.82788503534145],
                  [-122.48595803976059, 37.82788927246246],
                  [-122.48605459928514, 37.82786596829394]
                ]
              }
            }
          ]
        }
      },
      paint: {
        "line-width": 3,
        // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
        // to set the line-color to a feature property value.
        "line-color": ["get", "color"]
      }
    };
    return <Layer {...parkLayer} />;
  };

  const isPlacesResponse = isListContain(placesResponse);

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
      <Source type="geojson" data={geojson2}>
        <Layer
          id="data"
          type="fill"
          paint={{
            "fill-color": {
              property: "percentile",
              stops: [
                [0, "#3288bd"],
                [1, "#66c2a5"],
                [2, "#abdda4"],
                [3, "#e6f598"],
                [4, "#ffffbf"],
                [5, "#fee08b"],
                [6, "#fdae61"],
                [7, "#f46d43"],
                [8, "#d53e4f"]
              ]
            },
            "fill-opacity": 0.8
          }}
        />
      </Source>
      {isPlacesResponse && renderMarkers()}
      {renderCurrentLocationMarker()}
    </ReactMapGL>
  );
};

Map.propTypes = {
  currentPosition: PropTypes.shape({}),
  placesResponse: ImmutablePropTypes.list,
  placesCenter: ImmutablePropTypes.map
};

export default Map;
