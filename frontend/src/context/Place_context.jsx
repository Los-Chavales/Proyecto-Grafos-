import { createContext, useContext, useState, useEffect } from "react";
import { API_SERVER_PLACES } from "../utils/api/conexion_server.js";

export const PlaceContext = createContext();

export const usePlace = () => {
    const context = useContext(PlaceContext);
    if (!context) throw new Error("usePlace no está dentro de un ReportProvider");
    return context;
};

export const PlaceProvider = ({ children }) => {
    const [place, setPlace] = useState(null);
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

    async function register_place(dataForm, token) {

        try {
            const RESPONSE = await API_SERVER_PLACES.post("/create_place", dataForm, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            );

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }
            //Para borrar todos los inputs
            for (let input of document.querySelectorAll('.form_input')) {
                input.value = ''
            }
            document.querySelector('.leaflet-popup-close-button').click();//Cerrar la popup
            setPlace(RESPONSE.data);
            setMensage(true);
            alert('Registro exitoso');

        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al registrar el lugar:', menError);
            console.debug(menError);
            setErrorsServer([menError]);
            return error;
        }
    }

    return (
        <PlaceContext.Provider
            value={{
                place,
                register_place,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </PlaceContext.Provider>
    );
};

export default PlaceContext;