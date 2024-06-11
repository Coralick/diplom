import React, { useContext } from 'react';
import { Link } from '@inertiajs/react';


export default function Aside({list, children, type = 'home' }) {

    return (
        <aside>
            <div className="logo_container">
                <Link  className="logo_container" href={route('home')}>
                    <img src='../media/logo_icon.svg' alt="logo_icon" className='logo_icon' />
                    <img src='../media/TaskWave.svg' alt="logo_title" className='logo_title' />
                </Link>
                <div className="back_arrow_top-container">
                    {children}
                </div>
            </div>
            <div className="small_aside">
                <div className={"function_aside-container"}>

                        <div className="file_system-container">
                            <div className="file_system_top-container">
                                <svg className='file_system_icon' width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9.23529H25M22.6 21C23.2365 21 23.847 20.7521 24.2971 20.3108C24.7471 19.8696 25 19.2711 25 18.6471V6.88235C25 6.25831 24.7471 5.65983 24.2971 5.21857C23.847 4.77731 23.2365 4.52941 22.6 4.52941H13.12C12.7186 4.53327 12.3227 4.43837 11.9684 4.25339C11.6141 4.06841 11.3128 3.79927 11.092 3.47059L10.12 2.05882C9.90147 1.73349 9.60397 1.46645 9.2542 1.28164C8.90443 1.09684 8.51333 1.00006 8.116 1H3.4C2.76348 1 2.15303 1.2479 1.70294 1.68916C1.25286 2.13042 1 2.7289 1 3.35294V18.6471C1 19.2711 1.25286 19.8696 1.70294 20.3108C2.15303 20.7521 2.76348 21 3.4 21H22.6Z" stroke="#EDEEF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p className="file_system_top-title">Все проекты</p>
                            </div>
                            <div className="file_system-body">
                                {list && list.map((item) => (
                                    <Link href={route(type + '.getTask')} data={{ 'id': item.id }} method='get' className='file_system-item'>
                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 20.5L20 14.3489M20 14.3489L14 8.1979M20 14.3489H1L1 1.5" stroke="#EDEEF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.0909 7.38462H12.7273V0.923077L19.0909 7.38462Z" fill="#EDEEF0" />
                                            <path d="M19.7341 6.73154L13.3705 0.27C13.286 0.184307 13.1857 0.116356 13.0753 0.0700282C12.965 0.0237008 12.8467 -9.50639e-05 12.7273 2.85414e-07H1.81818C1.33597 2.85414e-07 0.873508 0.194505 0.532533 0.540726C0.191558 0.886947 0 1.35652 0 1.84615V22.1538C0 22.6435 0.191558 23.1131 0.532533 23.4593C0.873508 23.8055 1.33597 24 1.81818 24H18.1818C18.664 24 19.1265 23.8055 19.4675 23.4593C19.8084 23.1131 20 22.6435 20 22.1538V7.38462C20.0001 7.26336 19.9767 7.14327 19.931 7.03122C19.8854 6.91916 19.8185 6.81733 19.7341 6.73154ZM13.6364 3.15115L16.8966 6.46154H13.6364V3.15115ZM18.1818 22.1538H1.81818V1.84615H11.8182V7.38462C11.8182 7.62943 11.914 7.86422 12.0844 8.03733C12.2549 8.21044 12.4862 8.30769 12.7273 8.30769H18.1818V22.1538ZM14.5455 12.9231C14.5455 13.1679 14.4497 13.4027 14.2792 13.5758C14.1087 13.7489 13.8775 13.8462 13.6364 13.8462H6.36364C6.12253 13.8462 5.8913 13.7489 5.72081 13.5758C5.55032 13.4027 5.45455 13.1679 5.45455 12.9231C5.45455 12.6783 5.55032 12.4435 5.72081 12.2704C5.8913 12.0973 6.12253 12 6.36364 12H13.6364C13.8775 12 14.1087 12.0973 14.2792 12.2704C14.4497 12.4435 14.5455 12.6783 14.5455 12.9231ZM14.5455 16.6154C14.5455 16.8602 14.4497 17.095 14.2792 17.2681C14.1087 17.4412 13.8775 17.5385 13.6364 17.5385H6.36364C6.12253 17.5385 5.8913 17.4412 5.72081 17.2681C5.55032 17.095 5.45455 16.8602 5.45455 16.6154C5.45455 16.3706 5.55032 16.1358 5.72081 15.9627C5.8913 15.7896 6.12253 15.6923 6.36364 15.6923H13.6364C13.8775 15.6923 14.1087 15.7896 14.2792 15.9627C14.4497 16.1358 14.5455 16.3706 14.5455 16.6154Z" fill="#EDEEF0" />
                                        </svg>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                </div>
                <div className="back_arrow-container">
                    {children}
                </div>
            </div>

        </aside>
    );
}

