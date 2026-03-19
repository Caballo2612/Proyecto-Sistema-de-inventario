import React from 'react'
import Input from '../../components/molecules/Input'
// import { getAuth, updatePassword, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
// import { doc, updateDoc } from "firebase/firestore"

const PersonalConfig = ({ usuario }) => {

    return (
        <main>
                <div className='flex gap-20 border-b border-b-gray-400 pb-5'>
                    <div className='text-gray-500 w-50'>
                        Actualizar Datos Personales
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            label="Nuevo Nombre De Usuario"
                            info="El nombre que elijas reemplazará tu antiguo nombre de usuario"
                            placeholder={`Actual: ${usuario?.nombre}`}
                        />
                    </div>
                </div>

                <div className='flex gap-20 border-b border-b-gray-400 pb-5 pt-3'>
                    <div className='text-gray-500 w-50'>
                        Actualizar Contraseña
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input
                            type="password"
                            name="actualPassword"
                            id="actualPassword"
                            label="Contraseña Actual"
                            placeholder="Contraseña actual"
                        />
                        <Input
                            type="password"
                            name="newPassword"
                            showRules
                            id="newPassword"
                            label="Nueva Contraseña"
                            placeholder="Nueva Contraseña"
                        />
                        <Input
                            type="password"
                            info="Ambas contraseñas deben coincidir"
                            name="confirmPassword"
                            id="confirmPassword"
                            label="Confirmar Contraseña"
                            placeholder="Confirmación"
                        />
                    </div>
                </div>

                <div className='flex gap-20 border-b border-b-gray-400 pb-5 pt-3'>
                    <div className='text-gray-500 w-50'>
                        Actualizar Email
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            label="Nuevo Correo"
                            placeholder={usuario?.email}
                        />
                    </div>
                </div>

            <div className='bg-white py-3 flex justify-center rounded-lg gap-3 text-gray-500'>
                <button className='rounded-lg px-3 py-2 bg-lime-300 cursor-pointer shadow-xl'>Guardar</button>
                <button className='cursor-pointer px-3 py-2'>Cancelar</button>
            </div>
        </main>
    )
}

export default PersonalConfig