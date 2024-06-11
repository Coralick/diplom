import React, { useContext } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ModalContext } from '@/Layouts/AuthenticatedLayout';

function Table({ itemProp, role, type }) {
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

    const editTable = e => {
        const id = e.target.dataset.id
        console.log(id)
        if (type == 'home') {
            const url = '/' + type + + '?change-id=' + id
        }
        else {
            const url = '/home/' + type + '?id=' + itemProp.table_id + '&change-id=' + id
        }

        get(url)
        // updateModalStatus()
    }

    function deleteItem(id) {
        setData(itemProp.id)
        console.log(data)
        // updateSetData(id)
        if (id) {
            const url = type + '.' + 'delete'
            destroy(route(url))
        }
    }

    const taskRedirect = e => {
        id = e.target.dataset.id
        post(route('table.get'), {
            id: id,
        })
    }

    const startDate = new Date(itemProp.created_at)
    const endDate = new Date(itemProp.deadline)
    const currentDay = new Date()

    let deadlineDay = endDate - startDate
    deadlineDay = deadlineDay / 1000 / 60 / 60 / 24

    let nowDay = endDate - currentDay
    nowDay = nowDay / 1000 / 60 / 60 / 24

    const difference = deadlineDay / nowDay

    if (difference < 1) {
        itemProp.tongle_color = 'red'
    }
    else if (difference > 2 && difference < 4) {
        itemProp.tongle_color = 'yellow'
    }
    else {
        itemProp.tongle_color = 'green'
    }

    return (
        <div className="table_card" >
            <div className={"timing_tab " + itemProp.tongle_color}></div>
            <div className="author-container">
                <img className='profile_icon' src='/media/profile_icon.svg' alt="profile_img" />
                <h2 className="table_title">{itemProp.manager}</h2>
            </div>
            <hr />
            <div className="desc_content">
                <p className="table_text">{itemProp.title}</p>
            </div>
            <hr />
            <div className="date-container">
                <p className="table_deadline">{itemProp.deadline}</p>
                {role <= 2 ? (
                    <div className="manipulation_panel">
                        <Link href={route(type + '.' + 'delete')} data={{ 'id': itemProp.id }} method='delete'><div className='delete'></div></Link>
                        <hr />
                        <Link href={'/' + type + '?id=' + itemProp.id} method='get'><div className='edit' data-id={itemProp.id}></div></Link>
                        <hr />
                        <Link href={route(type + '.getTask')} data={{ 'id': itemProp.id }} method='get'><div className='open' onClick={taskRedirect} data-id={itemProp.id}></div></Link>
                    </div>
                ) : (
                    <div className="manipulation_panel">
                        <Link href={route(type + '.getTask')} data={{ 'id': itemProp.id }} method='get'><div className='open' onClick={taskRedirect} data-id={itemProp.id}></div></Link>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Table;