import React from 'react'
import { Card } from 'primereact/card';
import { CiTempHigh } from "react-icons/ci";
import { SiMattermost } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { FaCloudRain } from "react-icons/fa";

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


const ForecastPage = () => {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">

      <div className='flex flex-col md:flex-row gap-2 w-full'>
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

        <Card className={`${cardStyle} flex h-[400px] md:flex-1`}>
          dfsafasf
        </Card>
      </div>

      <Card className={`${cardStyle} h-[300px] w-full overflow-x-auto  max-w-full`}>
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

      <div className='flex flex-col md:flex-row gap-2 h-[400px]'>
        <Card className={`${cardStyle} flex-2`}>

        </Card>
        <Card className={`${cardStyle} flex-1`}>

        </Card>
      </div>

    </div>
  )
}

export default ForecastPage