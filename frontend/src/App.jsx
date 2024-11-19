import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import axios from 'axios';

const App = () => {
  const [houses, setHouses] = useState([]);
  const [places, setPlaces] = useState([]);
  const [routes, setRoutes] = useState([]);

  const addHouse = (coords) => {
    const newHouse = { lat: coords.lat, lng: coords.lng };
    setHouses([...houses, newHouse]);
  };

  const addPlace = (coords) => {
    const newPlace = { lat: coords.lat, lng: coords.lng };
    setPlaces([...places, newPlace]);
  };

  const fetchAndDisplayRoutes = async (houses, places) => {
    const newRoutes = [];
    for (const house of houses) {
      for (const place of places) {
        try {
          // Usa la API de OSRM para obtener la ruta más corta
          const response = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${house.lng},${house.lat};${place.lng},${place.lat}`,
            { params: { overview: 'full', geometries: 'geojson' } }
          );
          const route = response.data.routes[0];
          newRoutes.push({
            geometry: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
            distance: route.distance / 1000, // Convierte metros a kilómetros
          });
        } catch (error) {
          console.error('Error al calcular la ruta:', error);
        }
      }
    }
    setRoutes(newRoutes);
  };

  return (
    <div>
      <h1>Mapa de Rutas</h1>
      <MapComponent
        houses={houses}
        places={places}
        routes={routes}
        onAddHouse={addHouse}
        onAddPlace={addPlace}
        fetchAndDisplayRoutes={fetchAndDisplayRoutes}
      />
    </div>
  );
};

export default App;
