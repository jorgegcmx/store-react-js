import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import CarStore from '../CarStore/CarStore';
import { SalesContext } from "../Contex/SalesContext";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));




export default function NavBar(props) {
    const { color } = props;
    const {
        setOpenCar,
        cartItems
    } = useContext(SalesContext);


    function openSalesCar() {
        setOpenCar(true);
    }

    const getTotalItems = (items) => items.reduce((acc, item) => acc + item.stock, 0);

    return <>
        <AppBar position="static" color={color}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 2 }}
                >
                    <Avatar alt="Travis Howard"
                        src="https://ceramicachecuan.com/logo/checuan.jpg"
                        sx={{ width: 50, height: 50 }}
                    />
                </Typography>

                <div>
                    <IconButton aria-label="cart" onClick={openSalesCar} >
                        <StyledBadge badgeContent={getTotalItems(cartItems)} color="error">
                            <ShoppingCartIcon sx={{ fontSize: 40 }} style={{ color: "F8F9FA" }}/>
                        </StyledBadge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <CarStore />
    </>;
}
