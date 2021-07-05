import Main from './component/Main/Main';
import { useGeoLocator } from './useGeoLocation';
import './App.css';


function App() {
  const geoLocator = useGeoLocator()

  return <>
      {geoLocator.error ? 
      <div className="error-alert">
        <p>{geoLocator.error}</p>
      </div> : <Main longitude={geoLocator.longitude} latitude={geoLocator.latitude} /> }
    </>
}

export default App;
