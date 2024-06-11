import Aside from '@/Components/Aside';
import Header from '@/Components/Header';
import { React, createContext, useState } from 'react';

export const ModalContext = createContext(false)

export default function Authenticated({ user, role, list, children, type }) {
    const [modalStatus, setModalStatus] = useState(false)
    const updateModalStatus = () => {
        setModalStatus(!modalStatus)
    }

    // aside is open ?
    const [burstOutStatus, setBurstOutStatus] = useState(false)
    function burstOut(e) {
        e.stopPropagation()
        setBurstOutStatus(!burstOutStatus)
    }

    return (
        <div className={!burstOutStatus ? 'layout' : 'layout active'}>
            <Aside type={type} list={list}>
                <svg className='back_aside_arrow' onClick={burstOut} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.08772 24C3.08772 12.4505 12.4505 3.08772 24 3.08772C35.5495 3.08772 44.9123 12.4505 44.9123 24C44.9123 35.5495 35.5495 44.9123 24 44.9123C12.4505 44.9123 3.08772 35.5495 3.08772 24ZM24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM25.0917 13.9259C24.4887 13.323 23.5112 13.323 22.9083 13.9259C22.3054 14.5288 22.3054 15.5063 22.9083 16.1092L29.2552 22.4561H15.0175C14.1649 22.4561 13.4737 23.1473 13.4737 24C13.4737 24.8526 14.1649 25.5439 15.0175 25.5439H29.2552L22.9083 31.8908C22.3054 32.4937 22.3054 33.4712 22.9083 34.0741C23.5112 34.677 24.4887 34.677 25.0917 34.0741L34.0741 25.0917C34.677 24.4888 34.677 23.5112 34.0741 22.9083L25.0917 13.9259Z" fill="#EDEEF0" />
                </svg>
            </Aside>
            <ModalContext.Provider value={{ modalStatus, updateModalStatus }}>
                <Header role={role} user={user} />
                <main className="main_container">{children}</main>
            </ModalContext.Provider>
        </div>
    );
}
