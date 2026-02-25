import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'

export const Productos = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/data")
            .then(res => res.json())
            .then(data => {
                setProductos(data.productos);
            })
            .catch(err => console.log(err));
    })

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'name' },
        { header: 'Precio De Compra', identifier: 'price' },
        { header: 'Stock', identifier: 'stock' },
        { header: 'Proveedor', identifier: 'provider' },
        { header: 'Fecha', identifier: 'date' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre Del Producto", required: true },
        { type: "text", name: "price", placeholder: "Precio Del Producto", required: true },
        { type: "number", name: "stock", placeholder: "Cantidad Comprada" },
        {
            type: "select",
            name: "tipo_documento",
            label: "Seleccionar Proveedor",
            required: true,
            options: [
                { value: "cc", label: "Cédula de Ciudadanía" },
                { value: "ce", label: "Cédula de Extranjería" }
            ]
        }
    ];

    return (
        <DataTables
            columns={columns}
            data={productos}
            Title="Lista de Productos"
            Fields={Fields}
        />
    )
}