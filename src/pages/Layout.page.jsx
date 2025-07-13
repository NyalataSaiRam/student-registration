import React from 'react';
import Navbar from '../components/Navbar.component';
import { Outlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>




    );
};

export default Layout;