'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

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
            onRouteFound(distance, coordinates)
            
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

const AddLocationForm = ({ position, onSave, onCancel }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('place')

  const handleSave = () => {
    onSave({ name, type, lat: position.lat, lng: position.lng })
  }

  return (
    <div className="space-y-2">
      <Input 
        placeholder="Nombre del lugar" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Select value={type} onValueChange={setType}>
        <option value="place">Lugar</option>
        <option value="house">Residencia</option>
      </Select>
      <div className="flex space-x-2">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  )
}

export default function MapComponent({ 
  locations, 
  routes,
  routeStart, 
  routeEnd, 
  onSetRoute,
  onRouteFound,
  onAddLocation,
  onSaveRoute
}) {
  const [newLocationPosition, setNewLocationPosition] = useState(null)
  const [currentRoute, setCurrentRoute] = useState(null)
  const mapRef = useRef(null)

  const handleMapClick = useCallback((e) => {
    setNewLocationPosition(e.latlng)
  }, [])

  const handleSaveLocation = useCallback((locationData) => {
    onAddLocation(locationData)
    setNewLocationPosition(null)
  }, [onAddLocation])

  const handleCancelAddLocation = useCallback(() => {
    setNewLocationPosition(null)
  }, [])

  const handleRouteClick = useCallback((e, route) => {
    if (route) {
      const map = mapRef.current
      if (map) {
        const clickLatLng = e.latlng
        const closestPoint = L.GeometryUtil.closest(map, route.coordinates, clickLatLng)
        
        if (closestPoint) {
          const popupContent = `
            <div>
              <p>Distancia: ${route.distance.toFixed(2)} km</p>
              <button id="saveRouteBtn" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar Ruta</button>
            </div>
          `

          const popup = L.popup()
            .setLatLng(closestPoint)
            .setContent(popupContent)
            .openOn(map)

          // Add event listener to the save button
          setTimeout(() => {
            const saveBtn = document.getElementById('saveRouteBtn')
            if (saveBtn) {
              saveBtn.addEventListener('click', () => {
                onSaveRoute(route)
                popup.close()
              })
            }
          }, 0)
        }
      }
    }
  }, [onSaveRoute])

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick
    })
    return null
  }

  return (
    <MapContainer 
      center={[9.3343, -70.5853]} 
      zoom={12} 
      style={{ height: '400px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
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
      {newLocationPosition && (
        <Popup position={[newLocationPosition.lat, newLocationPosition.lng]}>
          <AddLocationForm 
            position={newLocationPosition}
            onSave={handleSaveLocation}
            onCancel={handleCancelAddLocation}
          />
        </Popup>
      )}
      {routeStart && routeEnd && (
        <RoutingMachine 
          start={routeStart} 
          end={routeEnd} 
          onRouteFound={(distance, coordinates) => {
            onRouteFound(distance)
            setCurrentRoute({ start: routeStart, end: routeEnd, distance, coordinates })
          }} 
        />
      )}
      {routes.map((route) => (
        <Polyline 
          key={route.id} 
          positions={route.coordinates} 
          color="#4CAF50" 
          weight={4} 
          eventHandlers={{
            click: (e) => handleRouteClick(e, route)
          }}
        />
      ))}
      {currentRoute && (
        <Polyline 
          positions={currentRoute.coordinates} 
          color="#6366F1" 
          weight={6} 
          eventHandlers={{
            click: (e) => handleRouteClick(e, currentRoute)
          }}
        />
      )}
    </MapContainer>
  )
}