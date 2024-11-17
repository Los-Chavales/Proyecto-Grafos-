import React, { useState } from 'react'
import './App.css'
import MapComponent from './components/MapComponent';

function App() {
  const [places, setPlaces] = useState([]); // Lugares existentes
  const [houses, setHouses] = useState([]); // Casas existentes
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
        name_place: `lugar-${Date.now()}`, // Personaliza según tu flujo
        place_coords: [selectedPlace.lat,selectedPlace.lng],
        //type: 'place',
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmZDlmOGE0LWJmNTktNGJlZi1iNjc0LTkxMTFlZWIzOWVjNCIsIm5hbWUiOiJ1c3VhcmlvX2NsaWVudGUiLCJyb2wiOiJjbGllbnRlIiwicGhvbmUiOiIwNDE0LTc3Nzc3NzgiLCJpYXQiOjE3MzE4MjI4NjAsImV4cCI6MTczMTgyNjQ2MH0.Smyk2ims74JzUU5AsiBARAVqOjjxDMxgIz_bBlOrihA",
      }),
    });

    const info = await response.json();
    const data = info.data;
    console.debug(data);
    if (response.ok) {
      alert('Lugar guardado exitosamente');
      setPlaces((prev) => [...prev, {
        id: data.id, name: data.name_place, lat: data.place_coords[0], lng: data.place_coords[1], type: 'place',
      }]); // Agrega al mapa
    } else {
      alert('Error al guardar el lugar');
      console.error(data.error);
    }
  };

  return (
    <>
      <div className='map'>
        <MapComponent houses={houses} places={places} onPlaceSelect={handlePlaceSelect} />
      </div>
      <button onClick={savePlaceToBackend}>Guardar Lugar</button>
    </>
  )
}

export default App