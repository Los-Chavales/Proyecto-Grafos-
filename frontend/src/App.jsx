import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MapComponent from './components/MapComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/Auth_context';
import { PlaceProvider } from './context/Place_context';
import { HouseProvider } from './context/House_context';
import { useGET } from './context/Get_context';
import axios from 'axios';

import { API_SERVER_ROUTES } from "./utils/api/conexion_server";

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
  //const [places, setPlaces] = useState([]); // Lugares existentes
  //const [houses, setHouses] = useState([]); // Casas existentes

  const [routes, setRoutes] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const { places, houses, distanceData, getData, getWinningHouse } = useGET();

  

  useEffect(() => {
    getData()
    getWinningHouse()
  }, [])


  // Maneja la selección de un lugar en el mapa
  /*const handlePlaceSelect = (location) => {
    console.log('Lugar seleccionado:', location);
    setSelectedPlace(location);
  };*/

  // Esto enviaba los datos al backend
  // Ahora recarga los datos del mapa
  const recharge_page = async () => {
    console.log('Datos actualizados')
    getData()
    getWinningHouse()
  };

  const saveRouteToBackend = async (route) => {
/*     console.log("lo que va recibiendo para las rutas")
    console.log(route) */  

    let data = [
      {
        distance: route.distance,
        //geometry: route.geometry,
        geometry: [1,2,3,4],
        house: {
          lat: route.house.lat,
          lng: route.house.lng,
          name: route.house.property_type
        },
        place: {
          lat: route.place.lat,
          lng: route.place.lng,
          name: route.place.name_place
        }
      }
    ]

    console.log("DATA")
    console.log(data)

    const responseR = await API_SERVER_ROUTES.post("/create_route", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );

    console.log("lo que salió del backend")
    console.log(responseR.data)

    /*    await fetch("http://localhost:4000/routes/create_route", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });  */
  };

  //Calcular rutas
  const fetchAndDisplayRoutes = async (houses, places) => {
    const newRoutes = [];
    for (const house of houses) {
      for (const place of places) {
        try {
          // Usa la API de OSRM para obtener la ruta más corta
          const response = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${house.lng},${house.lat};${place.lng},${place.lat}?overview=full&geometries=geojson`,
            { params: { overview: 'full', geometries: 'geojson' } }
          );
          const route = response.data.routes[0];
          newRoutes.push({
            house: house,
            place: place,
            geometry: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
            distance: route.distance / 1000, // Convierte metros a kilómetros
          });
        } catch (error) {
          console.error('Error al calcular la ruta:', error);
        }
      }
    }
    setRoutes(newRoutes);
  };

  // Enviar rutas al backend
  const saveRoutes = async () => {
    for (const route of routes) {
      console.log(route)
      await saveRouteToBackend({
        house: route.house,
        place: route.place,
        distance: route.distance,
        geometry: route.geometry,
      });
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
                <h1 className='title'>Mapa de Rutas</h1>
                <div style={{ marginBottom: "20px" }}>
                  {/* Mostrar lista de casas ordenadas por distancia */}
                  <h3>Casas por distancia total:</h3>
                  <ul>
                    {distanceData.map((item, index) => (
                      <li
                        key={item.id_house}
                        style={{
                          fontWeight: index === 0 ? "bold" : "normal", // Resaltar la casa con menor distancia
                          color: index === 0 ? "green" : "black", // Color opcional para destacar
                        }}
                      >
                        {item.id_house}: {item.distance.toFixed(2)} km
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={recharge_page} className='rutes'>Recargar</button>

                <button className='rutes' onClick={saveRoutes}>Trazar ruta</button>



              </div>
              <MapComponent
                houses={houses}
                places={places}
                routes={routes}
                fetchAndDisplayRoutes={fetchAndDisplayRoutes}
                selectedHouse={selectedHouse}
                setSelectedHouse={setSelectedHouse}
              />
            </div>

            <Footer />

          </HouseProvider>
        </PlaceProvider>
      </AuthProvider>
    </>
  )
}

export default App