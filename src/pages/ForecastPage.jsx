import React, { useEffect } from 'react'
import { Card } from 'primereact/card';
import { CiTempHigh } from "react-icons/ci";
import { SiMattermost } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { FaCloudRain } from "react-icons/fa";
import { useMainLayout } from '../hooks/useMainLayout';
import { BiWind } from "react-icons/bi";
import ForecastChart from '../components/ForecastChart';

const cardStyle = 'text-white bg-black/20 backdrop-blur-2xl rounded-xl p-5'

const forecastData = [
  { time: "00.00", icon: "/icon-cerah.png", temp: "23°C" },
  { time: "03.00", icon: "/icon-cerah.png", temp: "22°C" },
  { time: "06.00", icon: "/icon-cerah.png", temp: "21°C" },
  { time: "09.00", icon: "/icon-cerah.png", temp: "25°C" },
  { time: "12.00", icon: "/icon-cerah.png", temp: "30°C" },
  { time: "15.00", icon: "/icon-cerah.png", temp: "29°C" },
  { time: "18.00", icon: "/icon-cerah.png", temp: "24°C" },
  { time: "21.00", icon: "/icon-cerah.png", temp: "22°C" },
];

const rainForecastData = [
  { time: "06:00", probability: 10 },
  { time: "09:00", probability: 20 },
  { time: "12:00", probability: 50 },
  { time: "15:00", probability: 70 },
  { time: "18:00", probability: 40 },
  { time: "21:00", probability: 30 },
  { time: "00:00", probability: 20 },
  { time: "03:00", probability: 15 }
];



const ForecastPage = () => {

  const { setTitlePage } = useMainLayout()

  useEffect(() => {
    setTitlePage('Weather per day')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">

      <div className='flex flex-col md:flex-row gap-2 w-full'>
        {/* air condition */}
        <div className='flex flex-col gap-2 h-[250px] sm:h-[400px]  sm:min-w-[400px] md:flex-2'>
          <div className='flex gap-2 h-full '>
            <Card className={`${cardStyle}  w-full `}>
              <h1 className='text-sm md:text-lg font-semibold'>Wind Speed</h1>
              <div className='flex items-center justify-center gap-2  w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl '>0.57 m/s</span>
                <CiTempHigh className='text-4xl my-2' />
              </div>
            </Card>

            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Pressure</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl'>1023 hPa</span>
                <SiMattermost className='text-4xl my-2' />
              </div>
            </Card>
          </div>
          <div className='flex gap-2 h-full'>
            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Rain</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl '>68%</span>
                <WiHumidity className='text-4xl my-2' />
              </div>
            </Card>

            <Card className={`${cardStyle}  w-full`}>
              <h1 className='text-sm md:text-lg font-semibold'>Pressure</h1>
              <div className='flex items-center justify-center gap-2 w-full py-1 sm:py-2 md:py-4 '>
                <span className='text-sm sm:text-lg md:text-2xl'>30%</span>
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
            <img
              src="/icon-cerah.png"
              alt="weather icon"
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />

            <div className="text-center">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">Clear</h2>
              <p className="text-sm sm:text-base text-gray-300">Wednesday, 26 Jun</p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center items-center text-sm sm:text-base">
              <div className="flex items-center gap-1">
                <CiTempHigh className="text-xl" />
                <span>24°C</span>
              </div>
              <div className="flex items-center gap-1">
                <WiHumidity className="text-2xl" />
                <span>92%</span>
              </div>
              <div className="flex items-center gap-1">
                <BiWind className="text-xl" />
                <span>6 km/h</span>
              </div>
            </div>
          </div>
        </Card>


      </div>

      <Card className={`${cardStyle} h-[320px] w-full overflow-x-auto  max-w-full`}>
        <h1 className='py-1 sm:text-lg font-semibold'>Temprature per 3 hours</h1>
        <div className='flex justify-between sm:justify-start flex-nowrap sm:flex-wrap items-center gap-2 md:gap-3 px-2'>
          {forecastData.map((item, index) => (
            <div
              key={index}
              className='flex flex-col justify-between items-center py-3 px-2 backdrop-blur-2xl rounded-xl max-w-[80px] md:min-w-[150px] h-[250px]'
            >
              <span>{item.time}</span>
              <img src={item.icon} className='w-[50px]' alt='icon cuaca' />
              <span>{item.temp}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className={` ${cardStyle} flex sm:w-full flex-col md:flex-row gap-2 h-[400px]`}>
     
          <ForecastChart data={rainForecastData} unit="%" dataKey="probability" />
  
      </div>

    </div>
  )
}

export default ForecastPage