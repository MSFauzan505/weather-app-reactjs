import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';


const SearchPage = () => {
  const [value, setValue] = useState('')
  return (
    <div className='flex flex-col'>
        <InputText id='search' type='text'
          className="sm:p-inputtext-lg m-auto bg-black/20 text-white 
          py-2 px-4 w-full sm:w-[500px] mt-3 rounded-xl backdrop-blur-2xl"
          value={value}
          placeholder='Search city'
          onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default SearchPage