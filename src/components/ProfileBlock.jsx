import React, { useContext, useEffect, useState } from 'react';
import { getCookie } from '../App';
import { Link } from 'react-router-dom';
import { DataContext } from '../pages/Layout';
import axios from 'axios';

function ProfileBlock() {

    const [modalStat, setModalStat] = useState(false);
    const [userName, setUserName] = useState('')
    const http = axios.create({
        baseURL: 'https://cf06014.tw1.ru/',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/json',
        },
    })
    const openPorfileModal = () => {
        if (!modalStat) {
            setModalStat(true)
        }
        else {
            setModalStat(false)
        }
    }

    useEffect(() => {

        http.get('api/user?id=' + getCookie('user_id'))
            .then(res => {
                if (res.data.status) {
                    setUserName(res.data.user_name)
                }
                else {
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            });

    }, [])

    const exitHandler = () => {
        document.cookie = "user_id=" + "" + "; max-age=0; path=/"
        window.location.href = '/'
    }

    return (
        <div className={modalStat ? "profile_container active" : "profile_container"} onClick={openPorfileModal}>

            <img className='profile_icon' src={require('../media/profile_icon.svg').default} alt="profile_img" />
            <p className="profile_name">{userName}</p>
            <img src={require('../media/open_arrow.svg').default} alt="open_arrow" className={modalStat ? "open_arrow active" : "open_arrow"} />
            {/* modal block*/}
            <div className={modalStat ? "profileModal active" : "profileModal"}>

                <Link to={'settings'} className="profileTab">
                    <img src={require('../media/gear.svg').default} data-url="settings" alt="profile_tab_icon" className="profile_tab_icon" />
                    <p className="profile_tab_title">Настройки</p>
                </Link>

                <Link to={'profile'} className="profileTab">
                    <img src={require('../media/mech_key.svg').default} alt="profile_tab_icon" className="profile_tab_icon" />
                    <p className="profile_tab_title">Личная панель</p>
                </Link>

                <div className="profileTab" onClick={exitHandler}>
                    <img src={require('../media/exit_icon.svg').default} alt="profile_tab_icon" className="profile_tab_icon" />
                    <p className="profile_tab_title">Выход</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileBlock;