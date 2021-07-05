import {useState, useEffect} from 'react';

interface IState {
  longitude: number
  latitude: number
}
type error = string

interface Coords{
  coords: IState
}

interface ErrorMsg {
  message: string
}

export const useGeoLocator = () => {
  const [position, setPosition] = useState<IState>({latitude: 0, longitude: 0});
  const [error, setError] = useState<error>('');
  
  const onChange = ({coords}: Coords) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: ErrorMsg) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  
  return {...position, error};
}