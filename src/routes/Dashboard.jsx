import { useEffect, useState } from 'react'
import { DataCard } from '../components/organisms/DataCard'
import { collection, getCountFromServer  } from 'firebase/firestore'

export const Dashboard = ({ firestore }) => {

    const [counts, setCounts] = useState({})

    useEffect(() => {
        async function getCounts() {
            try {
                const res = await fetch("http://localhost:3000/api/data/count");
                const dataSql = await res.json();

                const coll = collection(firestore, 'Usuarios');
                const query = await getCountFromServer(coll);

                const totalUsuarios = query.data().count;

                setCounts({
                    ...dataSql,
                    usuarios: totalUsuarios
                });

            } catch (error) {
                console.log(error)
            }
        }

        getCounts();

    }, [firestore])

    const InfoCards = [
        { imagen: 'compras', bgImg: 'bg-blue-500', title: 'Ordenes de Compra' },
        { imagen: 'recibidos', bgImg: 'bg-green-500', title: 'Compras Recibidos' },
        { imagen: 'devoluciones', bgImg: 'bg-yellow-500', title: 'Devoluciones' },
        { imagen: 'productos', bgImg: 'bg-purple-500', title: 'Productos', key: 'productos' },
        { imagen: 'ventas', bgImg: 'bg-red-500', title: 'Ventas' },
        { imagen: 'proveedores', bgImg: 'bg-pink-500', title: 'Proveedores', key: 'proveedores'},
        { imagen: 'usuarios', bgImg: 'bg-orange-500', title: 'Usuarios', key: 'usuarios' }
    ]

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
