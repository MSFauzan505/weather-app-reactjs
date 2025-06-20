import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import MySidebar from './components/Sidebar'
import { MainLayoutProvider } from './layouts/MainLayout'


const App = () => {
  return (
    <PrimeReactProvider >
      <MainLayoutProvider>
        <MySidebar />
      </MainLayoutProvider>
    </PrimeReactProvider>
  )
}

export default App