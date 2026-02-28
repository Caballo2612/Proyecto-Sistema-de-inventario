import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'

export const Proveedores = () => {

    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/data")
            .then(res => res.json())
            .then(data => {
                setProviders(data.proveedores);
            })
            .catch(err => console.log(err));
    })

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'name' },
        { header: 'Direccion', identifier: 'direccion' },
        { header: 'Estado', identifier: 'estado'}
    ];

    const Fields = [
        { type: "text", name: "name", placeholder: "Nombre Del Proveedor", required: true },
        { type: "text", name: "direccion", placeholder: "Direccion Del Proveedor", required: true },
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
        />
    )
}
