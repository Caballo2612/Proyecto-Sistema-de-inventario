import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { themes } from '../utils/themes'

export const Layout = ({ usuario, firestore }) => {

    const [IsOpen, setIsOpen] = useState({
        sidebar: true,
        settings: false
    })

    const [system, setSystem] = useState({
        sysName: '',
        shortSysName: ''
    })

    const [selectedTheme, setSelectedTheme] = useState(themes[0]);

    const toggleMenu = (menu) => {
        setIsOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    };

    useEffect(() => {
        const loadTheme = async () => {
            const docRef = doc(firestore, `Usuarios/${usuario.uid}`);
            const snap = await getDoc(docRef);

            if (snap.exists()) {
                const themeName = snap.data().theme;

                if (themeName) {
                    const foundTheme = themes.find(t => t.name === themeName);
                    if (foundTheme) setSelectedTheme(foundTheme);
                }
            }
        };

        loadTheme();
    }, [usuario.uid, firestore]);

    useEffect(() => {
        const docRef = doc(firestore, 'System', 'main')

        const unsubscribe = onSnapshot(docRef, (snap) => {
            if (snap.exists()) {
                setSystem(snap.data())
            }
        })

        return () => unsubscribe()
    }, [firestore]);

    const saveTheme = async (themeName) => {
        const docRef = doc(firestore, `Usuarios/${usuario.uid}`);

        await updateDoc(docRef, {
            theme: themeName
        });
    };

    return (
        <div className="flex">
            <Sidebar
                IsOpen={IsOpen}
                usuario={usuario}
                selectedTheme={selectedTheme}
                toggleMenu={toggleMenu}
                system={system}
            />
            <div className="flex flex-col flex-1">
                <Header
                    IsOpen={IsOpen}
                    usuario={usuario}
                    selectedTheme={selectedTheme}
                    toggleMenu={toggleMenu}
                    system={system}
                />
                <main>
                    <Outlet context={{ selectedTheme, setSelectedTheme, saveTheme }} />
                </main>
            </div>
        </div>
    )
}
