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