import React, { useState } from 'react';
import MapComponent from './components/MapComponent';

const App = () => {
  const [houses, setHouses] = useState([]);
  const [places, setPlaces] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  // Añadir lugar/casa al hacer clic
  const addLocation = async (coordinates, type) => {
    const newLocation = { ...coordinates, id: Date.now(), type };
    if (type === 'house') {
      setHouses((prev) => [...prev, newLocation]);
    } else if (type === 'place') {
      setPlaces((prev) => [...prev, newLocation]);
    }
  };

  // Calcular ruta y distancia
  const calculateAndDisplayRoute = async () => {
    if (origin && destination) {
      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setRoutes([
          {
            geometry: route.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
            distance: route.distance / 1000,
            id: `${origin.id}-${destination.id}`,
          },
        ]);
      }
    }
  };

  // Guardar ruta en la base de datos
  const saveRoute = async (route) => {
    await fetch('/api/save-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originId: origin.id,
        destinationId: destination.id,
        distance: route.distance,
      }),
    });
    alert('Ruta guardada en la base de datos.');
  };

  return (
    <div>
      <h1>Mapa Interactivo</h1>
      <MapComponent
        houses={houses}
        places={places}
        routes={routes}
        onMapClick={addLocation}
        setOrigin={setOrigin}
        setDestination={setDestination}
        calculateAndDisplayRoute={calculateAndDisplayRoute}
        saveRoute={saveRoute}
      />
    </div>
  );
};

export default App;
