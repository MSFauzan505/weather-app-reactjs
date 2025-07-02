import React, { useEffect, useMemo, useState } from 'react'
import { LuWaves } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";
import { BiWind } from "react-icons/bi";
import { WiDaySunny } from "react-icons/wi";
import WeatherMap from '../components/WeatherMap';
import { fetchCityWeather, fetchCurrentWeather, fetchForecast } from '../services/weatherService';
import { CiCloudDrizzle } from "react-icons/ci";
import ForecastChart from '../components/ForecastChart';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import { useMainLayout } from '../hooks/useMainLayout';



const mockWeatherInfo = [
    { icon: <LuWaves />, info: '173' },
    { icon: <IoWaterOutline />, info: '92%' },
    { icon: <BiWind />, info: '6km/h' },
    { icon: <WiDaySunny />, info: '3' }
]

const mockPopularCities = [
    { name: "Jakarta", lat: -6.2000, lon: 106.8167 },
    { name: "Bandung", lat: -6.9147, lon: 107.6098 },
    { name: "Surabaya", lat: -7.2504, lon: 112.7688 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "New York City", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
];



const HomePage = () => {
    const [currentWeather, setCurrentWeather] = useState()
    const [forecastWeather, setForecastWeather] = useState()
    const [popularCities, setPopularCities] = useState([])

    const [visibleMapDialog, setVisibleMapDialog] = useState(false);
    const [visibleCityDialog, setVisibleCityDialog] = useState(false);

    const { setTitlePage } = useMainLayout()

    useEffect(() => {
        setTitlePage('Home')
        // fetch city current weather

        const defaultCurrentWeather = async () => {
            try {
                const data = await fetchCurrentWeather({ lat: -6.2000, lon: 106.8167 })
                setCurrentWeather(data)
            } catch (err) {
                console.log(err.message)
            }

        }
        const defaultForecastWeather = async () => {
            try {
                const data = await fetchForecast({ lat: -6.2000, lon: 106.8167 })
                setForecastWeather(data)
            } catch (err) {
                console.log(err.message)
            }

        }

        const fetchAllPopularCities = async () => {
            try {

                const results = await Promise.all(
                    mockPopularCities.map(async (city) => {
                        const data = await fetchCityWeather(city.name)
                        return {
                            ...city,
                            weather: {
                                desc: data.weather[0].main
                            }
                        }

                    })
                )
                setPopularCities(results)
            } catch (err) {
                console.log('erro fatching popular city', err)
            }
        }
        fetchAllPopularCities()
        defaultCurrentWeather()
        defaultForecastWeather()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    // handle location selected get coordinate
    const handleLocationSelected = async ({ lat, lon }) => {
        const currentData = await fetchCurrentWeather({ lat, lon })
        const forecastData = await fetchForecast({ lat, lon })
        setCurrentWeather(currentData)
        setForecastWeather(forecastData)
    }




    // Chart format
    const chartData = useMemo(() => {
        if (!forecastWeather?.list) return [];
        return forecastWeather.list.map(item => ({
            time: item.dt_txt.split(" ")[1].slice(0, 5),
            temp: item.main.temp
        }));
    }, [forecastWeather]);


    // format timezone
    let formattedTime = '-';

    if (currentWeather && currentWeather.dt && currentWeather.timezone) {
        const unix = currentWeather.dt;
        const timezoneOffset = currentWeather.timezone;

        const utcTime = new Date((unix + timezoneOffset) * 1000);
        formattedTime = utcTime.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    // weather condition detail
    const weatherInfo = currentWeather ? [
        { icon: <LuWaves />, info: `${currentWeather.visibility} m`, label: 'Visibility' },
        { icon: <IoWaterOutline />, info: `${currentWeather.main.humidity}%`, label: 'Humidity' },
        { icon: <BiWind />, info: `${currentWeather.wind.speed} km/h`, label: 'Wind Speed' },
        { icon: <WiDaySunny />, info: `${currentWeather.clouds.all}%`, label: 'Clouds' },
    ] : mockWeatherInfo



    return (
        <div className='flex flex-col gap-5'>


            <div className='flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-2 sm:gap-5'>
                {/* current weather */}
                <div className='flex flex-col w-full lg:min-w-[400px] lg:flex-1 justify-between min-h-[400px]  
                bg-black/20 backdrop-blur-2xl rounded-xl text-white p-5'>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold sm:text-lg md:text-xl'>Current Weather</h1>
                        <span className='text-sm sm:text-lg text-gray-300'>
                            {formattedTime}
                        </span>
                    </div>
                    <div className='flex items-center justify-center gap-4 my-8  '>
                        {currentWeather?.weather?.[0]?.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0].icon}@2x.png`}
                                alt="weather icon"
                                className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
                            />
                        )}
                        <div className=' flex flex-col items-center'>
                            <span className='text-5xl sm:text-7xl font-bold'>{currentWeather ? Math.round(currentWeather.main.temp) : "-"}°C</span>
                            <span>{currentWeather ? currentWeather.weather[0].description : '-'}</span>
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
                    onHide={() => { if (!visibleMapDialog) return; setVisibleMapDialog(false); }}
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
                    onHide={() => { if (!visibleCityDialog) return; setVisibleCityDialog(false); }}
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
                                    <p className='text-sm flex items-center justify-center'>{city.weather.desc}</p>

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
                                <p className='text-sm flex items-center justify-center'>{city.weather.desc}</p>
                            </span>
                        ))}

                    </div>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-5'>
                {/* forecash */}
                <div className='flex flex-col w-full lg:min-w-[400px] lg:flex-1 text-white h-[400px] bg-black/20 backdrop-blur-2xl rounded-xl p-5'>
                    <div className='flex justify-between mb-5'>
                        <h1 className='font-semibold sm:text-lg md:text-xl'>Forecast weeks</h1>
                        <a className='text-sm'>Today {forecastWeather?.list[0].dt_txt.split(" ")[0] ?? '-'}</a>
                    </div>

                    <div className='flex flex-col gap-4 mt-2 scrollbar-hide  overflow-y-scroll'>
                        {forecastWeather?.list && forecastWeather.list.length > 0 ?
                            (forecastWeather.list.map((item, i) => (
                                <span key={i} className='flex justify-between px-3'>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt='icon'
                                            className='w-10 h-10'
                                        />
                                        <p className='text-sm'>{item.main.temp}°C</p>
                                    </div>
                                    <div className='flex flex-col text-sm'>
                                        <p className=' flex items-center justify-end'>{item.dt_txt.split(" ")[1].slice(0, 5)} </p>
                                        <p className=' flex items-center justify-center'>{item.dt_txt.split(" ")[0]} </p>
                                    </div>

                                </span>
                            ))) : (
                                <p className='text-center text-white'>Loading forecast...</p>
                            )}

                    </div>
                </div>

                {/* chart */}
                <div className=' h-[400px] sm:w-full bg-black/20 backdrop-blur-2xl rounded-xl p-2'>
                    <ForecastChart data={chartData} unit={'°C'} dataKey={'temp'} />
                </div>
            </div>
        </div>
    )
}

export default HomePage