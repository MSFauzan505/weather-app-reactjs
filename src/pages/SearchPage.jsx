import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


const SearchPage = () => {
  const [value, setValue] = useState('')
  return (
    <div className='flex flex-col md:justify-baseline md:h-[700px] gap-2 sm:gap-4 md:gap-8'>
      {/* input search */}
      <div className='flex gap-2 w-full md:w-[500px] m-auto'>
        <InputText id='search' type='text'
          className="sm:p-inputtext-lg  bg-black/20 text-white 
          py-2 px-4 w-full mt-3 rounded-xl backdrop-blur-2xl"
          value={value}
          placeholder='Search city'
          onChange={(e) => setValue(e.target.value)} />
        <Button
          className='flex items-center justify-center text-white hover:bg-black/30 active:bg-white/20
           bg-black/20 py-2 px-4 mt-3 rounded-xl backdrop-blur-2xl '
        >
          Search
        </Button>
      </div>

      {/* show data input */}
      <div className='flex flex-col justify-between gap-2 w-full md:mt-10 sm:max-w-[600px] m-auto h-[400px] md:h-[500px]
       bg-black/20 text-white backdrop-blur-2xl rounded-xl p-5'>
        <h1 className='text-lg sm:text-xl md:text-2xl font-semibold'>Jakarta</h1>
        <div className='flex flex-col gap-2 justify-center items-center  py-4'>
          <img src='/icon-cerah.png' className='max-h-40 max-w-40 bg-contain '/>
          <h1 className='text-xl md:text-2xl'>Cloudy</h1>
        </div>
        
        <div className='flex  justify-between bg-black'>
          <span className='text-sm py-4 px-6 bg-blue-500'>Temp: 24°C</span>
          <span className='text-sm py-4 px-6 bg-blue-500'>Humidity: 78</span>
        </div>
      </div>
    </div>
  )
}

export default SearchPage