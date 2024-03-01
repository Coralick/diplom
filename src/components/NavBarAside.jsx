import React from 'react';
import { Link } from "react-router-dom"

function NavBarAside(props) {
    return (
        <aside>
            <Link to={"/profile"}>Профиль</Link>
            <Link to={"/team"}> Команда</Link>
            <Link to={"/settings"}>Настройки</Link>
        </aside>
    );
}

export default NavBarAside;