/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export const MainLayoutContext = createContext()

export const MainLayoutProvider = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false)
    const [titlePage, setTitlePage] = useState('Home')

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev)
    }

    return (
        <MainLayoutContext.Provider value={{ sidebarVisible, toggleSidebar, setTitlePage }}>
            <div className='bg-[url("/background.jpg")] bg-cover bg-center min-h-screen w-full'>
                <div className='relative flex flex-col sm:flex-row bg-white/20 backdrop-blur-xl min-h-screen'>
                    <Sidebar />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className=' sm:m-0 w-full p-4 sm:p-3'>
                        <div className='my-2 sm:my-5 flex items-center justify-between gap-5'>
                            <h1 className='text-white text-2xl md:text-3xl font-bold py-2'>{titlePage}</h1>
                            <div className='flex gap-3'>
                                <a href='https://github.com/MSFauzan505' target='_black' className='text-white hover:text-gray-100 hover:underline'>Github</a>
                                <a href='https://openweathermap.org' target='_black' className='text-white hover:text-gray-100 hover:underline'>Weather API</a>
                            </div>
                        </div>
                        {<Outlet />}
                    </motion.div>
                </div>
            </div>
        </MainLayoutContext.Provider>
    )
}

