import React from 'react';

function Aside() {
    return (
        <aside>    
            <div className="logo_container">
                <img src={require('../media/logo_icon.svg').default} alt="logo_icon"className='logo_icon' />
                <img src={require('../media/TaskWave.svg').default} alt="logo_title" className='logo_title'/>
            </div>
            <div className="file_system">
                
            </div>
        </aside>
    );
}

export default Aside;