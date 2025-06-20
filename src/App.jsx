import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { MainLayoutProvider } from './layouts/MainLayout'
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <PrimeReactProvider >
      <MainLayoutProvider>
        <HomePage/>
      </MainLayoutProvider>
    </PrimeReactProvider>
  )
}

export default App