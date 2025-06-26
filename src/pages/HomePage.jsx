import React, { useState } from 'react'
import { LuWaves } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";
import { BiWind } from "react-icons/bi";
import { WiDaySunny } from "react-icons/wi";
import WeatherMap from '../components/WeatherMap';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService';
import { CiCloudDrizzle } from "react-icons/ci";
import ForecastChart from '../components/ForecastChart';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'



const weatherInfo = [
    { icon: <LuWaves />, info: '173' },
    { icon: <IoWaterOutline />, info: '92%' },
    { icon: <BiWind />, info: '6km/h' },
    { icon: <WiDaySunny />, info: '3' }
]

const popularCities = [
    { name: "Jakarta", lat: -6.2000, lon: 106.8167 },
    { name: "Bandung", lat: -6.9147, lon: 107.6098 },
    { name: "Surabaya", lat: -7.2504, lon: 112.7688 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "New York City", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
];

const mockForecast = [
    { dt_txt: "2025-06-26 06:00:00", main: { temp: 24.0 } },
    { dt_txt: "2025-06-26 09:00:00", main: { temp: 25.1 } },
    { dt_txt: "2025-06-26 12:00:00", main: { temp: 24.3 } },
    { dt_txt: "2025-06-26 15:00:00", main: { temp: 25.0 } },
    { dt_txt: "2025-06-26 18:00:00", main: { temp: 24.5 } },
    { dt_txt: "2025-06-26 21:00:00", main: { temp: 25.2 } },
    { dt_txt: "2025-06-27 00:00:00", main: { temp: 24.6 } },
    { dt_txt: "2025-06-27 03:00:00", main: { temp: 25.3 } }
];


const HomePage = () => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecastWeather] = useState(null)

    const [visibleMapDialog, setVisibleMapDialog] = useState(false);
    const [visibleCityDialog, setVisibleCityDialog] = useState(false);



    // handle location selected get coordinate
    const handleLocationSelected = async ({ lat, lon }) => {
        const currentData = await fetchCurrentWeather(lat, lon)
        const forecastData = await fetchForecast(lat, lon)
        setCurrentWeather(currentData)
        setForecastWeather(forecastData)
    }
    console.log('ini data forecastWeather', forecastWeather)
    console.log('ini data currnet', currentWeather)

    // Chart format
    const chartData = mockForecast.map(item => ({
        time: item.dt_txt.split(" ")[1].slice(0, 5),
        temp: item.main.temp
    }))

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full flex justify-end gap-5'>
                <a href='https://github.com/MSFauzan505' target='_black'  className='text-white hover:text-gray-100 hover:underline'>Github</a>
                <a href='https://openweathermap.org' target='_black' className='text-white hover:text-gray-100 hover:underline'>Weather API</a>
            </div>

            <div className='flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-2 sm:gap-5'>
                {/* current weather */}
                <div className='flex flex-col w-full lg:min-w-[400px] lg:flex-1 justify-between min-h-[400px]  
                bg-black/20 backdrop-blur-2xl rounded-xl text-white p-5'>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold sm:text-lg md:text-xl'>Current Weather</h1>
                        <span className='text-sm sm:text-lg text-gray-300'>6.25pm</span>
                    </div>
                    <div className='flex items-center justify-center gap-4 my-8  '>
                        <img src='/icon-cerah.png' className='h-28 w-28 sm:h-36 sm:w-36 sm:max-h-40 sm:max-w-40 bg-contain ' />
                        <div className=' flex flex-col items-center'>
                            <span className='text-5xl sm:text-7xl font-bold'>24°C</span>
                            <span className=''>Heavy Rain</span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-5 '>
                        {weatherInfo.map((weather, i) => (
                            <div key={i} className='flex flex-col justify-center items-center gap-1'>
                                <div className='text-3xl'>{weather.icon}</div>
                                <span>{weather.info}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* mobile dialog button */}
                <div className='flex sm:hidden justify-between text-white items-center gap-3 '>
                    {/* button popup weather map */}
                    <Button
                        label='Weather Map'
                        onClick={() => setVisibleMapDialog(true)}
                        className='flex justify-center hover:bg-black/30 bg-black/20 backdrop-blur-2xl rounded-xl p-3 flex-1 '
                    >

                    </Button>

                    {/* button popup popular city */}
                    <Button
                        label='Popular City'
                        onClick={() => setVisibleCityDialog(true)}
                        className='flex justify-center hover:bg-black/30 bg-black/20 backdrop-blur-2xl rounded-xl p-3 flex-1'
                    >

                    </Button>
                </div>
                {/* dialog weather Map mobile*/}
                <Dialog
                    modal
                    visible={visibleMapDialog}
                    style={{ width: '80vw' }}
                    onHide={() => {if (!visibleMapDialog) return; setVisibleMapDialog(false); }}
                >
                    <div className='w-full h-[400px]'>
                        <WeatherMap onLocationSelected={handleLocationSelected} />
                    </div>
                </Dialog>
                {/* dialog popular city mobile */}
                <Dialog
                    modal
                    visible={visibleCityDialog}
                     style={{ width: '80vw' }}
                    onHide={() => {if (!visibleCityDialog) return; setVisibleCityDialog(false); }}
                >
                    <div className='flex flex-col w-full text-white h-[400px] bg-black/50 backdrop-blur-2xl p-5'>
                        <div className='flex justify-between mb-5'>
                            <h1 className='font-semibold sm:text-lg md:text-xl'>Popular City</h1>
                            <a href='' className='underline'>View more</a>
                        </div>

                        <div className='flex flex-col gap-4 mt-2 scrollbar-hide overflow-y-scroll'>
                            {popularCities.map((city, i) => (
                                <span key={i} className='flex justify-between px-3'>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <CiCloudDrizzle className='text-4xl sm:text-5xl' />
                                        <p className='text-sm'>{city.name}</p>
                                    </div>
                                    <p className='text-sm flex items-center justify-center'>Cloudy</p>
                                </span>
                            ))}
                        </div>
                    </div>
                </Dialog>




                {/* weather map */}
                <div className='hidden sm:flex w-full lg:max-w-[400px] lg:flex-1 z-0 h-[400px]'>
                    <WeatherMap onLocationSelected={handleLocationSelected} />
                </div>

                {/* popular city */}
                <div className='hidden sm:flex  flex-col w-full lg:max-w-[400px] lg:flex-1 text-white h-[400px] bg-black/20 backdrop-blur-2xl rounded-xl p-5'>
                    <div className='flex justify-between mb-5'>
                        <h1 className='font-semibold sm:text-lg md:text-xl'>Popular City</h1>
                        <a href='' className='underline'>View more</a>
                    </div>

                    <div className='flex flex-col gap-4 mt-2 scrollbar-hide  overflow-y-scroll'>

                        {popularCities.map((city, i) => (
                            <span key={i} className='flex justify-between px-3'>
                                <div className='flex gap-2 justify-center items-center'>
                                    <CiCloudDrizzle className='text-4xl sm:text-5xl' />
                                    <p className='text-sm'>{city.name}</p>
                                </div>
                                <p className='text-sm flex items-center justify-center'>Cloudy</p>
                            </span>
                        ))}

                    </div>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-5'>
                {/* forecash */}
                <div className='flex flex-col w-full lg:min-w-[400px] lg:flex-1 text-white h-[400px] bg-black/20 backdrop-blur-2xl rounded-xl p-5'>
                    <div className='flex justify-between mb-5'>
                        <h1 className='font-semibold sm:text-lg md:text-xl'>Forecast Today</h1>
                        <a>2025-06-27</a>
                    </div>

                    <div className='flex flex-col gap-4 mt-2 scrollbar-hide  overflow-y-scroll'>
                        {mockForecast.map((item, i) => (
                            <span key={i} className='flex justify-between px-3'>
                                <div className='flex gap-2 justify-center items-center'>
                                    <CiCloudDrizzle className='text-4xl sm:text-5xl' />
                                    <p className='text-sm'>{item.main.temp}°C</p>
                                </div>
                                <p className='text-sm flex items-center justify-center'>{item.dt_txt.split(" ")[1].slice(0, 5)} WIB</p>
                            </span>
                        ))}

                    </div>
                </div>

                {/* chart */}
                <div className=' h-[400px] sm:w-full bg-black/20 backdrop-blur-2xl rounded-xl p-2'>
                    <ForecastChart data={chartData} />
                </div>
            </div>
        </div>
    )
}

export default HomePage