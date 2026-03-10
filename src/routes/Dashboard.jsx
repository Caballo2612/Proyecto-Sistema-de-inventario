import { useEffect, useState } from 'react'
import { DataCard } from '../components/organisms/DataCard'
import { collection, getCountFromServer } from 'firebase/firestore'

export const Dashboard = ({ firestore, usuario }) => {

    const [counts, setCounts] = useState({})

    useEffect(() => {

    async function getCounts() {

        try {
            const productosColl = collection(firestore, "Productos");
            const proveedoresColl = collection(firestore, "Proveedores");
            const productosSnap = await getCountFromServer(productosColl);
            const proveedoresSnap = await getCountFromServer(proveedoresColl);

            let totalUsuarios = 0;

            if (usuario.rol === "Admin") {

                const usuariosColl = collection(firestore, "Usuarios");
                const usuariosSnap = await getCountFromServer(usuariosColl);

                totalUsuarios = usuariosSnap.data().count;
            }

            setCounts({
                productos: productosSnap.data().count,
                proveedores: proveedoresSnap.data().count,
                usuarios: totalUsuarios
            });

        } catch (error) {
            console.error(error);
        }

    }

    getCounts();

}, [firestore, usuario]);

    const InfoCards = [
        { imagen: 'compras', bgImg: 'bg-blue-500', title: 'Ordenes de Compra' },
        { imagen: 'recibidos', bgImg: 'bg-green-500', title: 'Compras Recibidos' },
        { imagen: 'devoluciones', bgImg: 'bg-yellow-500', title: 'Devoluciones' },
        { imagen: 'productos', bgImg: 'bg-purple-500', title: 'Productos', key: 'productos' },
        { imagen: 'ventas', bgImg: 'bg-red-500', title: 'Ventas' },
        { imagen: 'proveedores', bgImg: 'bg-pink-500', title: 'Proveedores', key: 'proveedores' },
    ].concat(usuario.rol === 'Admin' ?
        [
            { imagen: 'usuarios', bgImg: 'bg-orange-500', title: 'Usuarios', key: 'usuarios' },
        ]
    : [])

    return (
        <>
            <div className='px-4'>
                <h1 className='text-[40px] text-gray-700 font-bold p-4 border-b border-gray-300 hidden md:block lg:block xl:block'>
                    Sistema Web De Inventario
                </h1>
            </div>

            <div className='p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    <DataCard
                        Cards={InfoCards}
                        Counts={counts}
                    />
                </div>
            </div>
        </>
    )
}
