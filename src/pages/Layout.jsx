import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';

function Layout({children}) {
    return (
        <div className='layout'>
            <Aside/>
            <Header/>
            <Outlet className="main_container"/>
        </div>
    );
}

export default Layout;