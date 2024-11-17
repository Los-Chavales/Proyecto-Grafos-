import React, { useState } from 'react'
import './App.css'
import MapComponent from './components/MapComponent';

function App() {
  const [places, setPlaces] = useState([]); // Lugares existentes
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Maneja la selección de un lugar en el mapa
  const handlePlaceSelect = (location) => {
    console.log('Lugar seleccionado:', location);
    setSelectedPlace(location);
  };

  // Envía el lugar seleccionado al backend para guardarlo como nodo
  const savePlaceToBackend = async () => {
    if (!selectedPlace) return alert('Por favor, selecciona un lugar primero.');

    const response = await fetch('/api/add-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: `place-${Date.now()}`, // ID único
        name: 'Nuevo Lugar', // Personaliza según tu flujo
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
        type: 'place',
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Lugar guardado exitosamente');
      setPlaces((prev) => [...prev, data.location]); // Agrega al mapa
    } else {
      alert('Error al guardar el lugar');
      console.error(data.error);
    }
  };

  return (
    <>
      <div className='map'>
        <MapComponent places={places} onPlaceSelect={handlePlaceSelect} />
      </div>
      <button onClick={savePlaceToBackend}>Guardar Lugar</button>
    </>
  )
}

export default App