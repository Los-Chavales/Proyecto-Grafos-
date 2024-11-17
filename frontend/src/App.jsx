import React, { useEffect, useState } from 'react'
import './App.css'
import MapComponent from './components/MapComponent';

function App() {
  const [places, setPlaces] = useState([]); // Lugares existentes
  const [houses, setHouses] = useState([]); // Casas existentes
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  //Para obtener los lugares de la DB
  useEffect(() => {
    async() => {
      const getHouses = await fetch('http://localhost:4000/houses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json()).then(data => {return data.data});
      const getPlaces = await fetch('http://localhost:4000/places', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json()).then(data => {return data.data});
      console.debug(getHouses, getPlaces)
      setPlaces(getPlaces);
      setHouses(getHouses);
    }
  }, [])
  

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
      setPlaces((prev) => [...prev, data]); // Agrega al mapa
    } else {
      alert('Error al guardar el lugar');
      console.error(data.error);
    }
  };

  // Envía la casa seleccionada al backend para guardarlo como nodo
  const saveHouseToBackend = async () => {
    if (!selectedPlace) return alert('Por favor, selecciona un lugar primero.');

    const response = await fetch('http://localhost:4000/houses/create_house', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: 300,
        construction_materials: "acero",
        size: 270,
        rooms: 2,
        property_type: `casa-${Date.now()}`,
        house_coords: [selectedPlace.lat,selectedPlace.lng],
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwZTc3ZmU1LWY0MjgtNDFhNi1iNGFjLTkxMmNlYmFkNTMyZSIsIm5hbWUiOiJ1c3VhcmlvX3Byb3BpZXRhcmlvIiwicm9sIjoicHJvcGlldGFyaW8iLCJwaG9uZSI6IjA0MTQtNzc3Nzc4OCIsImlhdCI6MTczMTgyMzA0MCwiZXhwIjoxNzMxODI2NjQwfQ.W9SvLn6ZlGOshq_nr-wlEopXoqWWmyKNST46C2nqnLM",
      }),
    });

    const info = await response.json();
    const data = info.data;
    console.debug(data);
    if (response.ok) {
      alert('Residencia guardada exitosamente');
      setHouses((prev) => [...prev, data]); // Agrega al mapa
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
      <button onClick={saveHouseToBackend}>Guardar Casa</button>
    </>
  )
}

export default App