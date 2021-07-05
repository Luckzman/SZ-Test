import { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css'

export interface IResult {
  response: {
    venues: {
      name: string
      location: {
        distance: string
      }
    }[],
  }
}

interface NewVenue {
  // venue: {
    id: string
    distance: string
    photo: string
    isOpen?: string | boolean
    price: string
    name: string
  // }
}

interface Venue {
  venue: {
    id: string
    location: {
      distance: string
    }
    details: {
      // venue: {
        id: string
        distance: string
        photo: string
        isOpen?: string | boolean
        price: string
        name: string
      // }
    }
  }
  // details: NewVenue
}

type NewVenueArr = NewVenue[]


// const API_URL = `https://api.foursquare.com/v2/search/recommendations?&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&v=${REACT_APP_VERSION}&ll=51.5074,0.1278&intent=coffee&radius=10000&limit=2&prices=1,2,3,4&openNow=true`;
const API_URL = 'http://myjson.dit.upm.es/api/bins/iki';
// const API_URL = `https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&v=${REACT_APP_VERSION}&near=new york&intent=browse&radius=10000&query=coffee shop&limit=10`;
// const API_URL_DETAILS = (venueId: string) => `https://api.foursquare.com/v2/venues/${venueId}?client_secret=${REACT_APP_CLIENT_SECRET}&v=${REACT_APP_VERSION}&client_id=${REACT_APP_CLIENT_ID}`;
const API_URL_DETAILS = `http://myjson.dit.upm.es/api/bins/rtu`;

const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = await response.data;
    let dataVenue = data.response.group.results.map(function (venue: any) {
        return axios.get(API_URL_DETAILS).then((response: any) => {
          venue.price = response?.data?.response?.venue?.price?.message;
          venue.isOpen = response?.data?.response?.venue?.hours?.isOpen;
          return venue;
      }).catch(error => console.log(error))
    })
    return dataVenue
  } catch (error) {
    console.log(error)
  }
}

function Main() {
  const [placeData, setPlaceData] = useState<any>([]);
  const [sortOption, setSortOption] = useState('distance');
  
  useEffect(() => {
    fetchData().then(data => {
      Promise.all(data).then(result => {
        setPlaceData(result)
      })
    })
  }, [])

 
  const handleChange = (e: any) => {
    setSortOption(e.target.value)
  }

  return (
    <div className="container">
        <div className="header">
          <h1>Coffee Shop Finder</h1>
          <select name="" onChange={handleChange} value={sortOption}>
            <option value="distance">Distance</option>
            <option value="name">Price</option>
          </select>
        </div>
        <div className="main">
          {placeData?.sort((a: any, b: any) => (sortOption === 'distance' ? 
            (a.venue.location.distance > b.venue.location.distance) : (a.price > b.price)) ? 1 : -1)
            .map((item: any, index: any) => <div key={index} className="card-container">
            <div className="img-container">
              {item.photo ? <img className="w-100" src={`${item.photo.prefix}${item.photo.height}${item.photo.width}${item.photo.suffix}`} alt="" /> : 
              <img className="w-100" src="https://www.history.com/.image/t_share/MTU3ODc4NjA0MDUwNTQwMjU1/image-placeholder-title.jpg" alt="" />}
            </div>
            <div className="card-info">
              {item.venue.name && <h4>Name: <strong>{item.venue.name}</strong></h4>}
              {item.venue.location.distance && <p>Distance: {item.venue.location.distance}m</p>}
              {<p>Price: {item.price}</p>}
            </div>
          </div>)}
      </div>
    </div>
  );
}

export default Main;
