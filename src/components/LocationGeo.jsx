import React, { useEffect, useState } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService'

const LocationGeo = ({ position, setPosition,currentWeather, setCurrentWeather, setForecast }) => {
    const [error, setError] = useState(null)

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
        const fetchLocationCurrent = async () => {
            if (position.lat && position.lon) {
                const data = await fetchCurrentWeather(position);
                setCurrentWeather(data);
            }
        };

        const fetchLocationForecast = async ()=>{
            if(position.lat && position.lon){
                const data = await fetchForecast(position)
                setForecast(data)
            }
        }

        fetchLocationForecast()
        fetchLocationCurrent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        
                    </div>
                </div>

            ) : (
                <p>Taking location....</p>
            )}
        </div>
    )
}

export default LocationGeo