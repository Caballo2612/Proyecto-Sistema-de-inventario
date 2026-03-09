import React, { useEffect, useState } from 'react'
import { DataTables } from '../components/organisms/DataTable'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import appFireBase from "../credentials";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const secondaryApp = initializeApp(appFireBase.options, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

export const Users = ({ firestore }) => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const querySnapshot = await getDocs(collection(firestore, 'Usuarios'));

            const usuarios = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setUsuarios(usuarios)
        }
        getUsers();
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
            Swal.fire({
                icon: 'success',
                title: 'Cuenta creada!',
                text: 'Tu cuenta ha sido creada correctamente!',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
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
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Contraseña", rules: true },
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
        />
    )
}
