import BackButton from '@/Components/BackButton';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function ProfileLayout({children}) {
    return (
        <>
            <header>
                <Link className="logo_container" href={route('home') } method='get' as="button">
                    <img src='../media/logo_icon.svg' alt="logo_icon" className='logo_icon' />
                    <img src='../media/TaskWave.svg' alt="logo_title" className='logo_title' />
                </Link>
                <BackButton>Назад</BackButton>
            </header>
            <main>{children}</main>
        </>
    );
}

