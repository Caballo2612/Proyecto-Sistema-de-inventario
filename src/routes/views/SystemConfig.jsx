import React, { useEffect, useState } from 'react'
import Input from '../../components/molecules/Input'
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const SystemConfig = ({ firestore }) => {

    const [system, setSystem] = useState({
        sysName: '',
        shortSysName: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sysName = document.getElementById('sysName').value;
        const shortSysName = document.getElementById('shortSysName').value;

        if (!sysName && !shortSysName) {
            return Swal.fire({
                icon: 'info',
                title: 'Nada que guardar',
                text: 'No hiciste ningun cambio',
                toast: true,
                position: 'bottom-end',
                timerProgressBar: true,
                timer: 1500,
                showConfirmButton: false,
            });
        }

        try {

            const docuRef = doc(firestore, 'System', 'main');

            const data = { updatedAt: new Date() };
            if (sysName) data.sysName = sysName;
            if (shortSysName) data.shortSysName = shortSysName;

            await setDoc(docuRef, data, { merge: true });

            await Swal.fire({
                icon: 'success',
                title: 'Cambios Guardados!',
                text: `Los cambios se han guardado con exito!`,
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    }

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
        <main>
            <div className='flex gap-20 border-b border-b-gray-400 pb-5'>
                <div className='text-gray-500 w-50'>
                    Información Del Sistema
                </div>
                <div className='flex flex-col gap-3'>
                    <Input
                        name="sysName"
                        id="sysName"
                        label="Nombre del sistema"
                        info="Es el nombre que representa tu empresa o sistema, se mostrará en toda la web y a todos los usuarios, ten cuidado."
                        placeholder={system.sysName || 'Nombre Largo'}
                    />
                    <Input
                        name="shortSysName"
                        id="shortSysName"
                        label="Nombre corto"
                        info="Es el nombre abreviado de tu empresa o sistema, se mostrará en toda la web y a todos los usuarios, ten cuidado."
                        placeholder={system.shortSysName || 'Nombre Largo'}
                    />
                </div>
            </div>
            <div className='flex justify-left rounded-lg gap-3 text-gray-500'>
                <button onClick={handleSubmit} className='rounded-lg px-3 py-2 bg-lime-300 cursor-pointer shadow-xl'>Guardar</button>
            </div>
        </main>
    )
}

export default SystemConfig