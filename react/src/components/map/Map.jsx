import React, { Component, useEffect, useRef, useState, } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Circle, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Map.defaultProps = {
//   stores: [
//     {
//       Name
//         :
//         "Elif Selim",
//       cName
//         :
//         "ESSO",
//       sId
//         :
//         2,
//       sLatitude
//         :
//         51.5,
//       sLongitude
//         :
//         -2.11,
//       sName
//         :
//         "BP Bristol2"
//     }],
//   height: 400,
//   zoom: 8,
//   position: {
//     lat: 51.5,
//     lng: -2.11
//   },
// }

export default function Map(props) {

  console.log('Props', props)  
  const [activeStore, setActiveStore] = useState(null);
  // importing custom SVG icon uding leaflet Icon class which will override the default icon
  const carWash = new Icon({
    iconUrl: "/src/assets/common/carWash.svg",
    iconSize: [35, 35]
  });

  const home = new Icon({
    iconUrl: "/src/assets/img/home.svg",
    iconSize: [35, 35]
  });

  const HandleClickMap = () => {
    const [position, setPosition] = useState(null)
    const map = useMap()

    function onMapClick(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom());
      const event = new CustomEvent('mapChanged', { detail: { lat: e.latlng.lat, lng: e.latlng.lng } });
      document.dispatchEvent(event);
    }
    map.on('click', onMapClick);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Is the position correct?</Popup>
      </Marker>
    )
  }

  return (
    <>
      {props !== null && props.position !== null && props.position !== undefined && props.stores !== null && Object.hasOwn(props.position, 'lat') &&
        <MapContainer
          center={[props.position == null ? 51.5 : props.position.lat, props.position == null ? -0.11 : props.position.lng]}
          zoom={props.zoom}
          style={{ height: props.height + 'px', width: '100%' }}
          scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <HandleClickMap />
          {props.stores != null} &&
          {props.stores.map((store) =>
          (<Marker
            key={store.sId}
            position={[
              store.sLatitude,
              store.sLongitude
            ]}
            eventHandlers={{
              click: () => {
                setActiveStore(store)
              },
            }}

            icon={carWash}
          />
          ))}

          {activeStore &&
            (<Popup
              position={[
                activeStore.sLatitude,
                activeStore.sLongitude
              ]}
            >
              <div>
                <h2>{activeStore.sName}</h2>
                <p>{activeStore.cName}</p>
              </div>

            </Popup>
            )}
          <Marker position={[props.position.lat, props.position.lng]} icon={home}>

          </Marker>
        </MapContainer>
      }
    </>
  )

}
