import React, { useContext } from 'react';
import { ModalContext } from '../pages/Layout';

function Table(itemProp) {
    const url = new URL(window.location.href).pathname.split('/')[1]

    const redirectToTask = e => {
        const id = e.target.dataset.id
        const url = "task/" + id
        window.location.href = url;
    }

    const redirectToDesc = e => {
        const id = e.target.dataset.id
        const url = window.location.href + "/description"
        window.location.href = url;
    }

    const { updateModalToggle } = useContext(ModalContext)
    const { updateModalUpdateId } = useContext(ModalContext)

    const editTable = e => {
        updateModalToggle(true)
        updateModalUpdateId(e.target.dataset.id)
    }

    itemProp = itemProp.itemProp

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
                <img className='profile_icon' src={require('../media/profile_icon.svg').default} alt="profile_img" />
                <h2 className="table_title">{itemProp.manager}</h2>
            </div>
            <hr />
            <div className="desc_content">
                <p className="table_text">{itemProp.title}</p>
            </div>
            <hr />
            <div className="date-container">
                <p className="table_deadline">{itemProp.deadline}</p>
                <div className="manipulation_panel">
                    <div className='manipulation_panel_edit' data-id={itemProp.id} onClick={editTable}></div>
                    <hr />
                    <div className='manipulation_panel_open' data-id={itemProp.id} onClick={url != "task" ? redirectToTask : redirectToDesc}></div>
                </div>
            </div>
        </div>
    );
}

export default Table;