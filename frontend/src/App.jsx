import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MapComponent from './components/MapComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/Auth_context';
import { PlaceProvider } from './context/Place_context';
import { HouseProvider } from './context/House_context';
import axios from 'axios';
//const { signin, user, userDecoded, isAuth, errorsServer } = AuthProvider();
import Cookies from "js-cookie";

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
  const [routes, setRoutes] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [distanceData, setDistanceData] = useState([])
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
    /*try {
      const responseS = await fetch(import.meta.env.VITE_API_URL + '/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          [
            {
              "id_house": "6b31a3da-50bf-47e1-acb7-da41d9e6c690"
            },
            {
              "id_house": "f1ed5892-ec34-4f32-b264-6b7030e99283"
            }
          ]
      })

      const infoS = await responseS.json();
      const getHouseS = infoS.data;
      setDistanceData[getHouseS]
    } catch (error) {
      console.error(error)
    }
    */
    let datos = [
      {
        id_house: 'Edificio',
        distance: 6,
      },
      {
        id_house: 'Casa',
        distance: 4.82,
      },
    ]
    setDistanceData(datos)
  }
  useEffect(() => {
    getData()
  }, [])


  // Maneja la selección de un lugar en el mapa
  /*const handlePlaceSelect = (location) => {
    console.log('Lugar seleccionado:', location);
    setSelectedPlace(location);
  };*/

  // Enviar los datos al backend
  const saveToBackend = async (type, data) => {
    console.log('backeeeend');
    getData()
    /*try {
      if (type === "house") {
        let response = await fetch(import.meta.env.VITE_API_URL + '/houses/create_house', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get().token}`
          },
          body: JSON.stringify({
            price: 300,
            construction_materials: "acero",
            size: 270,
            rooms: 2,
            property_type: data.name,
            house_coords: [data.lat, data.lng],
            name: Cookies.get().token
          })
        })
        if (response.status != 200) return console.log(response.statusText)
        const infoH = await response.json();
        //console.log('resultado',infoH)
        const getHouses = infoH.data;
        console.debug('data',getHouses)
      } else {
        let response = await fetch(import.meta.env.VITE_API_URL + '/places/create_place', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get().token}`
          },
          body: JSON.stringify({
            //id: `place-${Date.now()}`, // ID único
            name_place: data.name, // Personaliza según tu flujo
            place_coords: [data.lat, data.lng],
            //type: 'place',
            name: Cookies.get().token
          }),
        })
        const infoP = await response.json();
        const gePlaces = infoP.data;
        console.debug(gePlaces) 
      }
    } catch (error) {
      console.error(error)
      console.log(error)
    }*/
  };

  const saveRouteToBackend = async (route) => {
    console.log(route)
    await fetch("http://localhost:4000/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(route),
    });
  };

  // Modificar la función para guardar casas
  const addHouse = async (house) => {
    const newHouse = house;
    setHouses([...houses, newHouse]);
    await saveToBackend("house", newHouse);
  };

  // Modificar la función para guardar lugares
  const addPlace = async (place) => {
    const newPlace = place;
    setPlaces([...places, newPlace]);
    await saveToBackend("place", newPlace);
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
                <h1>Mapa de Rutas</h1>
                <button onClick={saveRoutes}>Trazar ruta</button>
                <MapComponent
                  houses={houses}
                  places={places}
                  routes={routes}
                  onAddHouse={addHouse}
                  onAddPlace={addPlace}
                  fetchAndDisplayRoutes={fetchAndDisplayRoutes}
                  selectedHouse={selectedHouse}
                  setSelectedHouse={setSelectedHouse}
                />

              </div>

            </div>
            <button onClick={saveToBackend}>Recargar</button>
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
            <Footer />

          </HouseProvider>
        </PlaceProvider>
      </AuthProvider>
    </>
  )
}

export default App