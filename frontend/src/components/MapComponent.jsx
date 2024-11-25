import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';
import Register_entity from './Register_entity_form';

// Iconos personalizados
const houseIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/69/69524.png',
  iconSize: [25, 25],
});

const placeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [25, 25],
});

const MapEventHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng); // Llama a la función `onMapClick` del componente padre con las coordenadas
    },
  });
  return null;
};

const MapComponent = ({
  houses,
  places,
  routes,
  fetchAndDisplayRoutes,
  selectedHouse,
  setSelectedHouse,
}) => {
  const [tempMarker, setTempMarker] = useState(null);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    if (selectedHouse && places.length > 0) {
      // Calcula rutas automáticamente cuando una casa está seleccionada
      fetchAndDisplayRoutes([selectedHouse], places);
    }
  }, [selectedHouse, places, fetchAndDisplayRoutes]);

  return (
    <div>
      <select className='rutesOp'
        value={selectedHouse ? selectedHouse.name : ''}
        onChange={(e) =>
          setSelectedHouse(houses.find((house) => house.name === e.target.value) || null)
        }
      >
        <option value=""  >Selecciona una casa</option>
        {houses.map((house, idx) => (
          <option key={idx} value={house.name}>
            {house.name}
          </option>
        ))}
      </select>

      <MapContainer center={[9.3022, -70.5920]} zoom={13} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Manejo de eventos del mapa */}
        <MapEventHandler
          onMapClick={(latlng) => {
            setTempMarker(latlng); // Marca temporalmente la posición clickeada
          }}
        />

        {/* Marcador temporal */}
        {tempMarker && (
          <Marker position={tempMarker}>
            <Popup>
              {/* Coordenadas seleccionadas: {tempMarker.join(', ')} */}
              {/* <input
                type="text"
                placeholder="Nombre"
                value={tempName}
                onChang={(e) => setTempName(e.target.value)}
              />
              <button onClick={() => handleAddLocation('house')}>Guardar como Casa</button>
              <button onClick={() => handleAddLocation('place')}>Guardar como Lugar</button>e */}
              <p><strong>Coordenadas:</strong>{tempMarker.lat} {tempMarker.lng}</p>
              <Register_entity newLocation={tempMarker} /> 
            </Popup>
          </Marker>
        )}

        {/* Marcadores de casas */}
        {houses.map((house, idx) => (
          <Marker key={idx} position={[house.lat, house.lng]} icon={houseIcon}>
            <Popup>
              <div><strong>Casa:</strong> {house.name}</div>
              <div><strong>Propietario:</strong> {house.user_name}</div>
              <div><strong>Teléfono:</strong> {house.user_phone}</div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de lugares */}
        {places.map((place, idx) => (
          <Marker key={idx} position={[place.lat, place.lng]} icon={placeIcon}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}

        {/* Líneas de las rutas */}
        {routes.map((route, idx) => (
          <Polyline key={idx} positions={route.geometry} color="blue">
            <Popup>Distancia: {route.distance.toFixed(2)} km</Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;