import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
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
            const { nombre, direccion, email, estado, telefono, contacto } = formData;

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
                doc(firestore, "Proveedores", nombre.toUpperCase()),
                provider
            );

            await Swal.fire({
                icon: 'success',
                title: 'Proveedor Añadido!',
                text: `El Proveedor ${nombre} fue creado con exito!`,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                timer: 3000,
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

    const onDeleteProvider = async (id) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: `Estas seguro de eliminar a ${id}?`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si estoy seguro!"
            })

            if (result.isConfirmed) {
                await deleteDoc(doc(firestore, "Proveedores", id));

                await Swal.fire({
                    title: 'Proveedor eliminado!',
                    text: 'El proveedor ha sido eliminado con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                });
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: err.message,
            })
        }
    };

    const onUpdateProvider = async (id, formData) => {
        try {
            const { contacto, direccion, email, telefono, estado } = formData;

            const updateProvider = {
                contacto,
                direccion,
                email,
                telefono,
                estado
            };

            await updateDoc(
                doc(firestore, "Proveedores", id), updateProvider
            )

            await Swal.fire({
                title: 'Proveedor Actualizado!',
                text: 'El proveedor ha sido actualizado con exito',
                icon: 'success',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: 'top-end'
            })

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar datos',
                text: err.message,
            })
        }
    }

    const columns = [
        { header: 'Proveedor', identifier: 'id' },
        { header: 'Contacto', identifier: 'contacto' },
        { header: 'Direccion', identifier: 'direccion' },
        { header: 'Correo', identifier: 'email' },
        { header: 'Estado', identifier: 'estado' }
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre Del Proveedor", required: true, disableOnEdit: true },
        { type: 'text', name: 'contacto', placeholder: 'Contacto', required: true },
        { type: 'text', name: 'email', placeholder: 'Correo Del Proveedor', required: true, },
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
            onDelete={onDeleteProvider}
            onEdit={onUpdateProvider}
        />
    )
}
