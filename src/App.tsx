import React, { useState, useEffect } from 'react';
import Main from './component/Main';
import { useGeoLocator } from './useGeoLocation';
import './App.css';




function App() {
  const geoLocator = useGeoLocator()

  console.log(geoLocator, 'geoLocator')
  return <>
      {geoLocator.error ? 
      <div className="error-alert">
        <p>{geoLocator.error}</p>
      </div> :  <Main />
      // <Main longitude={geoLocator.longitude} latitude={geoLocator.latitude} /> }
      }
    </>
}

export default App;
