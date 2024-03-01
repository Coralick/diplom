import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBarAside from '../components/NavBarAside';

function Layout() {
    return (
        <main className='mainContainer'>
            <NavBarAside/>
            <Outlet/>
        </main>
    );
}

export default Layout;