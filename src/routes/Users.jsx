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

    const Actions = [
        { name: 'Editar', identifier: 'edit' },
        { name: 'Eliminar', identifier: 'delete' },
    ]

    return ( 
                <DataTables
                    columns={columns}
                    data={usuarios}
                    Actions={Actions}
                    Title="Lista de Usuarios"
                />
    )
}
