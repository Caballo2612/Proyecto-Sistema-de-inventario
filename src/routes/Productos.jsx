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

    const FormMenu = (
        <>
            <input type="text" name='name' placeholder='Nombre' className='border rounded-md px-2 py-1 focus:outline-none' />
            <input type="number" name='price' placeholder='Precio De Venta' className='border rounded-md px-2 py-1 focus:outline-none' />
            <input type="text" name='description' placeholder='Descripción' className='border rounded-md px-2 py-1 focus:outline-none' />
            <input type="number" name='stock' placeholder='Stock' className='border rounded-md px-2 py-1 focus:outline-none' />
            <select name="provider" className='border border-black rounded-md px-2 py-1 focus:outline-none text-gray-500'>
                <option value="Seleccionar un proveedor" defaultChecked>Seleccionar un proveedor</option>
            </select>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200'>Agregar</button>
        </>
    );

    return (
        <DataTables
            columns={columns}
            data={productos}
            Title="Lista de Productos"
            FormMenu={FormMenu}
        />
    )
}