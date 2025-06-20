import React from 'react'
import {PrimeReactProvider} from 'primereact/api'
import MySidebar from './components/Sidebar'


const App = () => {
  return (
    <PrimeReactProvider >
      <MySidebar/>
    </PrimeReactProvider>
  )
}

export default App