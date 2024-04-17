
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



function TaskBoard() {
    let [task, setTask] = useState([])
    let id = useParams()
    console.log(id)
    const http = axios.create({
        baseURL: 'http://diplomapi.test/',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/json',
        },
    })

    const redirectToTask = (e) => {
        const id = e.target.dataset.id
        const url = "/taskboard/subtask/" + id
        window.location.href=url;
    }
    const editTask = e => {
        const id = e.target.dataset.id
        console.log(id)
    }

    useEffect(() => {
        http.get('api/task?id=' + id.id)
            .then(res => {
                // Обработка успешного ответа
                setTask(res.data.task)
                console.log(res.data);
                console.log(task)

            })
            .catch(err => {
                // Обработка ошибки
                console.log(err);
            });
    }, [])


    return (
        <main>
            <div className="taskboard_header">
                <div className="status_tab agreement">Согласование</div>
                <div className="status_tab work">В работе</div>
                <div className="status_tab check">Проверка</div>
                <div className="status_tab done">Выполнено </div>
            </div>
            <div className="task_container">
                <div className="status_tab-container agreement">
                {task && task.map(item => 
                        item.stage === '1' && (
                        <div className="table_card" id={item.id} onClick={redirectToTask}>
                            <div className="author-container">
                                <img className='profile_icon' src={require('../../media/profile_icon.svg').default} alt="profile_img" />
                                <h2 className="table_title">{item.title}</h2>
                            </div>
                            <hr />
                            <div className="desc_content">
                                <p className="table_text">{item.content}</p>
                            </div>
                            <hr />
                            <div className="date-container">
                                <p className="table_deadline">{item.deadline}</p>
                                <div className="manipulation_panel">
                                <div className='manipulation_panel_edit' data-id = {item.id} onClick={editTask}></div>
                                    <hr />
                                <div className='manipulation_panel_open' data-id = {item.id} onClick={redirectToTask}></div>
                            </div>
                            </div>
                            
                        </div>)
                            
                        )
                    }

                </div>
                <div className="status_tab-container work">
                {task && task.map(item => 
                        item.stage === '2' && (
                        <div className="table_card" >
                            <div className="author-container">
                                <img className='profile_icon' src={require('../../media/profile_icon.svg').default} alt="profile_img" />
                                <h2 className="table_title">{item.title}</h2>
                            </div>
                            <hr />
                            <div className="desc_content">
                                <p className="table_text">{item.content}</p>
                            </div>
                            <hr />
                            <div className="date-container">
                                <p className="table_deadline">{item.deadline}</p>
                                <div className="manipulation_panel">
                                <div className='manipulation_panel_edit' data-id = {item.id} onClick={editTask}></div>
                                    <hr />
                                <div className='manipulation_panel_open' data-id = {item.id} onClick={redirectToTask}></div>
                            </div>
                            </div>
                        </div>)
                            
                        )
                    }
                </div>
                <div className="status_tab-container check">
                {task && task.map(item => 
                        item.stage === '3' && (
                        <div className="table_card" >
                            <div className="author-container">
                                <img className='profile_icon' src={require('../../media/profile_icon.svg').default} alt="profile_img" />
                                <h2 className="table_title">{item.title}</h2>
                            </div>
                            <hr />
                            <div className="desc_content">
                                <p className="table_text">{item.content}</p>
                            </div>
                            <hr />
                            <div className="date-container">
                                <p className="table_deadline">{item.deadline}</p>
                                <div className="manipulation_panel">
                                <div className='manipulation_panel_edit' data-id = {item.id} onClick={editTask}></div>
                                    <hr />
                                <div className='manipulation_panel_open' data-id = {item.id} onClick={redirectToTask}></div>
                            </div>
                            </div>
                        </div>)
                            
                        )
                    }
                </div>
                <div className="status_tab-container done">
                {task && task.map(item => 
                        item.stage === '4' && (
                        <div className="table_card" >
                            <div className="author-container">
                                <img className='profile_icon' src={require('../../media/profile_icon.svg').default} alt="profile_img" />
                                <h2 className="table_title">{item.title}</h2>
                            </div>
                            <hr />
                            <div className="desc_content">
                                <p className="table_text">{item.content}</p>
                            </div>
                            <hr />
                            <div className="date-container">
                                <p className="table_deadline">{item.deadline}</p>
                                <div className="manipulation_panel">
                                <div className='manipulation_panel_edit' data-id = {item.id} onClick={editTask}></div>
                                    <hr />
                                <div className='manipulation_panel_open' data-id = {item.id} onClick={redirectToTask}></div>
                            </div>
                            </div>
                        </div>)
                            
                        )
                    }
                </div>
            </div>
        </main>
    );
}

export default TaskBoard;