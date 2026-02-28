import { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'

export const Productos = () => {

    const [productos, setProductos] = useState([]);
    const [providers, setProviders] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/data")
            .then(res => res.json())
            .then(data => {
                setProductos(data.productos);
                setProviders(data.proveedores);
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
        { type: "number", name: "price", placeholder: "Precio Del Producto", required: true },
        { type: "number", name: "stock", placeholder: "Cantidad Comprada" },
        {
            type: "select",
            name: "providers",
            label: "Seleccionar Proveedor",
            required: true,
            options: providers.map(p => ({
                value: p.id,
                label: p.name
            }))
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