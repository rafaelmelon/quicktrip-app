import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const ReactMapbox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmFmYWVsbWVsb24iLCJhIjoiY2syOWNzNng2MDdqaDNjbWp2czZtcjl0ciJ9.8SuHDi6E9lRERaWVbULzDQ'
});

const Map = () => {

  return <ReactMapbox
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw'
    }}
  >
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
    </Layer>
  </ReactMapbox>;
}

export default Map