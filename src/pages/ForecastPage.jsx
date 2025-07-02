import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { CiTempHigh } from "react-icons/ci";
import { SiMattermost } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { FaCloudRain } from "react-icons/fa";
import { useMainLayout } from '../hooks/useMainLayout';
import { BiWind } from "react-icons/bi";
import ForecastChart from '../components/ForecastChart';
import LocationGeo from '../components/LocationGeo';
import { CiFlag1 } from "react-icons/ci";


const cardStyle = 'text-white bg-black/20 backdrop-blur-2xl rounded-xl p-5'



const ForecastPage = () => {
  const [position, setPosition] = useState({ lat: null, lon: null })
  const [currentWeather, setCurrentWeather] = useState([])
  const [forecast, setForecast] = useState([])

  const { setTitlePage } = useMainLayout()

  useEffect(() => {
    setTitlePage('Weather per day')


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // formatted date
  const unix = currentWeather.dt
  const timezoneOffset = currentWeather.timezone

  const localTime = new Date((unix + timezoneOffset) * 1000)

  const formattedDate = localTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // formatted forecast chart
  const formattedDataForecast = forecast?.list?.map((item) => ({
    time: item?.dt_txt.split(" ")[1].slice(0, 5),
    probability: Math.round((item?.pop ?? 0) * 100)
  })) ?? []

  console.log(formattedDataForecast)

  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
      {/* location users */}
      <LocationGeo
        position={position}
        setPosition={setPosition}
        currentWeather={currentWeather}
        setCurrentWeather={setCurrentWeather}
        setForecast={setForecast}
      />

      <div className='flex flex-col md:flex-row gap-2 w-full'>
        {/* air condition */}
        <div className='flex flex-col gap-2 h-[250px] sm:h-[400px]  sm:min-w-[400px] md:flex-2'>
          <div className='flex gap-2 h-full '>
            <Card className={`${cardStyle}  w-full `}>
              <h1 className='text-sm md:text-lg font-semibold'>Wind Speed</h1>
              <div className='flex items-center justify-center gap-2  w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl '>{currentWeather?.wind?.speed ?? '-'} m/s</span>
                <BiWind className='text-4xl my-2' />
              </div>
            </Card>

            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Pressure</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl'>{currentWeather?.main?.pressure ?? '-'} hPa</span>
                <SiMattermost className='text-4xl my-2' />
              </div>
            </Card>
          </div>
          <div className='flex gap-2 h-full'>
            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Humidity</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl '>{currentWeather?.main?.humidity ?? '-'}%</span>
                <WiHumidity className='text-4xl my-2' />
              </div>
            </Card>

            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Clouds</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl'>{currentWeather?.clouds?.all}%</span>
                <FaCloudRain className='text-4xl my-2' />
              </div>
            </Card>
          </div>
        </div>

        {/* current weather */}
        <Card className={`${cardStyle} flex flex-col  h-[400px] md:flex-1 p-4`}>
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
            Current Weather
          </h1>

          <div className="flex flex-col items-center justify-center mt-14 flex-1 gap-4 text-white">
            {currentWeather?.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0].icon}@2x.png`}
                alt="weather icon"
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
              />
            )}

            <div className="text-center">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">{currentWeather?.weather?.[0].description}</h2>
              <p className="text-sm sm:text-base text-gray-300">{formattedDate ?? '-'}</p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center items-center text-sm sm:text-base">
              <div className="flex items-center gap-1">
                <CiTempHigh className="text-xl" />
                <span>{currentWeather?.main?.temp ?? '-'}°C</span>
              </div>
              <div className="flex items-center gap-1">
                <WiHumidity className="text-2xl" />
                <span>{currentWeather?.main?.humidity ?? '-'}%</span>
              </div>
              <div className="flex items-center gap-1">
                <BiWind className="text-xl" />
                <span>{currentWeather?.wind?.speed ?? '-'} m/s</span>
              </div>
              <div className="flex items-center gap-1">
                <CiFlag1 className="text-xl" />
                <span>{currentWeather?.sys?.country ?? '-'}</span>
              </div>
            </div>
          </div>
        </Card>


      </div>

      {/* temprate per 3 hours */}
      <Card className={`${cardStyle} h-[320px] w-full overflow-x-auto  max-w-full`}>
        <h1 className='py-1 sm:text-lg font-semibold'>Temprature per 3 hours</h1>
        <div className='flex justify-between sm:justify-start flex-nowrap sm:flex-wrap items-center gap-2 md:gap-3 px-2'>
          {forecast?.list?.slice(0, Math.ceil(forecast?.list?.length / 2 )).map((item, index) => (
            <div
              key={index}
              className='flex flex-col justify-between items-center py-3 px-2 backdrop-blur-2xl rounded-xl max-w-[80px] md:min-w-[150px] h-[250px]'
            >
              <span>{item?.dt_txt.split(" ")[1].slice(0, 5) ?? '-'}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item?.weather?.[0].icon}@2x.png`}
                alt="weather icon"
                className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
              />
              <span>{item?.main?.temp}°C</span>
            </div>
          ))}
        </div>
      </Card>

      <div className={` ${cardStyle} flex sm:w-full flex-col md:flex-row gap-2 h-[400px]`}>

        <ForecastChart data={formattedDataForecast} unit="%" dataKey="probability" />

      </div>

    </div>
  )
}

export default ForecastPage