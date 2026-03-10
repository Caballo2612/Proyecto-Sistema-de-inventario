import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import Swal from "sweetalert2";

export const Proveedores = ({ firestore }) => {

    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(firestore, 'Proveedores'), (snapshot) => {
            const providers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setProviders(providers);
        });

        return () => unSubscribe();
    }, [firestore]);

    const addProvider = async (formData) => {

        try {
            const { nombre, direccion, email, estado, telefono, contacto  } = formData;

            const provider = {
                nombre: nombre,
                contacto: contacto,
                direccion: direccion,
                email: email,
                estado: estado,
                telefono: telefono,
                createdAt: new Date()
            };

            await setDoc(
                doc(firestore, "Proveedores", nombre.toLowerCase()),
                provider
            );

            Swal.fire({
                icon: 'success',
                title: 'Proveedor Añadido!',
                text: `El Proveedor ${nombre} fue creado con exito!`,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                timer: 2000,
                position: 'top-end',
            });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: err.message,
            });

        }
    };

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Direccion', identifier: 'direccion' },
        { header: 'Correo', identifier: 'email' },
        { header: 'Estado', identifier: 'estado' }
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre Del Proveedor", required: true },
        { type: 'text', name: 'contacto', placeholder: 'Contacto', required: true },
        { type: 'text', name: 'email', placeholder: 'Correo Del Proveedor', required: true },
        { type: "text", name: "direccion", placeholder: "Direccion Del Proveedor", required: true },
        { type: 'text', name: 'telefono', placeholder: 'Telefono del proveedor', required: true },
        {
            type: "select",
            name: "estado",
            label: "Seleccione Estado De Proveedor",
            required: true,
            options: [
                { value: "activo", label: "Activo" },
                { value: "inactivo", label: "Inactivo" }
            ]
        }
    ];

    return (
        <DataTables
            columns={columns}
            data={providers}
            Title='Lista De Proveedores'
            Fields={Fields}
            onSubmit={addProvider}
        />
    )
}
