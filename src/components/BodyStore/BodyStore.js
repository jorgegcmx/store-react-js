import React, { useEffect, useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
    getCountrie,
    getProducts,
    savedSale,
    sendPay
} from "../services/services";
import { SalesContext } from "../Contex/SalesContext";
import { Link } from '@mui/material';



export default function BodyStore() {
    const {
        setCartItems,
        setOpenCar,
        venta,
        setcoutrie,
        coutrie,
        setloader
    } = useContext(SalesContext);

    const [productos, setProductos] = useState();
  

    function getAllProducts() {
        getProducts()
            .then((result) => {
                setProductos(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }

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

        setOpenCar(true);

    };

    function Formater(amount) {
        return (amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
    }

    function Save() {
        savedSale(venta).then((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        getAllProducts();
        getCountrie()
            .then((response) => {
                if (response !== '') {
                    setcoutrie(response);
                } else {
                    setcoutrie('MX');
                }
            });
        
        if (venta.transId !== 0) {
            Save();
            console.log(venta);
        }

        if (venta.idPedido !== 0) {
            sendPay(venta).then((e) => {
                console.log(e);
                window.location.href = `https://www.mercadopago.com.mx/checkout/v1/payment/redirect/155e0724-68d3-4431-97dd-3621785cd626/payment-option-form/?preference-id=${e}`;
            }).catch(e => console.log(e)).finally(() => {
                setloader(false);
              });;
        }

    }, [venta]);

    return <>
        <Grid item xs={12}>

            <AppBar position="static" color="transparent">
                <Toolbar>
                    {coutrie === 'US' ? (
                        <>
                            <Avatar alt="envios USA"
                                src="https://ceramicachecuan.com/logo/usa_flag.png"
                                sx={{ mr: 2 }}
                            />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Hacemos envíos a USA
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Avatar alt="envios USA"
                                src="https://ceramicachecuan.com/logo/mx_flag.png"
                                sx={{ mr: 2 }}
                            />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Hacemos envíos a todo México
                            </Typography>
                        </>
                    )}


                </Toolbar>
            </AppBar>

            <Grid container p={4} spacing={2}>
                {productos !== undefined &&
                    productos.map((pro) => (
                        <Grid item md={4} sm={12} key={pro.idarticulos}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={pro.img}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom component="div">
                                        {pro.nombrearticulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {pro.descripcion}
                                    </Typography>
                                    <Typography variant="h4" color="text.primary">
                                        {Formater(parseInt(pro.precio_menudeo, 10))}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon style={{ color: "red" }} />
                                    </IconButton>
                                    <IconButton aria-label="share"
                                        style={{
                                            marginRight: "10px",
                                        }}
                                    >
                                        <Link href="https://www.facebook.com/sharer/sharer.php?u=https://ceramicachecuan.com/">
                                            <ShareIcon />
                                        </Link>
                                    </IconButton>

                                    <Button variant="contained"
                                        onClick={() => handleAddToCart(pro)}
                                        style={{
                                            marginLeft: "10px",
                                            textTransform: "none",
                                            backgroundColor: "#FFC300",
                                            color: "black",
                                            width: "200px",
                                            fontSize: "18px"
                                        }}
                                    >Comprar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <Box display="flex" p={4}>
            </Box>
        </Grid>
    </>;
}
