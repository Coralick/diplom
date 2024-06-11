import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

function ProfileBlock({user}) {

    const [modalStat, setModalStat] = useState(false);

    const openPorfileModal = () => {
            setModalStat(!modalStat)
    }

    return (
        <div className={modalStat ? "profile_container active" : "profile_container"} onClick={openPorfileModal}>

            <img className='profile_icon' src='/media/profile_icon.svg' alt="profile_img" />
            <p className="profile_name">{user.name}</p>
            <img src='/media/open_arrow.svg' alt="open_arrow" className={modalStat ? "open_arrow active" : "open_arrow"} />
            {/* modal block*/}
            <div className={ `profileModal ${modalStat ?  'active' : ''} `}>

                <Link href={route('profile.edit')} method='get' className="profileTab">
                    <img src='/media/mech_key.svg' alt="profile_tab_icon" className="profile_tab_icon" />
                    <p className="profile_tab_title">Личная панель</p>
                </Link>

                <Link href={route('logout')} method="post" className="profileTab">
                    <img src='/media/exit_icon.svg' alt="profile_tab_icon" className="profile_tab_icon" />
                    <p className="profile_tab_title">Выход</p>
                </Link>
            </div>
        </div>
    );
}

export default ProfileBlock;