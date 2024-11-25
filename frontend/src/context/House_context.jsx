import { createContext, useContext, useState, useEffect } from "react";
import { API_SERVER_HOUSES } from "../utils/api/conexion_server.js";

export const HouseContext = createContext();

export const useHouse = () => {
    const context = useContext(HouseContext);
    if (!context) throw new Error("usePlace no está dentro de un ReportProvider");
    return context;
};

export const HouseProvider = ({ children }) => {
    const [house, setHouse] = useState(null);
    const [mensage, setMensage] = useState(false);
    const [errorsServer, setErrorsServer] = useState([]);


    useEffect(() => {
        if (errorsServer.length > 0) {
          const timer = setTimeout(() => {
            setErrorsServer([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errorsServer]);

    async function register_house(dataForm, token) {
        try {
            const RESPONSE = await API_SERVER_HOUSES.post("/create_house", dataForm, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                }
            );

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }
            document.querySelector('.form_input').value = '';
            document.querySelector('.leaflet-popup-close-button').click();
            setHouse(RESPONSE.data);
            setMensage(true);
            alert('Registro exitoso');

        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al registrar la casa:', menError);
            console.debug(menError);
            setErrorsServer([menError]);
            return error;
        }
    }

    return (
        <HouseContext.Provider
            value={{
                house,
                register_house,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </HouseContext.Provider>
    );
};

export default HouseContext;