import { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css'

interface Venue {
  id: string
  venue:{
    id: string
    location: {
      distance: string
    }
    name: string
  }
  location: {
    distance: string
  }
    name: string
    photo: {
      suffix: string
    prefix: string
    height: number
    width: number
  }
  isOpen: boolean
  price: string
}

interface VenueResponse {
  venue: {
    id: string
    location: {
      distance: string
    }
    name: string
  }
  name: string
  photo: {
    suffix: string
    prefix: string
    height: number
    width: number
  }
  isOpen: boolean
  price: string
}

interface ResData {
  response: {
    group: {
      results: Venue[]
    }
  }
}

interface ApiResponse {
  data:{
    response: {
      venue: {
        id: string
        location: {
          distance: string
        }
        name: string
        photos:{
          groups:{
            items: {
              suffix: string
              prefix: string
              height: number
              width: number
            }[]
          }[]
        }
        hours: {
          isOpen: boolean
        }
        price:{
          message: string
        }
      }
    }
  }
}

const API_URL = (latitude: number, longitude: number, distance: number) => `https://api.foursquare.com/v2/search/recommendations?&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=${process.env.REACT_APP_VERSION}&ll=${latitude},${longitude}&intent=coffee&radius=${distance}&limit=14&openNow=true`;
const API_URL_DETAILS = (venueId: string) => `https://api.foursquare.com/v2/venues/${venueId}?client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=${process.env.REACT_APP_VERSION}&client_id=${process.env.REACT_APP_CLIENT_ID}`;

const fetchData = async (latitude: number, longitude: number, distance: number): Promise<VenueResponse[]> => {
  try {
    const response = await axios.get(API_URL(latitude, longitude, distance),);
    const data: ResData = await response.data;
    const promises: Promise<ApiResponse>[] = []
    let initialPayload: Record<string, VenueResponse> = {};
    data.response.group.results.map((venue: Venue) => {
      initialPayload[venue.venue.id]=venue
      promises.push(axios.get(API_URL_DETAILS(venue.venue.id)))
    })
    const result = await Promise.all(promises)
    const dataValue = result.map(item => {
      return {
        ...initialPayload[item.data.response.venue.id],
        name: item.data.response.venue.name,
        photo: item.data.response.venue.photos.groups[0]?.items[0],
        isOpen: item.data.response.venue.hours?.isOpen || false,
        price: item.data.response.venue.price.message
      }
    })
    return dataValue;
  } catch (error) {
    console.log(error)
    return []
  }
}

interface IProps {
  latitude: number
  longitude: number
}

const Main: React.FC<IProps> = ({latitude, longitude}) => {
  const [placeData, setPlaceData] = useState<VenueResponse[]>([]);
  const [loading, setLoading] = useState(false)
  const [sortOption, setSortOption] = useState('distance');
  const [range, setRange] = useState(1000)
  const PLACEHOLDER_IMAGE_URL = "https://www.history.com/.image/t_share/MTU3ODc4NjA0MDUwNTQwMjU1/image-placeholder-title.jpg";
  
  const getData = (distance = 1000) => {
    setLoading(true);
    fetchData(latitude, longitude, distance).then((data: VenueResponse[]) => {
      setLoading(false)
      setPlaceData(data)
    })
  }

  useEffect(() => {
    getData();
  }, [])

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getData(Number(e.target.value));
    setRange(Number(e.target.value));
  }
 
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  return (
    <div id="main" className="container">
        <div className="header">
          <h1>Coffee Shop Finder</h1>
          <div>
            <select name="" onChange={handleRangeChange} value={range}>
              <option value="1000">1000</option>
              <option value="10000">10000</option>
              <option value="100000">100000</option>
            </select>
            <select style={{marginLeft: '10px'}} onChange={handleChange} value={sortOption}>
              <option value="distance">Distance</option>
              <option value="name">Price</option>
            </select>
          </div>
        </div>
        {loading ?
        <div>Loading... </div> : 
        <>
          {placeData.length > 0 ? <div className="main">
            {placeData?.sort((a: VenueResponse, b: VenueResponse) => (sortOption === 'distance' ? 
              (a.venue.location.distance > b.venue.location.distance) : (a.price > b.price)) ? 1 : -1)
              .map((item: VenueResponse, index: number) => <div key={`a${index}`} className="card-container">
              <div className="img-container">
                {item.photo ? <img className="w-100" src={`${item.photo.prefix}${item.photo.height}${item.photo.width}${item.photo.suffix}`} alt="" /> : 
                <img className="w-100" src={PLACEHOLDER_IMAGE_URL} alt="" />}
              </div>
              <div className="card-info">
                {item.venue.name && <h4>Name: <strong>{item.venue.name}</strong></h4>}
                {item.venue.location.distance && <p>Distance: {item.venue.location.distance}m</p>}
                {<p>Price: {item.price}</p>}
              </div>
            </div>)}
        </div> : <div><p>No Coffee Shop Found</p></div>}</>}
    </div>
  );
}

export default Main;
