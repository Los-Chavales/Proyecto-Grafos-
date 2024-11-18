'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "./ui/button"
/*import icon1 from '../assets/place-icon.png'
import icon2 from '../assets/logo1.png'
import icon3 from '../assets/house-icon.png'*

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon3,
  iconUrl: icon2,
  shadowUrl: icon1,
});*/

const RoutingMachine = ({ start, end, onRouteFound }) => {
  const map = useMap()
  const [routeCoordinates, setRouteCoordinates] = useState([])

  useEffect(() => {
    const fetchRoute = async () => {
      if (start && end) {
        try {
          const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`)
          const data = await response.json()
          
          if (data.routes && data.routes.length > 0) {
            const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]])
            setRouteCoordinates(coordinates)
            
            const distance = data.routes[0].distance / 1000 // Convert to km
            onRouteFound(distance)
            
            // Fit the map to the route
            const bounds = L.latLngBounds(coordinates)
            map.fitBounds(bounds, { padding: [50, 50] })
          }
        } catch (error) {
          console.error("Error fetching route:", error)
        }
      }
    }

    fetchRoute()
  }, [map, start, end, onRouteFound])

  return <Polyline positions={routeCoordinates} color="#6366F1" weight={6} />
}

export default function MapComponent({ 
  locations, 
  routeStart, 
  routeEnd, 
  onSetRoute,
  onRouteFound
}) {
  return (
    <MapContainer 
      center={[9.3343, -70.5853]} 
      zoom={12} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>
            <div>
              <h3>{location.name} ({location.type})</h3>
              <Button onClick={() => onSetRoute(location, true)}>Establecer como inicio</Button>
              <Button onClick={() => onSetRoute(location, false)}>Establecer como destino</Button>
            </div>
          </Popup>
        </Marker>
      ))}
      {routeStart && routeEnd && (
        <RoutingMachine start={routeStart} end={routeEnd} onRouteFound={onRouteFound} />
      )}
    </MapContainer>
  )
}