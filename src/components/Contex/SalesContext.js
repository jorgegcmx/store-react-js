import React, { createContext, useState } from "react";

export const SalesContext = createContext();

const ventas = {
    total: 0,
    idcliente: 0,
    datos_envio: "",
    email_cliente: "",
    transId: 0,
    status: "",
    idPedido: 0,
    shipping_cost: {
        us: 2500,
        mx: 400
    },
    carrito: []
}

export const SalesContextProvider = ({ children }) => {
    const [coutrie, setcoutrie] = useState('');
    const [openCar, setOpenCar] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [venta, setVenta] = useState(ventas);
    const [loader, setloader] = useState(false);

    return (
        <SalesContext.Provider value={{
            coutrie,
            setcoutrie,
            openCar,
            setOpenCar,
            cartItems,
            setCartItems,
            venta,
            setVenta,
            loader,
            setloader
        }}>
            {children}
        </SalesContext.Provider>
    )
}