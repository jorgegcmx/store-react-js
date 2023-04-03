import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Slide from '@mui/material/Slide';
import { SalesContext } from "../Contex/SalesContext";
import Items from "../Items/Items"
import { Alert, AlertTitle, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useStateWithDep } from '../customHooks/ReloadEffect';

import {
  savedSale
} from "../services/services";
import BodyStore from '../BodyStore/BodyStore';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));


const ItemOrden = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  paddingLeft: '10px',
  color: theme.palette.text.primary,
}));


export default function CarStore() {


  const {
    openCar,
    setOpenCar,
    cartItems,
    venta,
    setVenta,
    coutrie,
    loader,
    setloader
  } = useContext(SalesContext);

  const [open, setopen] = useState(false);
  const [openOptionPayment, setopenOptionPayment] = useState(false);
  const [openOptionPaymentMX, setopenOptionPaymentMX] = useState(false);

  const [reload, setReload] = useStateWithDep(venta);

  const datosSend = {
    nombre: "",
    email: "",
    telefono: "",
    estado: "",
    municipio: "",
    calle: "",
    numero: "",
    codigo: "",
  }

  const [infotoSend, setinfotoSend] = useState(datosSend);
  const [validate, setValidate] = useState(false);
  const [showGetData, setshowGetData] = useState(true);


  function handleClose() {
    setOpenCar(false);
    setValidate(false);
  };

  const handleCloseForm = () => {
    setopen(false);
    setopenOptionPayment(false);
    setinfotoSend({
      ...infotoSend,
      nombre: "",
      email: "",
      telefono: "",
      estado: "",
      municipio: "",
      calle: "",
      numero: "",
      codigo: "",
    });
    setshowGetData(true);
    setValidate(false);
    setopenOptionPayment(false);
    setopenOptionPaymentMX(false);
  };

  const handleOpen = () => {
    setopen(true);
  };

  function calculateSubTotal(items) {
    return items.reduce((acc, item) => acc + item.stock * item.precio_menudeo, 0);
  }

  async function valida() {
    let val = 0;
    for (const property in infotoSend) {
      if (infotoSend[property].length === 0) {
        val = val + 1;
      }
    }
    return await val;
  }

  function Formater(amount) {
    return (amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
  }




  function getIdTransaccion(id, status) {
    setVenta({
      ...venta,
      transId: id,
      status: status,
      carrito: cartItems,
      total: coutrie === 'MX' ? calculateSubTotal(cartItems) + venta.shipping_cost.mx : coutrie === 'CA' ? calculateSubTotal(cartItems) + venta.shipping_cost.ca : calculateSubTotal(cartItems) + venta.shipping_cost.us,
      datos_envio: infotoSend,
      email_cliente: infotoSend.email
    });
  }

  function addSetventa() {
    setVenta({
      ...venta,
      carrito: cartItems,
      total: coutrie === 'MX' ? calculateSubTotal(cartItems) + venta.shipping_cost.mx : coutrie === 'CA' ? calculateSubTotal(cartItems) + venta.shipping_cost.ca : calculateSubTotal(cartItems) + venta.shipping_cost.us,
      datos_envio: infotoSend,
      email_cliente: infotoSend.email,
    });
  }


  function ShowOptionsPay() {
    valida().then((res) => {
      if (res === 0) {
        setValidate(false);
        addSetventa();
        if (coutrie === 'US') {
          setopenOptionPayment(true);
        } else {
          setopenOptionPaymentMX(true);
          addSetventa();
        }
        setshowGetData(false);
      } else {
        setValidate(true);
      }
    }).catch((e) => {
      console.log(e);
    });
  }


  function PayMercado() {
    setloader(true);
    savedSale(venta).then((response) => {
      // console.log(response.pedidoId);
      if (response.pedidoId !== "") {
        setVenta({
          ...venta,
          idPedido: response.pedidoId
        });
      }
    }).catch(e => console.log(e));
  }

  const initialOptions = {
    "client-id": "AWpWjA2Jn3e0AI-05l65-p2pAJ-Fi21seloumeQeDfobns-TUUw25pQ6onGAM9R8BZb0Dpe2MWzZW1x5",
    currency: "MXN",
    intent: "capture",
  };
  //ATgNBVuCxrIqYtuaj-FO70_TN4A_AKmSaPxb4cjd5UFyohojKUPNz4K7vQrHwgyPrVglnIblVCNMSDFJ

  return (
    <div>
      <Dialog
        fullScreen
        open={openCar}
        onClose={handleClose}
        TransitionComponent={Transition}

      >

        <Grid container spacing={1} style={{ backgroundColor: '#EDEDED',paddingBottom:'40px' }}>
          {cartItems.length === 0 ? (
            <Grid item md={12} xs={12}>
              <Item>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  edge="start"
                  startIcon={<SettingsBackupRestoreIcon />}
                  style={{
                    marginRight: "10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textTransform: "none",
                    backgroundColor: "#E3E6E6",
                    color: "black",
                  }}
                  size="large"
                >
                  Seguir comprando
                </Button>
              </Item>
            </Grid>
          ) : null}

          {cartItems.length !== 0 ? (
            <>
              <Grid item md={12} xs={12}  >
                <Item>
                  <Alert severity="success"
                    style={{
                      marginRight: "5px"
                    }}>

                    <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
                      Estas apunto de adquirir piezas unícas!, ademas puedes pagar a
                      3 meses sin intereses, en pagos con tarjeta.
                    </Typography>

                  </Alert>
                </Item>
              </Grid>
              <Grid item md={12} xs={12} >
                <Item>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    edge="start"
                    startIcon={<SettingsBackupRestoreIcon />}
                    style={{
                      marginRight: "10px",
                      marginTop: "5px",
                      marginBottom: "5px",
                      textTransform: "none",
                      backgroundColor: "#FFD814",
                      color: "black",
                    }}
                    size="large"
                  >
                    Seguir comprando
                  </Button>
                </Item>
              </Grid>
              <Grid item md={6} xs={12}>
                <ItemOrden>
                <Alert severity="info"
                    variant="outlined"
                    style={{
                      marginRight: "5px",
                      marginBottom:"5px"
                    }}>
                    <strong>Piezas en tu carrito</strong>
                  </Alert>
                  {cartItems.map((item) => (
                    <Items
                      key={item.idarticulos}
                      item={item}
                    />
                  ))}
                </ItemOrden>
              </Grid>
              <Grid item md={6} xs={12}>
                <ItemOrden>
                  <Alert severity="info"
                    variant="outlined"
                    style={{
                      marginRight: "5px"
                    }}>
                    <strong>Resumen de tu compra!</strong>
                  </Alert>
                  <List
                    sx={{ maxWidth: 360, bgcolor: 'background.paper', padding: '0px', margin: '0px' }}
                  >
                    <ListItem disablePadding={true}>
                      <ListItemText primary="SubTotal:" />
                      <b>{Formater(calculateSubTotal(cartItems))}</b>
                    </ListItem>
                    <ListItem disablePadding={true}>
                      <ListItemText primary="Costo de envío:" />
                      {coutrie === 'MX' ? (<b>{Formater(venta.shipping_cost.mx)}</b>) : null}
                      {coutrie === 'CA' ? (<b>{Formater(venta.shipping_cost.ca)}</b>) : null}
                      {coutrie === 'USA' ? (<b>{Formater(venta.shipping_cost.us)}</b>) : null}
                    </ListItem>
                    <ListItem disablePadding={true}>
                      <ListItemText primary="Total:" />
                      <h3><b>{
                        coutrie === 'MX' ?
                          Formater(calculateSubTotal(cartItems) + venta.shipping_cost.mx)
                          :
                          coutrie === 'CA' ?
                            Formater(calculateSubTotal(cartItems) + venta.shipping_cost.ca)
                            :
                            Formater(calculateSubTotal(cartItems) + venta.shipping_cost.us)
                      }</b></h3>
                    </ListItem>
                  </List>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    edge="start"
                    endIcon={<LocalShippingIcon />}
                    style={{
                      fontSize: "15px",
                      width: "300px",
                      textTransform: "none",
                      marginTop: "5px",
                      marginBottom: "5px",
                      backgroundColor: "#2968C8",
                      color: "white",
                    }}
                    size="large"
                  >
                    Continuar con la compra
                  </Button>
                </ItemOrden>
              </Grid>
            </>
          ) : null}
        </Grid>

        {cartItems.length === 0 ? (<Alert severity="info">
          <AlertTitle>Información</AlertTitle>
          <strong>Tú carrito esta vacío!</strong>
        </Alert>) : (<>

        </>)}

        {/* <BodyStore></BodyStore>*/}
      </Dialog>
      <Dialog open={open} >
        <DialogTitle>
          <Button onClick={handleCloseForm}
            variant="contained"
            style={{
              marginRight: "10px",
              backgroundColor: "#040404"
            }}
            startIcon={<CloseRoundedIcon />}
          />

          {coutrie === 'MX' ? (
            <>
              {openOptionPaymentMX ? ('') : ('Continuar con la compra')}

            </>
          ) : (
            <>
              {!openOptionPayment ? ('continue shopping') : ('Payment methods available for: ')} {coutrie}
            </>
          )}

        </DialogTitle>
        <DialogContent>
          {showGetData ? (
            <>
              <TextField
                error={infotoSend.nombre.length === 0 ? true : false}
                margin="dense"
                label="Nombre completo *"
                type="text"
                fullWidth
                variant="standard"
                name="nombre"
                onChange={(e) => setinfotoSend({ ...infotoSend, nombre: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.email.length === 0 ? true : false}
                margin="dense"
                label="Email "
                type="email *"
                fullWidth
                variant="standard"
                name="email"
                onChange={(e) => setinfotoSend({ ...infotoSend, email: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.telefono.length === 0 ? true : false}
                margin="dense"
                label="Telefono *"
                type="number"
                fullWidth
                variant="standard"
                name="telefono"
                onChange={(e) => setinfotoSend({ ...infotoSend, telefono: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.estado.length === 0 ? true : false}
                margin="dense"
                label="Estado *"
                type="text"
                fullWidth
                variant="standard"
                name="estado"
                onChange={(e) => setinfotoSend({ ...infotoSend, estado: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.municipio.length === 0 ? true : false}
                margin="dense"
                label="Municipio o Localidad *"
                type="text"
                fullWidth
                variant="standard"
                name="municipio"
                onChange={(e) => setinfotoSend({ ...infotoSend, municipio: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.calle.length === 0 ? true : false}
                margin="dense"
                label="Calle *"
                type="text"
                fullWidth
                variant="standard"
                name="calle"
                onChange={(e) => setinfotoSend({ ...infotoSend, calle: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.numero.length === 0 ? true : false}
                margin="dense"
                label="Numero int o ext *"
                type="number"
                fullWidth
                variant="standard"
                name="numero"
                onChange={(e) => setinfotoSend({ ...infotoSend, numero: e.target.value.trim() })}
              />
              <TextField
                error={infotoSend.codigo.length === 0 ? true : false}
                margin="dense"
                label="Codigo Postal *"
                type="number"
                fullWidth
                variant="standard"
                name="codigo"
                onChange={(e) => setinfotoSend({ ...infotoSend, codigo: e.target.value.trim() })}
              />

              <Button
                onClick={ShowOptionsPay}
                variant="contained"
                edge="start"
                startIcon={<CreditCardIcon />}
                style={{
                  width: "250px",
                  marginTop: "5px",
                  marginBottom: "5px",
                  textTransform: "none",
                  backgroundColor: "#FFC300",
                  color: "black",
                }}
              >
                Continuar con el Pago
              </Button>

            </>
          ) : null}


          {validate ? (
            <Alert severity="error"
              style={{
                marginRight: "5px"
              }}>
              <strong>Todos lo campos son obligatorios!</strong>
            </Alert>
          ) : (
            <>
              {
                openOptionPayment ? (
                  <>
                    <PayPalScriptProvider options={initialOptions} >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: venta.total,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            const id = details.id;
                            const status = details.status;
                            getIdTransaccion(id, status);
                            alert(`Tú Compra se proceso correctamente: ${name} recibiras un correo con los datos`);
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </>
                ) : null}

              {openOptionPaymentMX ? (
                <Button
                  onClick={PayMercado}
                  style={{
                    width: "300px",
                    marginTop: "5px",
                    marginBottom: "5px",
                    textTransform: "none",
                    backgroundColor: "#009EE3",
                    color: "white",
                    fontSize: "14px"
                  }}
                  disabled={loader}
                >Mostra Opciones de Pago&nbsp; &nbsp;
                  {loader ? (<CircularProgress color="inherit" />) : null}
                </Button>
              ) : null}
            </>
          )}

          {
            // <pre>{JSON.stringify({ venta }, null, 2)}</pre>
          }
        </DialogContent>
      </Dialog >
    </div >
  );
}
