import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import houseIconUrl from '../assets/house-icon.png'; // Asegúrate de tener estos íconos
import placeIconUrl from '../assets/place-icon.png';

const houseIcon = new L.Icon({
  iconUrl: houseIconUrl,
  iconSize: [25, 25],
});

const placeIcon = new L.Icon({
  iconUrl: placeIconUrl,
  iconSize: [25, 25],
});

const MapComponent = ({ houses, places, onPlaceSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Componente para capturar clics en el mapa
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
        onPlaceSelect({ lat, lng }); // Notifica al componente padre
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition}>
        <Popup>Coordenadas seleccionadas: {selectedPosition.join(', ')}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[9.3022, -70.5920]} // Coordenadas iniciales
      zoom={13}
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marcadores de casas */}
      {houses.map((house, idx) => (
        <Marker key={idx} position={[house.lat, house.lng]} icon={houseIcon}>
          <Popup>{house.name}</Popup>
        </Marker>
      ))}

      {/* Marcadores de lugares */}
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.lat, place.lng]} icon={placeIcon}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}

      {/* Clic en el mapa para agregar nodos */}
      <LocationMarker onPlaceSelect={onPlaceSelect} />

    </MapContainer>
  );
};

export default MapComponent;