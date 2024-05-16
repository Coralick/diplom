import React from 'react';
import { useParams } from 'react-router-dom';

function BackButton({children}) {
    const url = new URL(window.location.href).pathname.split('/')[1]
    const id = useParams()
    const redirectTo = () => {
        window.location.href = "/task/" + id.id;    
    }
    console.log(url)
    return (
        <button className='back_button' onClick={redirectTo}>
            <img src={require('../media/arrow.svg').default} alt="" />
            {children}
        </button>
    );
}

export default BackButton;