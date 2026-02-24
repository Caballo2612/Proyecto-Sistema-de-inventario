import { useState } from 'react'

export const DataTables = ({ columns, data, Title, FormMenu }) => {

    const [IsOpenRow, setIsOpenRow] = useState(null);

    const [IsOpenForm, setIsOpenForm] = useState(false);

    return (
        <div className='m-4 bg-white border-t-3 border-2 border-gray-200 border-t-blue-500 rounded-md'>
            <div className='border-b border-gray-300 px-6 py-2 flex justify-between'>
                <h2 className=''>
                    {Title}
                </h2>
                <button
                    onClick={() => setIsOpenForm(!IsOpenForm)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1'
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#fff"
                        stroke="#fff"
                        className='rotate-135'
                        viewBox="0 0 52 52">
                        <path d="m31 25.4 13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z" />
                    </svg>
                    Nuevo
                </button>
            </div>

            {FormMenu && IsOpenForm && (
                <>
                    <div className='absolute w-full h-full bg-black opacity-45 inset-0 z-10' onClick={() => setIsOpenForm(!IsOpenForm)}>
                    </div>
                    <div className='m-4 absolute z-200 bg-white border-t-3 border-2 border-gray-200 border-t-blue-500 shadow-md rounded-md'>
                        <div className=''>
                            <div className='text-lg font-semibold p-4 border-b border-b-gray-300 flex items-center text-center gap-2'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#000"
                                    stroke="#000"
                                    className='rotate-135'
                                    viewBox="0 0 52 52">
                                    <path d="m31 25.4 13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z" />
                                </svg>
                                Nuevo
                            </div>
                            <form className='flex flex-col gap-3 p-4 w-6xl'>
                                {FormMenu}
                            </form>
                        </div>
                    </div>
                </>
            )
            }

            <div className='p-5 flex justify-between'>
                <div className="flex items-center gap-2">
                    <span>Mostrar</span>

                    <select className="border rounded-md px-2 py-1 bg-white focus:outline-none ">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>Full</option>
                    </select>

                    <span>entradas</span>
                </div>
                <div className='flex items-center gap-2'>
                    <label htmlFor="searchInput">Buscar:</label>
                    <input
                        type="text"
                        name='search'
                        id='searchInput'
                        className="border rounded-md px-2 py-1 bg-white focus:outline-none"
                    />
                </div>
            </div>
            <div className='p-5 rounded-lg overflow-hidden'>
                <table className="min-w-full border border-gray-200">
                    <thead className="">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-3 py-2 text-left border-t-3 border-b-2 border-t-gray-300 border-b-gray-300 font-normal">
                                    {col.header}
                                </th>
                            ))}

                            <th className="px-3 py-2 text-left border-t-3 border-b-2 border-t-gray-300 border-b-gray-300 font-normal">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="even:bg-gray-200 odd:bg-white hover:bg-gray-100 transition-colors duration-200"
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-3 py-2 border-none">
                                        {row[col.identifier]}
                                    </td>
                                ))}

                                <td className='px-3 py-2 relative'>
                                    <button
                                        className="border rounded-md px-2 py-1 bg-white hover:bg-gray-100 cursor-pointer flex items-center gap-1"
                                        onClick={() => setIsOpenRow(IsOpenRow === rowIndex ? null : rowIndex)}
                                    >
                                        Acción
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            className={"transform transition-transform duration-200 " + (IsOpenRow === rowIndex ? "rotate-180" : "")}
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <path fill="#0f0f0f" d="M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 1 0-1.414-1.415l-4.185 4.186a1 1 0 0 1-1.415 0L7.121 9.71a1 1 0 0 0-1.414 0" />
                                        </svg>
                                    </button>

                                    {IsOpenRow === rowIndex && (
                                        <div className="absolute top-full right-0 -mt-1 bg-white border rounded-md shadow-md flex flex-col z-100">

                                            <button
                                                className="px-3 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer"
                                            >
                                                Ver
                                            </button>

                                            <button
                                                className="px-3 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="px-3 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='p-5 flex justify-between'>
                    <span className=''>
                        showing 1 to 1 of 1 entries
                    </span>
                    <div className='flex items-center'>
                        <button className='border border-gray-300 text-gray-400 px-2 py-1 bg-white hover:bg-gray-100 rounded-tl-sm rounded-bl-sm'>
                            Previous
                        </button>
                        <div className='bg-blue-500 text-white px-2 py-1 border border-blue-500'>
                            <span>
                                1
                            </span>
                        </div>
                        <button className='border border-gray-300 text-gray-400 px-2 py-1 bg-white hover:bg-gray-100 rounded-tr-sm rounded-br-sm'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
