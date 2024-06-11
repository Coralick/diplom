import React from 'react';
import { Link } from '@inertiajs/react';
import ProfileBlock from './ProfileBlock';

export default function SimpleHeader({user}) {
    return (
        <header>
            <Link className="logo_container" href={route('home')}>
                <img src='/media/logo_icon.svg' alt="logo_icon" className='logo_icon' />
                <img src='/media/TaskWave.svg' alt="logo_title" className='logo_title' />
            </Link>
            <ProfileBlock user={user}/>
        </header>
    );
}
