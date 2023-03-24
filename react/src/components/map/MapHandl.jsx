
import React, { useState, useRef } from 'react'
import {TileLayer, Marker, Popup, useMap, MapContainer } from 'react-leaflet'

const MapHandle = () => {
  
  const [zoom, setZoom] = useState(13)
  const [hasLocation, setHasLocation] = useState(false)
  const [latlng, setLatlng] = useState({ lat: 51.505, lng: -0.09 })
  const mapRef = useRef(null) 
  const map = useMap();

  const handleClick = () => {
    const map = mapRef.current

    if (map !== null) {
      map.leafletElement.locate()
    }
  }
  
  var popup = L.popup();
  
  const handleLocationFound = (e) => {
    popup
        
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        setHasLocation(true)
        setLatlng(e.latlng)      
        map.flyTo(e.latlng, map.getZoom());  
  }
  const marker = hasLocation ? (
    <Marker position={latlng}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null

  return (
    <MapContainer
      length={4}
      zoom={zoom}
      ref={mapRef}
      center={latlng}
      onClick={handleClick}     
      style={{ height: "500px", width: '100%' }}
      onLocationfound={handleLocationFound}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
    </MapContainer>
  )
}

export default MapHandle
