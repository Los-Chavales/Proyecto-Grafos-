// Simula una llamada a la API para obtener las ubicaciones
export async function fetchLocations() {
  // Simula un retraso de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Datos de ejemplo que simularían venir de la API
  return [
    { id: 1, name: "Residencia en Valera", type: "house", lat: 9.3186, lng: -70.6036 },
    { id: 2, name: "Lugar de trabajo en Carvajal", type: "place", lat: 9.3500, lng: -70.5667 },
    { id: 3, name: "Plaza Bolívar de Valera", type: "place", lat: 9.3178, lng: -70.6072 },
    { id: 4, name: "Terminal de Valera", type: "place", lat: 9.3231, lng: -70.6039 }
  ];
}