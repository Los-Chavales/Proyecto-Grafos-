'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import MapComponent from './components/MapComponent'
import { fetchLocations } from './utils/api/api'

export default function App() {
  const [locations, setLocations] = useState([])
  const [routeStart, setRouteStart] = useState(null)
  const [routeEnd, setRouteEnd] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchLocations()
        setLocations(data)
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLocations()
  }, [])

  const handleSetRoute = (location, isStart) => {
    if (isStart) {
      setRouteStart(location)
    } else {
      setRouteEnd(location)
    }
  }

  const handleRouteFound = (distance) => {
    setDistance(distance)
  }

  const handleClearRoute = () => {
    setRouteStart(null)
    setRouteEnd(null)
    setDistance(null)
  }

  if (isLoading) {
    return <div>Cargando ubicaciones...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Mapa de Rutas en Valera y Carvajal</CardTitle>
        </CardHeader>
        <CardContent>
          <MapComponent
            locations={locations}
            routeStart={routeStart}
            routeEnd={routeEnd}
            onSetRoute={handleSetRoute}
            onRouteFound={handleRouteFound}
          />
          <div className="mt-4">
            <Button onClick={handleClearRoute}>Limpiar Ruta</Button>
          </div>
          {distance !== null && routeStart && routeEnd && (
            <div className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md">
              <h3 className="text-lg font-semibold">Información de la Ruta</h3>
              <p>Desde: {routeStart.name}</p>
              <p>Hasta: {routeEnd.name}</p>
              <p className="font-bold">Distancia total: {distance.toFixed(2)} km</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}