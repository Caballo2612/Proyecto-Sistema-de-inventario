import React, { useState } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Layout = () => {

    const [IsOpen, setIsOpen] = useState({
        sidebar: true,
        settings: false
    })

    const toggleMenu = (menu) => {
        setIsOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    };

    return (
        <div className="flex">
            <Sidebar
                IsOpen={IsOpen}
                toggleMenu={toggleMenu}
            />
            <div className="flex flex-col flex-1">
                <Header
                    IsOpen={IsOpen}
                    toggleMenu={toggleMenu}
                />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
