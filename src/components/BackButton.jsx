import React from 'react';

function BackButton({children}) {
    const url = new URL(window.location.href).pathname.split('/')[1]
    console.log(url)
    return (
        <button className='back_button' onClick="">
            <img src={require('../media/arrow.svg').default} alt="" />
            {children}
        </button>
    );
}

export default BackButton;