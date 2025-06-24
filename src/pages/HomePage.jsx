import React from 'react'

const HomePage = () => {
    return (
        <div className='flex flex-col gap-3'>
            {/* current weather */}
            <div className='flex flex-col min-h-[400px] bg-black/20 rounded-xl text-white p-3'>
                <h1 className='font-semibold sm:text-lg md:text-xl'>Current Weather</h1>
                <span className='text-sm sm:text-lg text-gray-300'>6.25pm</span>
                <div className='flex items-center justify-center gap-4 px-5 mt-5 '>
                    <img src='/src/assets/icon-cerah.png' className='h-36 w-36 sm:max-h-40 sm:max-w-40 bg-contain '/>
                    <div className=' flex flex-col items-center'>
                        <span className='text-7xl font-bold'>24°</span>
                        <span className=''>Heavy Rain</span>
                    </div>
                </div>
            </div>

           
        </div>
    )
}

export default HomePage