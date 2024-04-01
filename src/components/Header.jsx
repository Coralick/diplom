import React, { useState } from 'react';
import ProfileBlock from './ProfileBlock';
function Header() {
   
    // const redirectTo = () => {
    //     window.location.href="/profile"
    // }

    const openCreate = () =>{

    }
   
    return (
        <header>
            <div className="function_conteiner">

                <div className="line-up_container">
                    <p className="filter_title">Вид</p>
                    <div className="line-up">
                        <img src={require('../media/line-up_icon_1.svg').default} alt="line-up" className='line-up_icon'/>
                        <hr />
                        <img src={require('../media/line-up_icon_2.svg').default} alt="line-up" className='line-up_icon'/>
                    </div>
                </div>
                
                <div className="sort_container">
                    <p className="filter_title">Сортировка</p>
                    <div className="sort">
                        <img src={require('../media/profile_icon.svg').default} alt="sort" className='sort_icon'/>
                        <hr />
                        <img src={require('../media/flag.svg').default} alt="sort" className='sort_icon'/>
                        <hr />
                        <img src={require('../media/calendar_icon.svg').default} alt="sort" className='sort_icon'/>
                        <hr />
                        <img src={require('../media/fire.svg').default} alt="sort" className='sort_icon'/>
                    </div>
                </div>

                <button onClick = {openCreate}className="create_button">Создать проект</button>
            </div>
            
            <ProfileBlock/>

        </header>
    );
}

export default Header;