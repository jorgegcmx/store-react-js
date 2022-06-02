import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImagenFull(props) {

    const { open, src, handleClose } = props;

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"

                >
                    <Box

                        component="img"
                        sx={{

                            maxHeight: { xs: 800, md: 800 },
                            maxWidth: { xs: 800, md: 800 },
                        }}
                        alt={src}
                        src={src}
                    />
                </Box>
            </Dialog>
        </div>
    );
}

