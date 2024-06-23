import React, { useContext, useEffect, useState } from 'react';
import ProfileBlock from './ProfileBlock';
import { Link, usePage } from '@inertiajs/react';
import { ModalContext } from '@/Layouts/AuthenticatedLayout';
function Header({ user, role }) {
    const { url } = usePage()
    console.log(url)
    const { updateModalStatus, modalStatus } = useContext(ModalContext)
    return (
        <header>
            <div className="function_conteiner">
                <div className="sort_container">
                    <p className="filter_title">Сортировка</p>
                    <div className="sort">
                        {url == '/home' && (
                            <Link href={url} method='get' data={{ order: 'manager' }} data-sort="manager" className="sort_icon"></Link>
                        )}

                        {url == '/home' && (
                            <hr />
                        )}

                        {url == '/home' && (
                            <Link href={url} method='get' data={{ order: 'flag' }} data-sort="flag" className="sort_icon"></Link>
                        )}
                        {url == '/home' && (
                            <hr />
                        )}
                        <Link href={url} method='get' data={{ order: 'created_at' }} data-sort="created_at" className="sort_icon"></Link>
                        <hr />
                        <Link href={url} method='get' data={{ order: 'deadline' }} data-sort="deadline" className="sort_icon"></Link>
                    </div>
                </div>
                {role <= 2 && (

                    <button onClick={!modalStatus ? updateModalStatus : undefined} className="create_button">Создать</button>

                )

                }

            </div>


            <ProfileBlock user={user} />

        </header>
    );
}

export default Header;