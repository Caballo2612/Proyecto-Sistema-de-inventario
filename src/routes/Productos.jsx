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
        { header: 'Description', indentifier: 'description' },
        { header: 'Precio De Venta', identifier: 'price' },
        { header: 'Stock', identifier: 'stock' },
        { header: 'Proveedor', identifier: 'provider' },
        { header: 'Fecha', identifier: 'date' },
    ];

    const Actions = [
        { name: 'Ver', identifier: 'details' },
        { name: 'Editar', identifier: 'edit' },
        { name: 'Eliminar', identifier: 'delete' },
    ];

    return (
        <DataTables
            columns={columns}
            data={productos}
            Actions={Actions}
            Title="Lista de Productos"
        />
    )
}