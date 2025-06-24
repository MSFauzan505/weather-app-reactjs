import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMainLayout } from '../layouts/MainLayout'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react'

const navItems = [
  { to: '/', icon: 'pi pi-home' },
  { to: '/search', icon: 'pi pi-search' },
  { to: '/city/jakarta', icon: 'pi pi-building' },
  { to: '/forecast', icon: 'pi pi-chart-scatter' },
]

const SidebarContent = ({ onLinkClick }) => {
  return (
    <div className='absolute flex z-50 flex-col items-center justify-between py-3 text-white gap-4 sm:gap-6 md:gap-8 h-screen w-[80px] sm:w-[100px]
     bg-black/40 backdrop-blur-xl'>
      <div className='flex flex-col gap-6 md:gap-8 items-center'>
        <i className='pi pi-cloud py-5 text-4xl sm:text-5xl'></i>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            onClick={() => onLinkClick && onLinkClick()}
            className={({isActive}) => isActive ? 'bg-black/20 backdrop-blur-lg rounded-lg transition-all' : ''}
          >
            <i
              className={`${item.icon} transition-all hover:bg-black/10 hover:backdrop-blur-xl cursor-pointer rounded-xl p-2 text-xl sm:text-3xl`}
            ></i>
          </NavLink>
        ))}
      </div>
      <i className='pi pi-sign-out transition-all hover:bg-black/10 hover:backdrop-blur-xl cursor-pointer rounded-xl p-2 text-xl sm:text-2xl'></i>
    </div>
  )
}

const Sidebar = () => {
  const { sidebarVisible, toggleSidebar } = useMainLayout()

  return (
    <>

      <div className='hidden sm:flex  top-0 left-0 z-50 sm:z-0 '>
        <SidebarContent />
      </div>

      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className='flex sm:hidden sticky  top-0 left-0 z-50'>
            <SidebarContent onLinkClick={toggleSidebar} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <div className={`flex z-50 top-0 sticky  sm:hidden ${sidebarVisible ? 'justify-end' : 'justify-between'} items-center p-3`}>
          <h1 className={`font-bold text-lg text-white p-1 ${sidebarVisible ? 'hidden' : ''}`}>Weather App</h1>
          <motion.i
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className={`pi pi-align-right text-3xl text-white p-1 rounded-lg ${sidebarVisible ? 'bg-black/10' : ''}`}
            onClick={toggleSidebar}
          ></motion.i>
        </div>
      </AnimatePresence>
    </>
  )
}

export default Sidebar
