import axios from "axios";

const URL_BASE = import.meta.env.VITE_API_URL;
const HEADER = {
  "Accept": "*/*",
  "Content-Type": "application/json"
};

if (!URL_BASE) {
  let errorENV = 'No se encontró alguna de las variables en el archivo .env'
  throw errorENV //Archivo .env
}

// Conectar a usuarios
export const API_SERVER = axios.create({
  baseURL: URL_BASE + '/users',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});

// Conectar a los lugares
export const API_SERVER_PLACES = axios.create({
  baseURL: URL_BASE + '/places',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});

// Conectar a las casas
export const API_SERVER_HOUSES = axios.create({
  baseURL: URL_BASE + '/houses',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});


// Conectar a las rutas
export const API_SERVER_ROUTES = axios.create({
  baseURL: URL_BASE + '/routes',
  headers: HEADER,
  withCredentials: true,
  timeout: 60000,
});