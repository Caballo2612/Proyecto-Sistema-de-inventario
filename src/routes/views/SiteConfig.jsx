import React, { useState } from 'react'
import Input from '../../components/molecules/Input';

const SiteConfig = () => {

    const colors = [
        "#3b82f6",
        "#a855f7",
        "#eab308",
        "#f97316",
        "#ef4444",
    ];

    const [selectedColor, setSelectedColor] = useState(colors[0])

    return (
        <main>
            <div className='flex gap-20 justify-start border-b border-b-gray-400 pb-5'>

                <div className='text-gray-500 w-50'>
                    Tema de la Web
                </div>

                <div className="flex flex-col gap-3">

                    <div className='flex gap-2'>
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded-full transition cursor-pointer
                                            ${selectedColor === color
                                        ? "ring-2 ring-gray-400 ring-offset-2 ring-offset-gray-200 scale-110"
                                        : ""}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    <span className='text-blue-500 cursor-pointer hover:underline text-sm'>
                        Más Colores
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
                        name="textColor"
                        id="textColor"
                        label="Color de texto"
                        type="color"
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

            <div className='flex justify-left rounded-lg gap-3 text-gray-500'>
                <button className='rounded-lg px-3 py-2 bg-lime-300 cursor-pointer shadow-xl'>Guardar</button>
            </div>

        </main>
    )
}

export default SiteConfig