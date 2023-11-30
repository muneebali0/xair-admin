import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from '../../components/Header/AccountPopover';

export default function AppHeader({ drawerWidth, handleDrawerToggle }) {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
            className="app-header"
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Typography variant="h6" noWrap component="div">
                <AccountPopover />
            </Typography>
        </AppBar>
    )
}
