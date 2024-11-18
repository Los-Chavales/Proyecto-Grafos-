import { createContext, useContext, useState, useEffect } from "react";
import { API_SERVER } from "../utils/api/conexion_server.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth no está dentro de un AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userDecoded, setUserDecoded] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [mensage, setMensage] = useState(false);
    const [errorsServer, setErrorsServer] = useState([]);
    const [loading, setLoading] = useState(true);

    //Limpiar errores en el formulario de login
    useEffect(() => {
        if (errorsServer.length > 0) {
            const timer = setTimeout(() => {
                setErrorsServer([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorsServer]);

    //Registar usuarios
    async function signup(dataForm) {
        //console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/register", dataForm);

            console.log(RESPONSE.data)
            //console.debug(RESPONSE);

            if (RESPONSE.status != 200) {
                return console.log(RESPONSE.response.data);
            }

            console.log(RESPONSE.data);
            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            //console.debug(error)
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al registrar usuario:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }
    //Iniciar sesión
    async function signin(dataForm) {
        //console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/login", dataForm);
            if (RESPONSE.status != 200) {
                return console.warn(RESPONSE.response.data);
            }
          /*   console.log(RESPONSE.data);

            console.log(RESPONSE.data.token) */
            verifyToken(RESPONSE.data)

            setUser(RESPONSE.data)
            setIsAuth(true)

        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al iniciar sesión:', menError);
            setErrorsServer([menError]);
            return error;
        }


    }
    //Cerrar sesión
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
    };

    //Para validar el token
    async function verifyToken(dataForm) {
    
        console.log(dataForm)
        try {
            const RESPONSE = await API_SERVER.post("/decoded_token", dataForm);
            if (RESPONSE.status != 200) {
                return console.warn(RESPONSE.response.data);
            }

       /*      console.log("al menos decodifica eso?")
            console.log(RESPONSE.data); */
            setUserDecoded(RESPONSE.data)

        } catch (error) {
            let menError = error.message;
            if (error.response && error.response.data && error.response.data.message) menError = error.response.data.message;
            if (!menError) menError = "Error";
            console.error('Error al iniciar sesión:', menError);
            setErrorsServer([menError]);
            return error;
        }
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                userDecoded,
                signup,
                signin,
                logout,
                isAuth,
                loading,
                mensage,
                errorsServer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;