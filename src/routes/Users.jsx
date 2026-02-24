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
    })

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Email', identifier: 'email' },
        { header: 'Contraseña', identifier: 'contraseña' },
        { header: 'documento', identifier: 'documento' },
        { header: 'tipo_documento', identifier: 'tipo_documento' },
        { header: 'Tipo', identifier: 'user_type' },
    ];

    const FormMenu = [
        <>
            <input type="text" name='nombre' placeholder='Nombre' className='border rounded-md px-2 py-1 focus:outline-none'/>
            <input type="text" name='email' placeholder='Email' className='border rounded-md px-2 py-1 focus:outline-none'/>
            <input type="text" name="contraseña" placeholder='Contraseña' className='border rounded-md px-2 py-1 focus:outline-none'/>
            <input type="text" name='documento' placeholder='N. Documento' className='border rounded-md px-2 py-1 focus:outline-none'/>
            <select name="tipo_documento" className='border border-black rounded-md px-2 py-1 focus:outline-none text-gray-500'>
                <option value="cedula de ciudadania">Cedula De Ciudadania</option>
                <option value="cedula de extranjeria">Cedula De Extranjeria</option>
                <option value="P.P.T">Pasaporte De Permiso Temporal</option>
            </select>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200'>Agregar</button>
        </>
    ]

    return ( 
                <DataTables
                    columns={columns}
                    data={usuarios}
                    Title="Lista de Usuarios"
                    FormMenu={FormMenu}
                />
    )
}
