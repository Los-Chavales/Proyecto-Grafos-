import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  onMapClick,
  setOrigin,
  setDestination,
  calculateAndDisplayRoute,
  saveRoute,
}) => {
  const [tempMarker, setTempMarker] = useState(null);

  const handleAddLocation = (type) => {
    onMapClick({ lat: tempMarker.lat, lng: tempMarker.lng }, type);
    setTempMarker(null);
  };

  return (
    <MapContainer center={[10.0, -69.3]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Manejo de eventos del mapa */}
      <MapEventHandler
        onMapClick={(latlng) => {
          setTempMarker(latlng);
        }}
      />

      {/* Marcador temporal */}
      {tempMarker && (
        <Marker position={tempMarker}>
          <Popup>
            <button onClick={() => handleAddLocation('house')}>Añadir Casa</button>
            <button onClick={() => handleAddLocation('place')}>Añadir Lugar</button>
          </Popup>
        </Marker>
      )}

      {/* Marcadores de casas */}
      {houses.map((house, idx) => (
        <Marker key={idx} position={[house.lat, house.lng]} icon={houseIcon}>
          <Popup>{house.id}</Popup>
        </Marker>
      ))}

      {/* Marcadores de lugares */}
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.lat, place.lng]} icon={placeIcon}>
          <Popup>
            <p>{place.id}</p>
            <button onClick={() => setOrigin(place)}>Establecer como Origen</button>
            <button onClick={() => setDestination(place)}>Establecer como Destino</button>
          </Popup>
        </Marker>
      ))}

      {/* Líneas de las rutas */}
      {routes.map((route, idx) => (
        <Polyline
          key={idx}
          positions={route.geometry}
          color="blue"
          eventHandlers={{
            click: () => {
              const popup = L.popup()
                .setLatLng(route.geometry[0])
                .setContent(
                  `<div>
                     <p>Distancia: ${route.distance.toFixed(2)} km</p>
                     <button id="saveRouteBtn">Guardar Ruta</button>
                   </div>`
                )
                .openOn(this._map);
              document.getElementById('saveRouteBtn').addEventListener('click', () => saveRoute(route));
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
