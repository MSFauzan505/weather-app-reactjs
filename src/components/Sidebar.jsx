import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: 'pi pi-home' },
  { to: '/search', icon: 'pi pi-search' },
  { to: '/city/jakarta', icon: 'pi pi-building' },
  { to: '/forecast', icon: 'pi pi-chart-scatter' },
]

const Sidebar = () => {
  return (
    <div className='absolute z-50 md:z-0 md:sticky  flex flex-col items-center justify-between py-3 text-white gap-8 h-screen w-[100px] bg-black/20 backdrop-blur-xl'>
      <div className='flex flex-col  gap-8 items-center'>
        <i className='pi pi-cloud py-5 text-5xl'></i>

        {navItems.map((item, index) => (
          <NavLink key={index} to={item.to}>
            <i className={`${item.icon} transition-all hover:bg-black/10 hover:backdrop-blur-xl cursor-pointer rounded-xl p-2 ${item.icon.includes('home') ? 'text-3xl' : 'text-2xl'}`}></i>
          </NavLink>
        ))}
      </div>

      <i className='pi pi-sign-out transition-all hover:bg-black/10 hover:backdrop-blur-xl cursor-pointer rounded-xl p-2 text-2xl'></i>
    </div>
  )
}

export default Sidebar
