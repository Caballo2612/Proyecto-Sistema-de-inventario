import { useState, useMemo } from 'react';
import { PriceFormats } from '../../utils/priceFormats';
import Input from '../molecules/Input';

export const DataTables = ({ columns, data, Title, Fields, onSubmit, onDelete, onEdit }) => {

    const [IsOpenRow, setIsOpenRow] = useState(null);
    const [editId, setEditId] = useState(null);

    const [IsOpen, setIsOpen] = useState({
        Form: false,
        Select: null,
        View: null,
    });
    const [viewData, setViewData] = useState(null);

    const toggleSelect = (fieldName) => {
        setIsOpen(prev => ({
            ...prev,
            Select: prev.Select === fieldName ? null : fieldName
        }));
    };

    const toggleMenu = (menu) => {
        setIsOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }))
    };

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            onEdit(editId, formData);
        } else {
            onSubmit(formData);
        }
        setIsOpen(prev => ({
            ...prev,
            Form: false
        }));
        setFormData({});
        setEditId(null)
    }

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        );

    }, [data, search]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = useMemo(() => {

        if (rowsPerPage === "Full") return filteredData;

        return filteredData.slice(startIndex, endIndex);

    }, [filteredData, startIndex, endIndex, rowsPerPage]);

    return (
        <div className='m-4 bg-white border-t-3 border-2 border-gray-200 border-t-blue-500 rounded-md'>
            <div className='border-b border-gray-300 px-6 py-2 flex justify-between'>
                <h2 className=''>
                    {Title}
                </h2>
                {Fields && (
                    <button
                        onClick={() => {
                            setEditId(null);
                            setFormData({});
                            toggleMenu('Form');
                        }}
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
                        {editId ? "Editar" : "Nuevo"}
                    </button>
                )}
            </div>

            {Fields && IsOpen.Form && (
                <>
                    <div className='absolute w-full h-full bg-black opacity-45 inset-0 z-10' />
                    <div className='fixed inset-0 left-[20%] flex items-center justify-center z-50 p-4 rounded-md'>
                        <div className="w-full max-w-4xl bg-white border-t-3 border-t-blue-600 shadow-md rounded-md">
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
                                <span>
                                    {editId ? "Editar" : "Nuevo"}
                                </span>
                            </div>
                            <form className='flex gap-3 p-4' id='formData' onSubmit={handleSubmit}>
                                {Fields.map((field, index) => {

                                    if (field.type === "select") {
                                        return (
                                            <div key={index} className='relative'>
                                                <button
                                                    type='button'
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onClick={() => toggleSelect(field.name)}
                                                    className="border rounded-md px-4 py-2"
                                                    required={field.required}
                                                >
                                                    {formData[field.name]
                                                        ? field.options.find(o => o.value === formData[field.name])?.label
                                                        : field.label}
                                                </button>

                                                <div className={`absolute mt-1 w-auto bg-white rounded-sm shadow-md z-50 transition-[max-height] duration-400 overflow-hidden ${IsOpen.Select === field.name ? 'max-h-200 border border-black' : 'max-h-0 border border-black opacity-0'}`}>
                                                    {field.options.map((option, i) => (
                                                        <div key={i}>
                                                            <button
                                                                type='button'
                                                                className='block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-sm cursor-pointer'
                                                                value={option.value}
                                                                onClick={() => {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        [field.name]: option.value
                                                                    }));
                                                                    setIsOpen(prev => ({
                                                                        ...prev,
                                                                        Select: null
                                                                    }));
                                                                }}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <Input
                                            key={index}
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                            showRules={field.rules}
                                            disabled={editId && field.disableOnEdit}
                                        />
                                    )
                                })}
                            </form>

                            <div className='flex justify-end p-3 border border-gray-200 gap-2 rounded-md'>
                                <button type='submit' form='formData' className='bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-500 transition-colors duration-200'>Guardar</button>
                                <button type='button' className='text-white px-4 py-2 rounded-sm bg-gray-500 hover:bg-gray-400 transition-colors duration-200' onClick={() => toggleMenu("Form")}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            {IsOpen.View && viewData && (
                <>
                    <div className='absolute w-full h-full bg-black opacity-45 inset-0 z-10'></div>

                    <div className='m-4 absolute w-6xl z-200 bg-white border-t-3 border-t-blue-600 shadow-md rounded-md'>

                        <div className='text-lg p-4 border-b border-gray-300'>
                            Detalles
                        </div>

                        <div className='p-4 grid grid-cols-2 gap-4'>

                            {Object.entries(viewData).map(([key, value], index) => {
                                if (key === "createdAt") {
                                    value = value?.toDate().toLocaleDateString();
                                }

                                if (key === "precio") {
                                    value = PriceFormats.COP(value);
                                }

                                return (
                                    <div key={index} className='flex flex-col'>
                                        <span className='text-gray-500 text-sm capitalize'>
                                            {key}
                                        </span>

                                        <span>
                                            {value}
                                        </span>
                                    </div>
                                )
                            })}

                        </div>

                        <div className='flex justify-end p-3 border-t border-gray-200'>
                            <button
                                className='text-white px-4 py-2 rounded-sm bg-gray-500 hover:bg-gray-400'
                                onClick={() =>
                                    setIsOpen(prev => ({
                                        ...prev,
                                        View: false
                                    }))
                                }
                            >
                                Cerrar
                            </button>
                        </div>

                    </div>
                </>
            )}

            <div className='p-5 flex justify-between'>
                <div className="flex items-center gap-2">
                    <span>Mostrar</span>

                    <select
                        className="border rounded-md px-2 py-1 bg-white focus:outline-none "
                        onChange={(e) => {
                            const value = e.target.value === "Full"
                                ? "Full"
                                : Number(e.target.value);

                            setRowsPerPage(value);
                            setCurrentPage(1);
                        }}>
                        <option>5</option>
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
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <div className='p-5 rounded-lg'>
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
                        {paginatedData.length === 0
                            ?
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-5 text-gray-400">
                                    Sin resultados
                                </td>
                            </tr>
                            :
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="even:bg-gray-200 odd:bg-white hover:bg-gray-100 transition-colors duration-200"
                                >
                                    {columns.map((col, colIndex) => {

                                        if (col.identifier === "estado") {
                                            return (
                                                <td key={colIndex} className='px-3 py-2 border-none'>
                                                    <div
                                                        className={`${row[col.identifier] === "activo" ? 'bg-green-500' : 'bg-red-500'} inline-flex px-3 py-1 text-xs font-semibold tracking-widest rounded-md text-white text-center p-2 uppercase`}
                                                    >
                                                        {row[col.identifier]}
                                                    </div>
                                                </td>
                                            )
                                        }

                                        if (col.identifier === "precio") {
                                            return (
                                                <td key={colIndex}>
                                                    {PriceFormats.COP(row[col.identifier])}
                                                </td>
                                            )
                                        }

                                        if (col.identifier === "createdAt") {
                                            return (
                                                <td key={colIndex}>
                                                    {row[col.identifier]?.toDate().toLocaleDateString()}
                                                </td>
                                            )
                                        }

                                        return (
                                            <td key={colIndex} className="px-3 py-2 border-none">
                                                {row[col.identifier]}
                                            </td>
                                        )
                                    })}

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
                                                    onClick={() => {
                                                        setIsOpenRow(IsOpenRow === rowIndex ? null : rowIndex);
                                                        setViewData(row);
                                                        setIsOpen(prev => ({
                                                            ...prev,
                                                            View: true
                                                        }));
                                                    }}
                                                    className="px-2 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer flex gap-2 items-center">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        viewBox="0 0 24 24">
                                                        <g stroke="#33363f" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="3" />
                                                            <path d="M21 12s-1-8-9-8-9 8-9 8" />
                                                        </g>
                                                    </svg>
                                                    Ver Más
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setIsOpenRow(IsOpenRow === rowIndex ? null : rowIndex);
                                                        setFormData(row);
                                                        setEditId(row.id);
                                                        toggleMenu("Form");
                                                    }}
                                                    className="px-2 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer flex gap-2 items-center">

                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" stroke="blue" strokeWidth="2">
                                                            <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
                                                            <path d="M12.5 15.8 22 6.2 17.8 2l-9.5 9.5L8 16z" />
                                                        </g>
                                                    </svg>
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setIsOpenRow(IsOpenRow === rowIndex ? null : rowIndex);
                                                        onDelete(row.id, row.nombre)
                                                    }}
                                                    className="px-2 py-2 hover:bg-gray-100 text-left rounded-md cursor-pointer flex gap-2 items-center">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        stroke="red"
                                                        viewBox="0 0 24 24">
                                                        <path strokeWidth="2" d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                                                    </svg>
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}

                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className='p-5 flex justify-between'>
                    {rowsPerPage !== 'Full'
                        ?
                        <span>
                            showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                        </span>
                        :
                        <span>
                            showing Full entries
                        </span>
                    }
                    <div className='flex items-center'>
                        <button
                            className='border border-gray-300 text-gray-400 px-2 py-1 bg-white hover:bg-gray-100 rounded-tl-sm rounded-bl-sm'
                            disabled={currentPage === 1 || rowsPerPage === 'Full' || paginatedData.length === 0}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            Previous
                        </button>
                        <div className='bg-blue-500 text-white px-2 py-1 border border-blue-500'>
                            <span>
                                {rowsPerPage === 'Full' ? 'Full' : currentPage}
                            </span>
                        </div>
                        <button
                            className='border border-gray-300 text-gray-400 px-2 py-1 bg-white hover:bg-gray-100 rounded-tr-sm rounded-br-sm'
                            disabled={currentPage === totalPages || rowsPerPage === 'Full' || paginatedData.length === 0}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
