import React, { useState } from 'react'
import { Sidebar } from './Sidebar'

export const Header = () => {
    const [Isopen, setIsopen] = useState({
        sidebar: false,
        settings: false
    })

    const toggleMenu = (menu) => {
        setIsOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    };

    return (
        <header className='w-full h-16 bg-gray-600 text-white flex items-center '>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id='menuIcon'
                    width="50"
                    height="50"
                    version="1.1"
                    fill="none"
                    viewBox="0 0 24 24"
                    className='cursor-pointer transition-all duration-300 hover:scale-110 ml-2'
                >
                    <path stroke="#fff" d="M6 12h12M6 15.5h12m-12-7h12" />
                </svg>
            </div>
            <div>
                <span className='text-2xl ml-4'>Sistema de Inventario</span>
            </div>
            <div className='ml-auto mr-4 flex items-center gap-2 group cursor-pointer'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 32 32"
                    fill="none">
                    <path
                        d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083m0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5"
                        stroke="#fff"
                        strokeWidth="2"
                    />
                </svg>
                <span className='text-lg'>
                    Usuario
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="#fff"
                    viewBox="0 0 32 32"
                    className='transition-all duration-300 group-hover:scale-120'
                    >
                    <path id="SVGRepo_iconCarrier" d="m16.003 18.626 7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
                </svg>
            </div>
        </header>
    )
}
