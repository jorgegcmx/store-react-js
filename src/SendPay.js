import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import Alert from '@mui/material/Alert';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SendPay() {
  const [texto, settexto] = useState('');
  const [importe, setimporte] = useState(0);
  const [pais, setpais] = useState('');
  const [telefono, settelefono] = useState(0);


  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  return (
    <>
      <Grid container rowSpacing={1} padding={5}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Alert severity="success">Formulario para solicitud de pago Paypal, solo debe ingresar informacón breve del pedido, y el importe que desea recibir, posteriomente de clic en el icono compartir!</Alert>

          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Información general del pedido"
              multiline
              maxRows={4}
              sx={{ m: 1, minWidth: 300, maxHeight: 300 }}
              onChange={(e) => settexto(utf8_to_b64(e.target.value))}
            />

          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              id="outlined-number"
              label="$ Importe"
              type="number"
              sx={{ m: 1, minWidth: 300 }}
              onChange={(e) => setimporte(e.target.value)}
            />

          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">Pais</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pais}
                label="Pais"
                onChange={(e) => setpais(e.target.value)}
              >
                <MenuItem value={52}>México</MenuItem>
                <MenuItem value={1}>USA</MenuItem>
              </Select>
            </FormControl>

          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TextField sx={{ m: 1, minWidth: 300 }}
              id="outlined-number"
              label="Telefono"
              type="number"
              onChange={(e) => settelefono(e.target.value)}
            />

          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
          >
            <Link href={`https://api.whatsapp.com/send?phone=+${pais}${telefono}&text=Hola, para realiazar el pago de su pedido, Ceramíca Checuan, solo de click en el siguiente link,  https://ceramicachecuan.com/shop%2F%23%2Fpay?texto=${texto}$${importe}&source=&data=&app_absent=https://ceramicachecuan.com/`}>
              <ShareIcon ></ShareIcon >
            </Link>

          </Box>
        </Grid>
      </Grid>
    </>
  );
}