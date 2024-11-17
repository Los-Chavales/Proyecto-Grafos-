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

    const response = await fetch('http://localhost:4000/places/create_place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //id: `place-${Date.now()}`, // ID único
        name_place: 'Nuevo Lugar de Moisés', // Personaliza según tu flujo
        place_coords: [selectedPlace.lat,selectedPlace.lng],
        //type: 'place',
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmZDlmOGE0LWJmNTktNGJlZi1iNjc0LTkxMTFlZWIzOWVjNCIsIm5hbWUiOiJ1c3VhcmlvX2NsaWVudGUiLCJyb2wiOiJjbGllbnRlIiwicGhvbmUiOiIwNDE0LTc3Nzc3NzgiLCJpYXQiOjE3MzE4MTI2MjcsImV4cCI6MTczMTgxNjIyN30.-xFvYLLoIGjvilo0yx4bFZvLF39gUNyf73IwMusMFhk",
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