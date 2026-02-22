import React from 'react'

export const DataTables = ({ columns, data, Actions, Title }) => {
    return (
        <div className='m-4 bg-white border-t-3 border-2 border-gray-200 border-t-blue-500 rounded-md'>
            <div className='border-b border-gray-300 px-6 py-2 flex justify-between'>
                <h2 className=''>
                    {Title}
                </h2>
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1'>
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
            <div className='p-5'>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-3 py-2 text-left border-t-3 border-b-2 border-t-gray-300 border-b-gray-300 font-normal">
                                    {col.header}
                                </th>
                            ))}

                            {Actions && (
                                <th className="px-3 py-2 text-left border-t-3 border-b-2 border-t-gray-300 border-b-gray-300 font-normal">
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
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

                                <td className="px-3 py-2">
                                    <select name="accion" id="action" className="border rounded-md px-2 py-1 bg-white focus:outline-none">
                                        <option value="" defaultChecked>Seleccionar</option>
                                        {Actions.map((Actions, accionIndex) => (
                                            <option value={Actions.identifier} key={accionIndex}>{Actions.name}</option>
                                        ))}
                                    </select>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
