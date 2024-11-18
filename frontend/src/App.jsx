import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MapComponent from './components/MapComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/Auth_context';
import { PlaceProvider } from './context/Place_context';
import { HouseProvider } from './context/House_context';

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
  const [houses, setHouses] = useState([]); // Casas existentes
  const [selectedPlace, setSelectedPlace] = useState(null);

  //Para obtener los lugares de la DB
  const getData = async () => {
    try {
      const responseH = await fetch(import.meta.env.VITE_API_URL + '/houses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseP = await fetch(import.meta.env.VITE_API_URL + '/places', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const infoH = await responseH.json();
      const infoP = await responseP.json();
      const getPlaces = infoP.data;
      const getHouses = infoH.data;
      console.debug(getHouses, getPlaces)
      setPlaces(!Array.isArray(getPlaces) ? [] : getPlaces);
      setHouses(!Array.isArray(getHouses) ? [] : getHouses);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])


  // Maneja la selección de un lugar en el mapa
  const handlePlaceSelect = (location) => {
    console.log('Lugar seleccionado:', location);
    setSelectedPlace(location);
  };

  // Envía el lugar seleccionado al backend para guardarlo como nodo
  const savePlaceToBackend = async () => {
    if (!selectedPlace) return alert('Por favor, selecciona un lugar primero.');

    const response = await fetch(import.meta.env.VITE_API_URL + '/places/create_place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //id: `place-${Date.now()}`, // ID único
        name_place: `lugar-${Date.now()}`, // Personaliza según tu flujo
        place_coords: [selectedPlace.lat, selectedPlace.lng],
        //type: 'place',
        token: import.meta.env.VITE_TOKEN_PLACE,
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

    const response = await fetch(import.meta.env.VITE_API_URL + '/houses/create_house', {
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
        house_coords: [selectedPlace.lat, selectedPlace.lng],
        token: import.meta.env.VITE_TOKEN_HOUSE,
      }),
    });

    const info = await response.json();
    const data = info.data;
    console.debug(data);
    if (response.ok) {
      alert('Residencia guardada exitosamente');
      //getData()
      setHouses((prev) => [...prev, data]); // Agrega al mapa
    } else {
      alert('Error al guardar el lugar');
      console.error(data.error);
    }
  };

  return (
    <>
      <AuthProvider>
        <PlaceProvider>
          <HouseProvider>

            <Header />
            <div className='contenido'>
              <div className='map'>
                <MapComponent houses={houses} places={places} onPlaceSelect={handlePlaceSelect} />
              </div>
            </div>
            <Footer />
            <button onClick={savePlaceToBackend}>Guardar Lugar</button>
            <button onClick={saveHouseToBackend}>Guardar Casa</button>

          </HouseProvider>
        </PlaceProvider>
      </AuthProvider>
    </>
  )
}

export default App