import React from 'react';
function Header() {
    const redirectTo = () => {
        window.location.href="/profile"
    }
    return (
        <header>
            <img className='logo' src={require('../media/Logo.svg').default} alt="logo" />
            <div className="profile_container" onClick={redirectTo}>
                <img className='profile_icon' src={require('../media/profile.svg').default} alt="profile_img" />
                <p className="profile_name">Умпа лумпа</p>
            </div>
        </header>
    );
}

export default Header;