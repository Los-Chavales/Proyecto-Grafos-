import { createContext, useContext, useState, useEffect } from "react";
import { API_SERVER_HOUSES } from "../utils/api/conexion_server.js";
import { API_SERVER_PLACES } from "../utils/api/conexion_server.js";

export const GETContext = createContext();

export const useGET = () => {
  const context = useContext(GETContext);
  if (!context) throw new Error("GETContext no está dentro de un ReportProvider");
  return context;
};

export const GETProvider = ({ children }) => {
  const [places, setPlaces] = useState([]); // Lugares existentes
  const [houses, setHouses] = useState([]); // Casas existentes
  const [distanceData, setDistanceData] = useState([])

  //Para obtener los lugares de la DB
  async function getData() {
    try {
      const responseH = await API_SERVER_HOUSES.get("/", {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      
      const responseP = await API_SERVER_PLACES.get("/", {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );

      const getHouses = responseH.data.data;
      const getPlaces = responseP.data.data;
      console.debug(getHouses, getPlaces)
      setPlaces(!Array.isArray(getPlaces) ? [] : getPlaces);
      setHouses(!Array.isArray(getHouses) ? [] : getHouses);
    } catch (error) {
      console.error(error)
    }

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

  return (
    <GETContext.Provider
      value={{
        places,
        houses,
        distanceData,
        getData
      }}
    >
      {children}
    </GETContext.Provider>
  );
};

export default GETContext;