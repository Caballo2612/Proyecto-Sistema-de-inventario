import React from 'react'
import Input from '../../components/molecules/Input';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { themes } from '../../utils/themes';

const SiteConfig = () => {

    const { preferences, updatePreference, savePreferences } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await savePreferences();

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

                    <div className='grid grid-cols-6 gap-3'>
                        {themes.map((color) => (
                            <button
                                key={color.name}
                                title={color.name}
                                onClick={() => updatePreference('theme', color)}
                                className={`w-6 h-6 rounded-full transition cursor-pointer
                                            ${preferences.theme.headerColor === color.headerColor
                                        ? "ring-2 ring-gray-400 ring-offset-2 ring-offset-gray-200 scale-110"
                                        : ""}`}
                                style={{ backgroundColor: color.headerColor }}
                            />
                        ))}
                    </div>

                    <span className='text-blue-500 cursor-pointer hover:underline text-sm'>
                        Más Temas
                    </span>
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
                        value={preferences.font}
                        onChange={(e) => updatePreference('font', e.target.value)}
                        options={[
                            { label: "Roboto", value: "Roboto, sans-serif" },
                            { label: "Inter", value: "Inter, sans-serif" },
                            { label: "Poppins", value: "Poppins, sans-serif" }
                        ]}
                    />

                    <Input
                        name="themePersColor"
                        id="themePersColor"
                        label="Color de Texto Personalizado"
                        type="color"
                        value={preferences.customColor}
                        onChange={(e) => updatePreference('customColor', e.target.value)}
                    />

                    <Input
                        label="Tamaño Del Texto"
                        name="textSize"
                        id="textSize"
                        type="selected"
                        info="el tamaño que elijas se utilizará en toda la pagina"
                        value={preferences.textSize}
                        onChange={(e) => updatePreference('textSize', e.target.value)}
                        options={[
                            { label: "Normal", value: "16px" },
                            { label: "Pequeño", value: "12px" },
                            { label: "Grande", value: "20px" },
                            { label: "Muy Grande", value: "24px" }
                        ]}
                    />

                    <Input
                        label="Espaciado entre letras"
                        name="letterSpacing"
                        id="letterSpacing"
                        type="selected"
                        info="el espaciado que elijas se utilizará en toda la pagina"
                        value={preferences.letterSpacing}
                        onChange={(e) => updatePreference('letterSpacing', e.target.value)}
                        options={[
                            { label: "Normal", value: "0px" },
                            { label: "Pequeño", value: "-0.8px" },
                            { label: "Grande", value: "2px" },
                            { label: "Muy Grande", value: "6px" }
                        ]}
                    />

                    <Input
                        label="Espaciado Entre Lineas"
                        name="spacing"
                        id="spacing"
                        type="selected"
                        info="el espaciado que elijas se utilizará en toda la pagina"
                        value={preferences.spacing}
                        onChange={(e) => updatePreference('spacing', e.target.value)}
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