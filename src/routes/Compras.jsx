import React from 'react'
import { DataTables } from '../components/organisms/DataTable'

export const Compras = () => {

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Producto', identifier: 'name' },
        { header: 'Cantidad', identifier: 'stock' },
        { header: 'Precio', identifier: 'precio' },
        { header: 'Proveedor', identifier: 'proveedor' },
        { header: 'Fecha', identifier: 'fecha' },
    ];

    return (
        <DataTables
            columns={columns}
            data={[]}
            Actions={null}
            Title="Lista de Compras"
        />
    )
}
