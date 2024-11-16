import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './components/MapComponent';

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
  const [markers, setMarkers] = useState([]);
  
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkers([...markers, { position: [lat, lng], label: `Nuevo lugar (${lat.toFixed(2)}, ${lng.toFixed(2)})` }]);
    // Aquí puedes almacenar la ubicación en la base de datos (ej. llamando a una API de Node.js)
  };

  return (
    <>
      <div className='map'>
        <MapComponent places={[]} onMapClick={handleMapClick} markers={markers} />
      </div>
    </>
  )
}

export default App