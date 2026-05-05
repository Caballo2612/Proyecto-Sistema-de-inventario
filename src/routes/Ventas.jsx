import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PointOfSale from './views/POS';
import { collection, onSnapshot } from 'firebase/firestore';

export const Ventas = ({ firestore, usuario }) => {

    const [ventas, setVentas] = useState([]);

    const navigate = useNavigate();

    const { view } = useParams();

    const { toggleMenu } = useOutletContext();

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(firestore, 'Ventas'), (snapshot) => {
            const ventas = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setVentas(ventas);
        });

        return () => unSubscribe();

    }, [firestore]);

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Vendedor', identifier: 'vendedorId' },
        { header: 'Precio Total', identifier: 'total' },
        { header: 'SubTotal', identifier: 'subtotal' },
        { header: 'Metodo de pago', identifier: 'metodoPago' },
        { header: 'Fecha', identifier: 'fecha' },
    ];

    if (!view || (view !== 'historial' && view !== 'POS')) {
        Swal.fire({
            title: 'La vista deseada no existe',
            text: 'Selecciona una vista para comenzar',
            icon: 'info',
            confirmButtonText: 'Ir a Historial de Ventas',
            showCancelButton: true,
            cancelButtonText: 'Ir a Punto de Venta',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/Ventas/historial');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                navigate('/Ventas/POS');
            }
        });
    };    

    if (view === 'historial') {
        return (
            <div>
                <div className="flex gap-2 w-full bg-gray-200 p-3 rounded-lg ">
                    <button
                        className={`py-1 px-2 rounded-xl text-sm cursor-pointer transition-colors duration-300 ${view === "historial" ? "bg-gray-500 text-gray-100" : "text-gray-600 hover:bg-gray-200"}`}
                    >
                        Historial de Ventas
                    </button>
                    <button
                        onClick={() => { navigate('/Ventas/POS'); toggleMenu('sidebar'); toggleMenu('header') }}
                        className={`py-1 px-2 rounded-xl text-sm cursor-pointer transition-colors duration-300 ${view === "POS" ? "bg-gray-500 text-gray-100" : "text-gray-600 hover:bg-gray-300"}`}
                    >
                        Punto de Venta
                    </button>
                </div>

                <DataTables
                    columns={columns}
                    data={ventas}
                    Title="Lista de Ventas"
                    Actions={usuario.rol === 'Admin' ? ['delete', 'more'] : ['more']}
                />
            </div>
        );
    }

    if (view === 'POS') {
        return (
            <PointOfSale 
                firestore={firestore}
                usuario={usuario}
                navigate={navigate}
                toggleMenu={toggleMenu}
            />
        );
    }
}