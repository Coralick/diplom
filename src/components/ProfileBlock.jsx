import React, { useState } from 'react';

function ProfileBlock() {

    const [modalStat, setModalStat] = useState(false);

    const openPorfileModal = () => {
        if(!modalStat){
            setModalStat(true)
        }
        else{
            setModalStat(false)
        }
    }
    const exitHandler = () => {
        window.location.href = '/input'
    }

    return (
        <div className={modalStat ? "profile_container active" : "profile_container"} onClick={openPorfileModal}>

                <img className='profile_icon' src={require('../media/profile_icon.svg').default} alt="profile_img" />
                <p className="profile_name">Константин</p>
                <img src={require('../media/open_arrow.svg').default} alt="open_arrow" className={modalStat ? "open_arrow active": "open_arrow"} />
                {/* modal block*/}
                <div className={modalStat ? "profileModal active" : "profileModal"}>

                        <div className="profileTab">
                            <img src={require('../media/gear.svg').default} alt="profile_tab_icon" className="profile_tab_icon" />
                            <p className="profile_tab_title">Настройки</p>
                        </div>

                        <div className="profileTab">
                            <img src={require('../media/mech_key.svg').default} alt="profile_tab_icon" className="profile_tab_icon" />
                            <p className="profile_tab_title">Админ панель</p>
                        </div>

                        <div className="profileTab" onClick={exitHandler}>
                            <img src={require('../media/exit_icon.svg').default} alt="profile_tab_icon" className="profile_tab_icon" />
                            <p className="profile_tab_title">Выход</p>
                        </div>
                </div>
            </div>
    );
}

export default ProfileBlock;