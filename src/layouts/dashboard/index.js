import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { styled } from '@mui/material/styles';

const drawerWidth = 260;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 65;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});


const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}));

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login"> </Navigate>;
    }

    return (
        <RootStyle>
            <AppHeader drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <AppSidebar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    )
}
