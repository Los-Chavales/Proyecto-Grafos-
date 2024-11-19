'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MapComponent from './MapComponent'
import { fetchLocations, saveLocation, fetchRoutes, saveRoute } from './api'

export default function App() {
  const [locations, setLocations] = useState([])
  const [routes, setRoutes] = useState([])
  const [routeStart, setRouteStart] = useState(null)
  const [routeEnd, setRouteEnd] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [locationsData, routesData] = await Promise.all([
          fetchLocations(),
          fetchRoutes()
        ])
        setLocations(Array.isArray(locationsData) ? locationsData : [])
        setRoutes(Array.isArray(routesData) ? routesData : [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSetRoute = useCallback((location, isStart) => {
    if (isStart) {
      setRouteStart(location)
    } else {
      setRouteEnd(location)
    }
  }, [])

  const handleRouteFound = useCallback((distance) => {
    setDistance(distance)
  }, [])

  const handleClearRoute = useCallback(() => {
    setRouteStart(null)
    setRouteEnd(null)
    setDistance(null)
  }, [])

  const handleAddLocation = useCallback(async (locationData) => {
    try {
      const newLocation = await saveLocation(locationData)
      setLocations(prevLocations => [...prevLocations, newLocation])
    } catch (error) {
      console.error("Error saving location:", error)
    }
  }, [])

  const handleSaveRoute = useCallback(async (route) => {
    try {
      const newRoute = await saveRoute(route)
      setRoutes(prevRoutes => [...prevRoutes, newRoute])
    } catch (error) {
      console.error("Error saving route:", error)
    }
  }, [])

  if (isLoading) {
    return <div>Cargando datos...</div>
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
            routes={routes}
            routeStart={routeStart}
            routeEnd={routeEnd}
            onSetRoute={handleSetRoute}
            onRouteFound={handleRouteFound}
            onAddLocation={handleAddLocation}
            onSaveRoute={handleSaveRoute}
          />
          <div className="mt-4">
            <Button onClick={handleClearRoute}>Limpiar Ruta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}