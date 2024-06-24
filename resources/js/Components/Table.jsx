import React, { useContext } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ModalContext } from '@/Layouts/AuthenticatedLayout';

function Table({ itemProp, role, type }) {
    const { url } = usePage();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        get,
        reset,
        errors,
    } = useForm({
        id: '',
    });

    const updateSetData = (el) => {
        setData('id', el)
    }

    const { updateModalStatus, modalStatus } = useContext(ModalContext)


    const taskRedirect = e => {
        id = e.target.dataset.id
        post(route('table.get'), {
            id: id,
        })
    }

    const startDate = new Date(itemProp.created_at)
    const endDate = new Date(itemProp.deadline)
    console.log(endDate)

    const currentDay = new Date()

    let deadlineDay = endDate - startDate
    deadlineDay = deadlineDay / 1000 / 60 / 60 / 24

    let nowDay = endDate - currentDay
    nowDay = nowDay / 1000 / 60 / 60 / 24

    const difference = deadlineDay / nowDay

    if (difference <= 1) {
        itemProp.tongle_color = 'red'
    }
    else if (difference >= 1.16 && difference < 4) {
        itemProp.tongle_color = 'yellow'
    }
    else {
        itemProp.tongle_color = 'green'
    }

    return (
        <div className={`table_card ${itemProp.notion ? 'active' : ''}`} >
            <div className={"timing_tab " + itemProp.tongle_color}></div>
            {type == 'home' &&
                <div className="author-container">
                    <img className='profile_icon' src='/media/profile_icon.svg' alt="profile_img" />
                    <h2 className="table_title">{itemProp.manager}</h2>
                </div>
            }
            {type == 'home' &&
                <hr />
            }
            <div className="desc_content">
                <p className="table_text">{itemProp.title}</p>
            </div>
            <hr />
            <div className="date-container">
                <p className="table_deadline">{itemProp.deadline_string}</p>
                {role <= 2 ? (
                    <div className="manipulation_panel">
                        <Link href={route(type + '.' + 'delete')} data={{ 'id': itemProp.id }} method='delete'><div className='delete'></div></Link>
                        <hr />
                        <Link href={url} method='get' data={{ update: itemProp.id }}><div className='edit'></div></Link>
                        <hr />
                        <Link href={route(type + '.getTask')} data={{ 'id': itemProp.id }} method='get'><div className='open' onClick={taskRedirect} data-id={itemProp.id}></div></Link>
                    </div>
                ) : (
                    <div className="manipulation_panel">
                        <Link href={route(type + `.getTask${itemProp.notion ? 'Notion' : ''}`)} data={{ 'id': itemProp.id }} method='get'><div className='open' onClick={taskRedirect} data-id={itemProp.id}></div></Link>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Table;