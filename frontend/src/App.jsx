import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './components/MapComponent';
import Footer from './components/Footer';
import Header from './components/Header';

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
    <Router>
      <Header/>
        <div className='contenido'>
          <div className='map'>
          <MapComponent places={[]} onMapClick={handleMapClick} markers={markers} />
          </div>
        </div>
      <Footer/>
    </Router> 
    </>
  )
}

export default App