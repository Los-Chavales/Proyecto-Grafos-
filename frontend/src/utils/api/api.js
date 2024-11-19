// Simula una base de datos en memoria
let locations = [
  { id: 1, name: "Residencia en Valera", type: "house", lat: 9.3186, lng: -70.6036 },
  { id: 2, name: "Lugar de trabajo en Carvajal", type: "place", lat: 9.3500, lng: -70.5667 },
  { id: 3, name: "Plaza Bolívar de Valera", type: "place", lat: 9.3178, lng: -70.6072 },
  { id: 4, name: "Terminal de Valera", type: "place", lat: 9.3231, lng: -70.6039 }
];

let routes = [];

// Simula una llamada a la API para obtener las ubicaciones
export async function fetchLocations() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.isArray(locations) ? locations : [];
}

// Simula una llamada a la API para guardar una nueva ubicación
export async function saveLocation(location) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newLocation = { ...location, id: locations.length + 1 };
  locations.push(newLocation);
  return newLocation;
}

// Simula una llamada a la API para obtener las rutas
export async function fetchRoutes() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.isArray(routes) ? routes : [];
}

// Simula una llamada a la API para guardar una nueva ruta
export async function saveRoute(route) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newRoute = { ...route, id: routes.length + 1 };
  routes.push(newRoute);
  return newRoute;
}