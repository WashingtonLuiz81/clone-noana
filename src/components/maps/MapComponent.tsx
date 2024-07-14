import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

interface MapComponentProps {
  apiKey: string
  lat: number
  lng: number
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, lat, lng }) => {
  const center = { lat, lng }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Children components, like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
