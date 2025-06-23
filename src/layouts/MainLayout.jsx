import React, { createContext, useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayoutContext = createContext()

export const MainLayoutProvider = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false)

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev)
    }

    return (
        <MainLayoutContext.Provider value={{ sidebarVisible, toggleSidebar }}>
            <div className='bg-[url("./assets/background.jpg")]  bg-cover bg-center min-h-screen'>
                <div className='relative flex flex-col md:flex-row bg-white/20 backdrop-blur-xl min-h-screen'>
                    <Sidebar />
                    <div className='bg-white w-full p-2 m-5'>
                        {<Outlet/>}
                    </div>
                </div>
            </div>
        </MainLayoutContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMainLayout = () => useContext(MainLayoutContext)