import React from 'react';

function BackButton({children}) {
    const back = () => {
        history.back()
    }
    return (
        <button className='back_button' onClick={back}>
            <img src='/media/arrow.svg' alt="arrow" />
            {children}
        </button>
    );
}

export default BackButton;