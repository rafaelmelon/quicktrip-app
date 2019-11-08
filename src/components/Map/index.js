import React, { useState } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const [user, setUser] = useState({});


  navigator.geolocation.getCurrentPosition(position => {
    let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    };
    let newViewport = {
      height: "100vh",
      width: "100vw",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zoom: 10
    };
    setViewport(newViewport)
    setUser(setUserLocation)
  });

  return <ReactMapGL
    {...viewport}
    mapStyle="mapbox://styles/mapbox/outdoors-v11"
    onViewportChange={viewport => setViewport(viewport)}
    mapboxApiAccessToken='pk.eyJ1IjoicmFmYWVsbWVsb24iLCJhIjoiY2syOWNzNng2MDdqaDNjbWp2czZtcjl0ciJ9.8SuHDi6E9lRERaWVbULzDQ'
  >
    <Marker
      latitude={viewport.latitude}
      longitude={viewport.longitude}
    >
      I'm Here!!!
    </Marker>
  </ReactMapGL>;
}

export default Map