import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import ProfileBlock from '../../components/ProfileBlock';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskDesc() {
    const http = axios.create({
        baseURL: 'https://cf06014.tw1.ru/',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/json',
        },
    })
    let id = useParams()
    const [author, setAuthor] = useState('')
    const [task, setTask] = useState({})
    useEffect(() => {
        http.get('api/taskDesc?id=' + id.id)
            .then(res => {
                if (res.data.status) {
                    setAuthor(res.data.author)
                    setTask(res.data.task)
                }

                else {
                    window.location.href = "/table"
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    return (
        <div>
            <header className='task_desc-header'>
                <ProfileBlock />
            </header>
            <main className="task_desc-container">
                <div className="task_content">
                    <BackButton>Назад</BackButton>
                    <p className="task_title">{task.title}</p>
                    <div className="task_text-container">
                        <div className="task_text-header">
                            <p className="task_header-title">Описание</p>
                            <p className="task_header-deadline">{task.deadline}</p>
                        </div>
                        <div className="task_text-body">{task.content}</div>
                    </div>
                </div>
                <div className="task_dev-container">
                    <p className="task_dev-header">Ответственные</p>
                    <div className="task_dev-bar">
                        <div className="task_bar-block">
                            <div className="task_bar_name">
                                <img src={require('../../media/profile_icon.svg').default} alt="manager" />
                                <p className="task_bar-title">{author}</p>
                            </div>
                            <p className="task_bar-role"></p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default TaskDesc;