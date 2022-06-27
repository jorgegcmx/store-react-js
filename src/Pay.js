import { React, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useQueryParams } from './components/Hooks/useQueryParams';


export default function Pay() {
    const query = useQueryParams();
    const [importe, setimporte] = useState(0);
    const [desripcion, setdesripcion] = useState('');
    const [comision, setdcomision] = useState(0);
    const [total, settotal] = useState(0);

    const initialOptions = {
        "client-id": "AWpWjA2Jn3e0AI-05l65-p2pAJ-Fi21seloumeQeDfobns-TUUw25pQ6onGAM9R8BZb0Dpe2MWzZW1x5",
        currency: "MXN",
        intent: "capture",
    };

    function isObjEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }

        return true;
    }

    function b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    useEffect(() => {

        if (!isObjEmpty(query)) {
            console.log("MDR el cliente id es ", query)
            const params = query;
            let texto = params.split('$');
            setdesripcion(b64_to_utf8(texto[0]));
            setimporte(texto[1])
            setdcomision(texto[1] * 0.10)
            settotal(new Number(texto[1]) + (new Number(texto[1] * 0.10)));

        }

    }, [query]);

    return (
        <>
            <Grid container padding={5}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Alert severity="success">{desripcion}!</Alert>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <List
                            sx={{ bgcolor: 'background.paper' }}
                            aria-label="contacts"
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText secondary={`Importe del pedido: $${importe}`} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText secondary={`Comisión Paypal: $${comision}`} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={`Importe total a pagar: $${total}`} />
                                </ListItemButton>
                            </ListItem>
                        </List>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        paddingTop={3}
                    >
                        <PayPalScriptProvider options={initialOptions} >
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                description: desripcion,
                                                amount: {
                                                    value: total,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const name = details.payer.name.given_name;
                                        alert(`Gracias por tu compra: ${name}, segiremos en contacto para dar seguimiento a tu pedido`);
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}