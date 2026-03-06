import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, getDocs } from 'firebase/firestore';

export const Users = ({ firestore }) => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const query = await getDocs(collection(firestore, 'Usuarios'));

            const usuarios = query.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setUsuarios(usuarios)
        }
        getUsers();
    }, [firestore]);

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Email', identifier: 'correo' },
        { header: 'Rol', identifier: 'rol' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre", required: true },
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Contraseña" },
        {
            type: "select",
            name: "user_type",
            label: "Seleccione Tipo De Usuario",
            required: true,
            options: [
                { value: "Admin", label: "Admin" },
                { value: "Usuario", label: "Empleado" }
            ]
        }
    ];

    return (
        <DataTables
            columns={columns}
            data={usuarios}
            Title="Lista de Usuarios"
            Fields={Fields}
        />
    )
}
