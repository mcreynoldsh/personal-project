import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import bases from '../data/locations.json'
import { Button } from 'react-bootstrap'

const MapContainer = ({ addBase }) => {

  const [mapLocations, setMapLocations] = useState(bases)
  const [selected, setSelected] = useState({})

  const mapStyles = {
    height: "50vh",
    width: "100%",
    display: "flex"
  };

  const defaultCenter = {
    lat: 32.4228638826,
    lng: -99.8391523672
  }

  const onSelect = item => {
    setSelected(item);
  }

  const [currentPosition, setCurrentPosition] = useState(null);

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyDrxE9WPjC01VrUhpPXABzh_Kflxs1oo6E'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition || defaultCenter}>
        {
          mapLocations.map(item => {
            return (
              <Marker key={item.name}
                position={item.location}
                onClick={() => onSelect(item)}
              />
            )
          })
        }
        {
          selected.location &&
          (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
                <p>{selected.name}</p>
                <Button variant="primary" size="sm" onClick={() => addBase(selected.name)} >
                  Connect
                </Button>
              </div>

            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}
export default MapContainer;