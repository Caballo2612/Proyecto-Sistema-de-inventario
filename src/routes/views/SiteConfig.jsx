import React from 'react'
import Input from '../../components/molecules/Input';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { themes } from '../../utils/themes';

const SiteConfig = () => {

    const { selectedTheme, setSelectedTheme, saveTheme } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await saveTheme(selectedTheme.name);

            Swal.fire({
                title: "Configuración Guardada",
                text: "Tu configuración se ha guardado correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message || "Ocurrió un error al guardar la configuración",
                icon: "error"
            });
        }
    }

    return (
        <main>
            <div className='flex gap-20 justify-start border-b border-b-gray-400 pb-5'>

                <div className='text-gray-500 w-50'>
                    Tema de la Web
                </div>

                <div className="flex flex-col gap-3">

                    <div className='grid grid-cols-4 gap-2'>
                        {themes.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedTheme(color)}
                                className={`w-6 h-6 rounded-full transition cursor-pointer
                                            ${selectedTheme.headerColor === color.headerColor
                                        ? "ring-2 ring-gray-400 ring-offset-2 ring-offset-gray-200 scale-110"
                                        : ""}`}
                                style={{ backgroundColor: color.headerColor }}
                            />
                        ))}
                    </div>

                    <span className='text-blue-500 cursor-pointer hover:underline text-sm'>
                        Más Temas
                    </span>

                    <Input
                        name="themePersColor"
                        id="themePersColor"
                        label="Color Personalizado"
                        type="color"
                    />
                </div>

            </div>

            <div className='flex gap-20 justify-start border-b border-b-gray-400 pb-5 pt-3'>
                <div className='text-gray-500 w-50'>
                    Propiedades Del Texto
                </div>

                <div className='flex flex-col gap-3'>
                    <Input
                        label="Fuente"
                        name="font"
                        id="font"
                        type="selected"
                        info="La fuente que elijas se verá en toda la pagina"
                        options={[
                            { label: "Roboto", value: "roboto" },
                            { label: "Inter", value: "inter" },
                            { label: "Poppins", value: "poppins" }
                        ]}
                    />

                    <Input
                        label="Tamaño Del Texto"
                        name="textSize"
                        id="textSize"
                        type="selected"
                        info="el tamaño que elijas se utilizará en toda la pagina"
                        options={[
                            { label: "Normal", value: "16px" },
                            { label: "Pequeño", value: "12px" },
                            { label: "Grande", value: "20px" },
                            { label: "Muy Grande", value: "24px" }
                        ]}
                    />

                    <Input
                        label="Espaciado Entre Lineas"
                        name="spacing"
                        id="spacing"
                        type="selected"
                        info="el espaciado que elijas se utilizará en toda la pagina"
                        options={[
                            { label: "Normal", value: "Normal" },
                            { label: "Sencillo (1.0)", value: "1.0" },
                            { label: "Linea y Media (1.5)", value: "1.5" },
                            { label: "Doble (2.0)", value: "2.0" }
                        ]}
                    />
                </div>
            </div>

            <div className='flex justify-end rounded-lg gap-3 py-2 text-gray-500'>
                <button className='rounded-lg px-3 py-2 bg-lime-300 cursor-pointer shadow-xl' onClick={handleSubmit}>Guardar</button>
            </div>

        </main>
    )
}

export default SiteConfig