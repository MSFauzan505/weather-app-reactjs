import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import CityDetailPage from '../pages/CityDetailPage'
import ForecastPage from '../pages/ForecastPage'
import NotFoundPage from '../pages/NotFoundPage'
import SearchPage from '../pages/SearchPage'
import { MainLayoutProvider } from '../layouts/MainLayout'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayoutProvider/>}>
                    <Route index element={<HomePage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/forecast' element={<ForecastPage />} />
                    <Route path='/search' element={<SearchPage />} />

                    {/* 404 callback error */}
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes