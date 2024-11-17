import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ places, onPlaceSelect }) => {
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
      center={[10.0, -69.3]} // Coordenadas iniciales
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.lat, place.lng]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;