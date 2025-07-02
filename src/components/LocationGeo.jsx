import React, { useEffect, useState } from 'react'
import { fetchCurrentWeather } from '../services/weatherService'

const LocationGeo = ({ position, setPosition }) => {
    const [error, setError] = useState(null)
    const [currentWeather, setCurrentWeather] = useState([])

    // Ambil posisi geografis
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError('Geolocation tidak didukung di browser ini');
        }
    }, [setPosition]);

    // Fetch data cuaca setelah position berubah
    useEffect(() => {
        const fetchLocationWeather = async () => {
            if (position.lat && position.lon) {
                const data = await fetchCurrentWeather(position);
                setCurrentWeather(data);
            }
        };
        fetchLocationWeather();
    }, [position]);

    return (
        <div className="text-white">

            {error ? (
                <p>⚠️ {error}</p>
            ) : position.lat ? (
                <div className='flex justify-center items-center gap-2'>
                    <h2 className="text-lg font-bold">location: </h2>
                    <div>
                        <span>{currentWeather.name}</span>
                        <span></span>
                    </div>
                </div>

            ) : (
                <p>Taking location....</p>
            )}
        </div>
    )
}

export default LocationGeo