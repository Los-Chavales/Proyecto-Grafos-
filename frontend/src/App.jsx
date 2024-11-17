import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MapComponent from './components/MapComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/Auth_context'; 

//Página 404

const NotFound = () => {
  return (
    <>
      <div className='notFound'>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no se encuentra disponible.</p>
      </div>
    </>
  );
};

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
        name_place: `lugar-${Date.now()}`, // Personaliza según tu flujo
        place_coords: [selectedPlace.lat,selectedPlace.lng],
        //type: 'place',
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmZDlmOGE0LWJmNTktNGJlZi1iNjc0LTkxMTFlZWIzOWVjNCIsIm5hbWUiOiJ1c3VhcmlvX2NsaWVudGUiLCJyb2wiOiJjbGllbnRlIiwicGhvbmUiOiIwNDE0LTc3Nzc3NzgiLCJpYXQiOjE3MzE4MTI2MjcsImV4cCI6MTczMTgxNjIyN30.-xFvYLLoIGjvilo0yx4bFZvLF39gUNyf73IwMusMFhk",
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
      <AuthProvider> 
        <Header/>
          <div className='contenido'>
            <div className='map'>
            <MapComponent places={places} onPlaceSelect={handlePlaceSelect} />
            </div>
          </div>
        <Footer/>
        <button onClick={savePlaceToBackend}>Guardar Lugar</button>
      </AuthProvider>
    </>
  )
}

export default App