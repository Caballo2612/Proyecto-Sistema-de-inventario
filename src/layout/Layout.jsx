import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { themes } from '../utils/themes'

export const Layout = ({ usuario, firestore }) => {

    const [IsOpen, setIsOpen] = useState({
        sidebar: true,
        header: true
    })

    const [system, setSystem] = useState({
        sysName: '',
        shortSysName: ''
    })

    const [preferences, setPreferences] = useState({
        theme: themes[0],
        font: "Poppins, sans-serif",
        textSize: '16px',
        spacing: 'Normal',
        customColor: '#ffffff',
        letterSpacing: 'Normal'
    });

    const updatePreference = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

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
                const saved = snap.data().preferences;

                if (saved) {
                    const foundTheme = themes.find(t => t.name === saved.themeName);
                    setPreferences({
                        theme: foundTheme || themes[0],
                        font: saved.font || "Poppins, sans-serif",
                        textSize: saved.textSize || '16px',
                        spacing: saved.spacing || 'Normal',
                        customColor: saved.customColor || '#ffffff',
                        letterSpacing: saved.letterSpacing || 'Normal'
                    });
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

    const savePreferences = async () => {
        const docRef = doc(firestore, `Usuarios/${usuario.uid}`);

        await updateDoc(docRef, {
            preferences: {
                themeName: preferences.theme.name,
                font: preferences.font,
                textSize: preferences.textSize,
                spacing: preferences.spacing,
                customColor: preferences.customColor,
                letterSpacing: preferences.letterSpacing
            }
        });
    };

    return (
        <main 
            className="flex"
            style={{
                fontFamily: preferences.font, 
                letterSpacing: preferences.letterSpacing, 
                fontSize: preferences.textSize,
                lineHeight: preferences.spacing
            }}
        >
            <Sidebar
                IsOpen={IsOpen}
                usuario={usuario}
                preferences={preferences}
                toggleMenu={toggleMenu}
                system={system}
            />
            <div className="flex flex-col flex-1">
                <Header
                    IsOpen={IsOpen}
                    usuario={usuario}
                    preferences={preferences}
                    toggleMenu={toggleMenu}
                    system={system}
                />
                <div >
                    <Outlet context={{ preferences, updatePreference, savePreferences, toggleMenu }} />
                </div>
            </div>
        </main>
    )
}
