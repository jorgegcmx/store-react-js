import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { Wrapper } from "./Items.styles";
import { SalesContext } from "../Contex/SalesContext";

export default function Items(props) {
    const { item } = props;
    const {
        setCartItems
    } = useContext(SalesContext);

    const handleAddToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.idarticulos === clickedItem.idarticulos);

            if (isItemInCart) {
                return prev.map((item) =>
                    item.idarticulos === clickedItem.idarticulos
                        ? { ...item, stock: item.stock + 1 }
                        : item
                );
            }

            return [...prev, { ...clickedItem, stock: 1 }];
        });
    };

    const handleRemoveFromCart = (idarticulos) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.idarticulos === idarticulos) {
                    if (item.stock === 1) return acc;
                    return [...acc, { ...item, stock: item.stock - 1 }];
                } else {
                    return [...acc, item];
                }
            }, [])
        );
    };

    return (
        <Wrapper>
            <div>
                <h3>{item.nombrearticulo}</h3>
                <div className="buttons">
                    <p>Precio: ${item.precio_menudeo}</p>
                    <p>Cant:</p>
                    <p>Total: <b>${(item.stock * item.precio_menudeo)}</b></p>
                </div>
                <div className="buttons">
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => handleRemoveFromCart(item.idarticulos)}
                    >
                        -
                    </Button>
                    <b>{item.stock}</b>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => handleAddToCart(item)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.img} alt={item.nombrearticulo} />
        </Wrapper>
    );
}


