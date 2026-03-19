import React from 'react'
import Input from '../../components/molecules/Input'

const CompanyConfig = () => {
    return (
        <main>
            <div className='flex gap-20 border-b border-b-gray-400 pb-5'>
                <div className='text-gray-500'>
                    Diseño de la empresa
                </div>
                <div className='flex flex-col gap-3'>
                    <Input
                        name="companyName"
                        id="companyName"
                        label="Nombre de la empresa"
                        info="El nombre que elijas se mostrará en toda la web y a todos los usuarios, ten cuidado."
                        placeholder="Empresa"
                    />
                </div>
            </div>

            <div className='bg-white py-3 flex justify-center rounded-lg gap-3 text-gray-500'>
                <button className='rounded-lg px-3 py-2 bg-lime-300 cursor-pointer shadow-xl'>Guardar</button>
                <button className='cursor-pointer px-3 py-2'>Cancelar</button>
            </div>
        </main>
    )
}

export default CompanyConfig