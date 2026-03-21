import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { doc, onSnapshot } from 'firebase/firestore'

export const Layout = ({ usuario, firestore }) => {

    const [IsOpen, setIsOpen] = useState({
        sidebar: true,
        settings: false
    })

    const [system, setSystem] = useState({
        sysName: '',
        shortSysName: ''
    })

    const toggleMenu = (menu) => {
        setIsOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    };

    useEffect(() => {
        const docRef = doc(firestore, 'System', 'main')

        const unsubscribe = onSnapshot(docRef, (snap) => {
            if (snap.exists()) {
                setSystem(snap.data())
            }
        })

        return () => unsubscribe()
    }, [firestore])

    return (
        <div className="flex">
            <Sidebar
                IsOpen={IsOpen}
                usuario={usuario}
                toggleMenu={toggleMenu}
                system={system}
            />
            <div className="flex flex-col flex-1">
                <Header
                    IsOpen={IsOpen}
                    usuario={usuario}
                    toggleMenu={toggleMenu}
                    system={system}
                />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
