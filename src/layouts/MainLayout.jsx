import React, { createContext, useContext, useState } from 'react'

const MainLayoutContext = createContext()

export const MainLayoutProvider = ({children})=>{
    const [sidebarVisible, setSidebarVisible] = useState(false)

    const toggleSidebar = ()=>{
        setSidebarVisible((prev)=> !prev)
    }

    return (
        <MainLayoutContext.Provider value={{sidebarVisible, toggleSidebar}}>
            {children}
        </MainLayoutContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMainLayout = () => useContext(MainLayoutContext)