import { useState, useEffect } from "react";
import { PriceFormats } from "../../utils/priceFormats";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function PointOfSale({ firestore, usuario, toggleMenu }) {

    const [productos, setproductos] = useState([]);

    const { preferences } = useOutletContext();

    const navigate = useNavigate();

    useEffect(() => {
        const unSubscribe = onSnapshot(collection(firestore, 'Productos'), (snapshot) => {
            const productos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setproductos(productos);
        });

        return () => unSubscribe();

    }, [firestore]);

    const [cartItem, setCartItem] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [payment, setPayment] = useState("Efectivo");
    const [orderNum, setOrderNum] = useState(1);
    const [bag, setBag] = useState(false);

    const sub = cartItem.reduce((acc, item) => acc + item.precio * item.qty, 0);
    const disc = Math.min(100, Math.max(0, isNaN(discount) ? 0 : discount));
    const iva = sub * 0.19;
    const afterDisc = sub - (sub * disc / 100);
    const bagCost = bag ? 50 : 0;
    const total = afterDisc + iva + bagCost;

    const addToCart = (p) => {
        setCartItem((prev) => {
            const exist = prev.find(item => item.id === p.id);

            if (exist) {
                if (exist.qty >= p.stock) {
                    Swal.fire({
                        icon: "error",
                        title: "Stock insuficiente",
                        text: `Solo quedan ${p.stock} unidades disponibles`,
                    });
                    return prev;
                }
                return prev.map(item =>
                    item.id === p.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...p, qty: 1 }];
        });
    };

    const saveSale = async () => {
        const venta = {
            fecha: serverTimestamp(),
            vendedorId: usuario?.uid || null,
            metodoPago: payment,

            items: cartItem.map(item => ({
                productoId: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.qty,
                subtotal: item.precio * item.qty
            })),

            subtotal: sub,
            descuento: disc,
            iva: iva,
            bolsa: bagCost,
            total: total,
        };

        await addDoc(collection(firestore, "Ventas"), venta);
    };

    const processPayment = async () => {
        try {
            await saveSale();

            setCartItem([]);
            setDiscount(0);
            setOrderNum((n) => n + 1);
            Swal.fire({
                icon: "success",
                title: "Pago procesado",
                text: "Todo salió bien",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: error.message,
            });
        }
    };

    const paymentMethods = [
        { label: "Efectivo", value: "Efectivo" },
        { label: "Tarjeta", value: "Tarjeta" },
        { label: "Nequi", value: "Nequi" },
    ];

    const confirmPay = () => {
        Swal.fire({
            title: "Confirmar pago",
            text: `Total: ${PriceFormats.COP(total)}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                processPayment();
            }
        });
    };

    const confirmExit = () => {
        Swal.fire({
            title: "¿Salir del Punto de Venta?",
            text: "Se reiniciaran datos de la orden actual",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Salir",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/Ventas/historial');
                toggleMenu('sidebar');
                toggleMenu('header');
            }
        });
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-[1fr_340px] min-h-svh border border-gray-200 overflow-hidden bg-white">

                <div className="flex flex-col gap-3 p-4 bg-gray-50">

                    <div className="-mx-4 -mt-4 px-4 py-5 flex justify-between items-center bg-white border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 active:scale-95" onClick={() => confirmExit()} title="Regresar">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-semibold">
                                {usuario?.nombre?.slice(0, 2).toUpperCase() || "US"}
                            </div>
                            <div>
                                <p className="text-[15px] font-medium text-gray-800">{usuario?.nombre || "Usuario"}</p>
                                <p className="text-[13px] text-gray-400">
                                    {new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />

                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 rounded-full text-xs text-white border"
                            style={{ backgroundColor: preferences.theme.headerColor, borderColor: preferences.theme.headerColor || "#155dfc" }}
                        >
                            Todos
                        </button>
                        <button className="px-3 py-1 rounded-full text-xs bg-white text-gray-500 border border-gray-200">
                            Categoría
                        </button>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 items-start">
                        {productos.map((p) => (
                            <div
                                onClick={() => addToCart(p)}
                                key={p.id}
                                className="flex flex-col gap-1.5 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-95"
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs font-medium text-gray-800 leading-snug">
                                        {p.nombre}
                                    </span>
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: preferences.theme.headerColor || "#155dfc" }}
                                    >
                                        {PriceFormats.COP(p.precio)}
                                    </span>
                                    <span className="text-[11px] text-gray-400">
                                        Stock: {p.stock}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col border-l border-gray-200 bg-white">

                    <div className="flex justify-between items-center px-4 py-3.5 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-800">
                            Orden #{orderNum}
                        </span>
                        <button
                            onClick={() => setCartItem([])}
                            className="text-xs text-red-500 px-2 py-1 rounded-md hover:bg-red-50"
                        >
                            Vaciar
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 max-h-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {cartItem.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-2">
                                <span className="text-3xl">Agrega productos</span>
                            </div>
                        ) : (
                            cartItem.map((item) => (
                                <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                    <div className="flex-1 min-w-0 ml-3">
                                        <p className="text-xs font-medium text-gray-800 truncate">{item.nombre}</p>
                                        <p className="text-[11px] text-gray-500">
                                            {PriceFormats.COP(item.precio)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => {
                                                setCartItem(prev =>
                                                    prev.map(p =>
                                                        p.id === item.id
                                                            ? { ...p, qty: Math.max(0, p.qty - 1) }
                                                            : p
                                                    ).filter(p => p.qty > 0)
                                                );
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-200 bg-white text-gray-700 text-sm flex items-center justify-center"
                                        >
                                            −
                                        </button>

                                        <span className="text-sm font-medium w-5 text-center text-gray-800">
                                            {item.qty}
                                        </span>

                                        <button
                                            onClick={() => {
                                                setCartItem(prev =>
                                                    prev.map(p =>
                                                        p.id === item.id
                                                            ? { ...p, qty: p.qty + 1 }
                                                            : p
                                                    )
                                                );
                                            }}
                                            className="w-5 h-5 rounded-full border border-gray-200 bg-white text-gray-700 text-sm flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="text-xs font-medium text-gray-800 min-w-13 text-right">
                                        {PriceFormats.COP(item.precio * item.qty)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-1.5">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>{PriceFormats.COP(sub)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Descuento</span>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={discount}
                                    disabled={cartItem.length === 0}
                                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                    className="w-12 px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none focus:border-blue-400"
                                />
                                <span className="text-xs text-gray-400">%</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>IVA (19%)</span>
                            <span>{PriceFormats.COP(iva) || "0"}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Facturar Bolsa?</span>
                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    disabled={cartItem.length === 0}
                                    checked={bag}
                                    onChange={(e) => setBag(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between text-base font-semibold text-gray-900 mt-1 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>{PriceFormats.COP(total) || "0"}</span>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-1.5">
                            {paymentMethods.map((m) => (
                                <button
                                    key={m.value}
                                    onClick={() => setPayment(m.value)}
                                    className={`py-1.5 text-[11px] rounded-lg border transition-all ${payment === m.value
                                        ? "border-blue-500 bg-blue-50 text-blue-800 font-medium"
                                        : "border-gray-200 bg-gray-50 text-gray-500"
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => confirmPay()}
                            disabled={cartItem.length === 0}
                            className="w-full py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                        >
                            Cobrar {PriceFormats.COP(total) || "0"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}