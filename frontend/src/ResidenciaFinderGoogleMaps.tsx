import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Select } from "./ui/Select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

const mapContainerStyle = {
  width: '100%',
  height: '600px'
}

const center = {
  lat: 0,
  lng: 0
}

function ResidenciaFinderGoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'
  })

  const [map, setMap] = useState(null)
  const [locations, setLocations] = useState([])
  const [newLocation, setNewLocation] = useState(null)
  const [directions, setDirections] = useState(null)
  const [selectedStart, setSelectedStart] = useState(null)
  const [selectedEnd, setSelectedEnd] = useState(null)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMapClick = (e) => {
    if (e.latLng) {
      setNewLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
    }
  }

  const handleAddLocation = () => {
    if (newLocation && newLocation.name && newLocation.type) {
      const location = {
        id: Date.now().toString(),
        name: newLocation.name,
        type: newLocation.type,
        lat: newLocation.lat,
        lng: newLocation.lng
      }
      setLocations([...locations, location])
      setNewLocation(null)
    }
  }

  const calculateRoute = () => {
    if (selectedStart && selectedEnd) {
      const directionsService = new window.google.maps.DirectionsService()
      directionsService.route(
        {
          origin: { lat: selectedStart.lat, lng: selectedStart.lng },
          destination: { lat: selectedEnd.lat, lng: selectedEnd.lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
          } else {
            console.error(`error fetching directions ${result}`)
          }
        }
      )
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Mapa de Ubicaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={2}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={handleMapClick}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.name}
                  icon={location.type === 'house' ? '/house-icon.png' : '/place-icon.png'}
                />
              ))}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div>Cargando mapa...</div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="start-location">Ubicación de inicio</Label>
          <Select id="start-location" onValueChange={(value) => setSelectedStart(locations.find(l => l.id === value) || null)}>
            <option value="">Seleccionar inicio</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="end-location">Ubicación de destino</Label>
          <Select id="end-location" onValueChange={(value) => setSelectedEnd(locations.find(l => l.id === value) || null)}>
            <option value="">Seleccionar destino</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </Select>
        </div>
      </div>

      <Button onClick={calculateRoute} className="mb-4">Calcular Ruta</Button>

      {newLocation && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Agregar nueva ubicación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location-name">Nombre</Label>
                <Input
                  id="location-name"
                  value={newLocation.name || ''}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location-type">Tipo</Label>
                <Select
                  id="location-type"
                  value={newLocation.type || ''}
                  onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                >
                  <option value="place">Lugar</option>
                  <option value="house">Residencia</option>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddLocation} className="mt-4">Agregar Ubicación</Button>
          </CardContent>
        </Card>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button>Ver todas las ubicaciones</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Todas las ubicaciones</DialogTitle>
          </DialogHeader>
          <div>
            {locations.map((location) => (
              <div key={location.id} className="mb-2">
                <strong>{location.name}</strong> ({location.type}) - Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ResidenciaFinderGoogleMaps