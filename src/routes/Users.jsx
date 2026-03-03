import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'

export const Users = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/data")
            .then(res => res.json())
            .then(data => {
                setUsuarios(data.usuarios);
            })
            .catch(err => console.log(err));
    }, []);

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Email', identifier: 'email' },
        { header: 'Contraseña', identifier: 'contraseña' },
        { header: 'documento', identifier: 'documento' },
        { header: 'tipo_documento', identifier: 'tipo_documento' },
        { header: 'Tipo', identifier: 'user_type' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre", required: true },
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Contraseña" },
        { type: "text", name: "documento", placeholder: "Numero De Documento", required: true},
        {
            type: "select",
            name: "tipo_documento",
            label: "Seleccione Tipo De Documento",
            required: true,
            options: [
                { value: "cc", label: "Cédula de Ciudadanía" },
                { value: "ce", label: "Cédula de Extranjería" }
            ]
        },
        {
            type: "select",
            name: "user_type",
            label: "Seleccione Tipo De Usuario",
            required: true,
            options: [
                { value: "admin", label: "Admin" },
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
