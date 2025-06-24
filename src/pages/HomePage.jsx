import React from 'react'
import { LuWaves } from "react-icons/lu";
import { IoWaterOutline } from "react-icons/io5";
import { BiWind } from "react-icons/bi";
import { WiDaySunny } from "react-icons/wi";

const weatherInfo = [
    { icon: <LuWaves />, info: '173' },
    { icon: <IoWaterOutline />, info: '92%' },
    { icon: <BiWind />, info: '6km/h' },
    { icon: <WiDaySunny />, info: '3' }
]

const HomePage = () => {
    return (
        <div className='flex flex-col gap-5'>
            {/* current weather */}
            <div className='flex flex-col justify-between min-h-[400px] max-w-[400px] bg-black/20 rounded-xl text-white p-5'>
                <div className='flex flex-col'>
                    <h1 className='font-semibold sm:text-lg md:text-xl'>Current Weather</h1>
                    <span className='text-sm sm:text-lg text-gray-300'>6.25pm</span>
                </div>
                <div className='flex items-center justify-center gap-4 my-8  '>
                    <img src='/src/assets/icon-cerah.png' className='h-36 w-36 sm:max-h-40 sm:max-w-40 bg-contain ' />
                    <div className=' flex flex-col items-center'>
                        <span className='text-7xl font-bold'>24°</span>
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


        </div>
    )
}

export default HomePage