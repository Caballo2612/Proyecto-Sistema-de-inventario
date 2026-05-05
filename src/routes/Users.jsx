import { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import appFireBase from "../credentials";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const secondaryApp = initializeApp(appFireBase.options, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

export const Users = ({ firestore }) => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(firestore, 'Usuarios'), (snapshot) => {
            const usuarios = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setUsuarios(usuarios);
        });

        return () => unSubscribe();

    }, [firestore]);

    const handleSubmit = async (formData) => {
        const { nombre, email, password, user_type } = formData;
        try {
            const userInfo = await createUserWithEmailAndPassword(
                secondaryAuth,
                email,
                password
            );
            const docuRef = doc(firestore, `Usuarios/${userInfo.user.uid}`);
            await setDoc(docuRef, {
                correo: email,
                nombre: nombre,
                rol: user_type
            });
            await signOut(secondaryAuth);
            await Swal.fire({
                icon: 'success',
                title: 'Cuenta creada!',
                text: `El Usuario ${nombre} fue creado con exito!`,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                timer: 2000,
                position: 'top-end',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    };

    const onDeleteUser = async (id, nombre) => {
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
                await deleteDoc(doc(firestore, "Usuarios", id));

                await Swal.fire({
                    title: 'Usuario eliminado!',
                    text: 'El Usuario ha sido eliminado con exito',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000,
                    toast: true,
                    position: 'top-end'
                });
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: err.message,
            })
        }
    };

    const columns = [
        { header: 'ID', identifier: 'id' },
        { header: 'Nombre', identifier: 'nombre' },
        { header: 'Email', identifier: 'correo' },
        { header: 'Rol', identifier: 'rol' },
    ];

    const Fields = [
        { type: "text", name: "nombre", placeholder: "Nombre", required: true },
        { type: "email", name: "email", placeholder: "Email", required: true, disableOnEdit: true },
        { type: "password", name: "password", placeholder: "Contraseña", rules: true, disableOnEdit: true },
        {
            type: "select",
            name: "user_type",
            label: "Seleccione Tipo De Usuario",
            required: true,
            options: [
                { value: "Admin", label: "Admin" },
                { value: "Usuario", label: "Usuario" }
            ]
        }
    ];

    return (
        <DataTables
            columns={columns}
            data={usuarios}
            Title="Lista de Usuarios"
            Fields={Fields}
            onSubmit={handleSubmit}
            onDelete={onDeleteUser}
            excludeFields={"preferences"}
        />
    )
}
