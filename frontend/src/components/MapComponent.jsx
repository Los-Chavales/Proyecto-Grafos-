// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importa los iconos de Leaflet usando ES6
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configura los iconos predeterminados
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ places, onMapClick, markers }) => {
  const initialPosition = [10.0, -69.3]; // Coordenadas iniciales (ejemplo)

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '100vh', width: '100%' }} onClick={onMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.lat, place.lng]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;