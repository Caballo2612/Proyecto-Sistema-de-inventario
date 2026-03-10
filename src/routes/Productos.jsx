import { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, getDocs, doc, setDoc, onSnapshot, query } from 'firebase/firestore';
import Swal from "sweetalert2";

export const Productos = ({ firestore }) => {

    const [productos, setProductos] = useState([]);
    const [providers, setProviders] = useState([])

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(firestore, 'Productos'), (snapshot) => {
            const productos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setProductos(productos);
        });

        return () => unSubscribe();

    }, [firestore]);

    useEffect(() => {
        const getProviders = async () => {

            const q = query(
                collection(firestore, "Proveedores"),
            );

            const snapshot = await getDocs(q);

            const providers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setProviders(providers);
        };

        getProviders();
    }, [firestore]);

    const generarSKU = (nombre, proveedor) => {

        const nom = nombre.substring(0, 3).toUpperCase();
        const prov = proveedor.substring(0, 3).toUpperCase();
        const random = Math.floor(Math.random() * 1000);

        return `${nom}-${prov}-${random}`;
    }

    const addProducto = async (formData) => {

        try {
            const { nombre, descripcion, precio, stock, proveedor } = formData;

            const sku = generarSKU(nombre, proveedor);

            const producto = {
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                stock: Number(stock),
                proveedor: proveedor,
                sku: sku,
                createdAt: new Date()
            };

            await setDoc(
                doc(firestore, "Productos", sku),
                producto
            );

            Swal.fire({
                icon: 'success',
                title: 'Cuenta creada!',
                text: `El Usuario ${formData.nombre} fue creado con exito!`,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                timer: 2000,
                position: 'top-end',
            });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: err.message,
            });

        }
    };

    const columns = [
        { header: 'SKU', identifier: 'sku' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Precio De Venta', identifier: 'precio' },
        { header: 'Stock', identifier: 'stock' },
        { header: 'Proveedor', identifier: 'proveedor' },
        { header: 'Fecha', identifier: 'createdAt' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre Del Producto", required: true },
        { type: "text", name: "descripcion", placeholder: "Descripcion Del Producto", required: true },
        { type: "number", name: "precio", placeholder: "Precio Del Producto", required: true },
        { type: "number", name: "stock", placeholder: "Cantidad Comprada" },
        {
            type: "select",
            name: "proveedor",
            label: "Seleccionar Proveedor",
            required: true,
            options: providers
                .filter(p => p.estado === 'activo')
                .map(p => ({
                    value: p.id,
                    label: p.nombre
                }))
        }
    ];

    return (
        <DataTables
            columns={columns}
            data={productos}
            Title="Lista de Productos"
            Fields={Fields}
            onSubmit={addProducto}
        />
    )
}