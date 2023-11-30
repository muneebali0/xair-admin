import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Icon } from "@iconify/react";
import { IconButton, Stack, Typography } from '@mui/material';
import closeFill from "@iconify/icons-eva/close-fill";

export default function ComponentPopup({ openPopup, componentToPassDown, setOpenPopup, title }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        setOpenPopup(false)
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openPopup}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className="mui-component-popup"
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 2 }}
            >
                <h3 className='mui-component-popup-title'>{title}</h3>
                <IconButton className="drawer-cross-icon" onClick={handleClose}>
                    <Icon icon={closeFill} width={20} height={20} />
                </IconButton>
            </Stack>
            <div className='show-component-center'>
                {componentToPassDown}
            </div>

        </Dialog>
    );
}