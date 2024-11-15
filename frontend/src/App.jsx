import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './components/MapComponent';

function App() {
  const [markers, setMarkers] = useState([]);
  
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkers([...markers, { position: [lat, lng], label: `Nuevo lugar (${lat.toFixed(2)}, ${lng.toFixed(2)})` }]);
    // Aquí puedes almacenar la ubicación en la base de datos (ej. llamando a una API de Node.js)
  };

  return (
    <>
      <div>
        <MapComponent places={[]} onMapClick={handleMapClick} markers={markers} />
      </div>
    </>
  )
}

export default App
