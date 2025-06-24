import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const WeatherMap = ({ onLocationSelected }) => {
    const [position, setPosition] = useState([-6.2, 106.8])

    const MapClickHandler = () => {
        useMapEvent({
            click(e) {
                const { lat, lng } = e.latlng
                setPosition([lat, lng])
                onLocationSelected({ lat, lon: lng })
            }
        })
        return null
    }

    return (
        <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="w-full h-full rounded-xl"
        >
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={position} />
            <MapClickHandler />
        </MapContainer>
    )
}

export default WeatherMap