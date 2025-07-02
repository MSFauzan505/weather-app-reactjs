import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useMainLayout } from '../hooks/useMainLayout';
import { fetchCityWeather } from '../services/weatherService';
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity, WiSandstorm } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { SiMattermost } from "react-icons/si";
import { FaPeopleRobbery } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";


const SearchPage = () => {
  const inputRef = useRef('jakarta')
  const [cityDetail, setCityDetail] = useState([])

  const { setTitlePage } = useMainLayout()

  // handle search input
  const handleSearchCity = async () => {
    const data = await fetchCityWeather(inputRef.current.value)
    inputRef.current.value = ''
    setCityDetail(data)
  }

  useEffect(() => {
    setTitlePage('Search City')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='flex flex-col md:justify-baseline md:h-[700px] gap-2 sm:gap-4 md:gap-8'>
      {/* input search */}
      <div className='flex gap-2 w-full md:w-[500px] m-auto'>
        <InputText id='search' type='text'
          className="sm:p-inputtext-lg  bg-black/20 text-white 
          py-2 px-4 w-full mt-3 rounded-xl backdrop-blur-2xl"
          ref={inputRef}
          placeholder='Search city'
        />
        <Button
          onClick={handleSearchCity}
          className='flex items-center justify-center text-white hover:bg-black/30 active:bg-white/20
           bg-black/20 py-2 px-4 mt-3 rounded-xl backdrop-blur-2xl '
        >
          Search
        </Button>
      </div>

      {/* show data input */}
      <div className='flex flex-col justify-between gap-2 w-full md:mt-10 sm:max-w-[600px] m-auto  sm:h-[450px] md:h-[500px]
  bg-black/20 text-white backdrop-blur-2xl rounded-xl p-5'>
        <h1 className='text-lg sm:text-xl md:text-2xl font-semibold'>{cityDetail.name || 'no data'}</h1>
        <div className='flex flex-col gap-2 justify-center items-center  py-4'>
          {cityDetail?.weather?.[0].icon && (
            <img
              src={`https://openweathermap.org/img/wn/${cityDetail.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
            />
          )}
          <h1 className='text-2xl md:text-4xl font-bold'>{cityDetail?.weather?.[0].description || '-'}</h1>
        </div>

        {/* tambahan info cuaca */}
        <div className='flex justify-center items-center flex-wrap gap-3 text-sm py-4  '>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><CiTempHigh className='text-xl'/>Temp: {cityDetail?.main?.temp ?? '-'}°C</span>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><WiHumidity className='text-xl'/>Humidity: {cityDetail?.main?.humidity ?? '-'}%</span>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><WiSandstorm  className='text-xl'/>Wind Speed: {cityDetail?.wind?.speed ?? '-'} m/s</span>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><SiMattermost  className='text-xl'/>Pressure: {cityDetail?.main?.pressure ?? '-'} hPa</span>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><FaPeopleRobbery  className='text-xl'/>Feels Like: {cityDetail?.main?.feels_like ?? '-'}°C</span>
          <span className='flex text-sm justify-center items-center gap-1 bg-black/20 py-1 px-2 rounded-2xl'><FaFlag  className='text-xl'/>Country: {cityDetail?.sys?.country ?? '-'}</span>
        </div>
      </div>

    </div>
  )
}

export default SearchPage