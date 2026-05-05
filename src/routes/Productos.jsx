import { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, getDocs, doc, setDoc, onSnapshot, query, deleteDoc, updateDoc } from 'firebase/firestore';
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

            await Swal.fire({
                icon: 'success',
                title: 'Producto Añadido!',
                text: `El Producto ${nombre} fue creado con exito!`,
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

    const onDeleteProduct = async (id, nombre) => {
        try {
            const result = await Swal.fire({
                icon: 'warning',
                title: `Estas seguro de eliminar a ${nombre}?`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si estoy seguro!"
            })

            if (result.isConfirmed) {
                await deleteDoc(doc(firestore, "Productos", id));

                await Swal.fire({
                    title: 'Producto eliminado!',
                    text: 'El producto ha sido eliminado con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                    toast: true,
                    position: 'top-end'
                })
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: err.message,
            })
        }
    };

    const onUpdateProduct = async (id, formData) => {
        try {
            const { descripcion, precio, stock } = formData;

            const updateProducto = {
                descripcion: descripcion,
                precio: Number(precio),
                stock: Number(stock),
            };

            await updateDoc(
                doc(firestore, "Productos", id), updateProducto
            )

            await Swal.fire({
                title: 'Producto Actualizado!',
                text: 'El producto ha sido actualizado con exito',
                icon: 'success',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                position: 'top-end'
            })

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar datos',
                text: err.message,
            })
        }
    }

    const columns = [
        { header: 'SKU', identifier: 'sku' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Precio De Venta', identifier: 'precio' },
        { header: 'Stock', identifier: 'stock' },
        { header: 'Proveedor', identifier: 'proveedor' },
        { header: 'Fecha', identifier: 'createdAt' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre Del Producto", required: true, disableOnEdit: true },
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
            onDelete={onDeleteProduct}
            onEdit={onUpdateProduct}
        />
    )
}