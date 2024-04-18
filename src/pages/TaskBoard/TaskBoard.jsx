
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';



function TaskBoard(dataRes) {
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
        const url = "/table/task/subtask/" + id
        window.location.href=url;
    }
    const editTask = e => {
        const id = e.target.dataset.id
        console.log(id)
    }
    console.log(task)

    

    useEffect(() => {
        http.get('api/task?id=' + id.id)
            .then(res => {
                // Обработка успешного ответа
                setTask(res.data.task)

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
                            <Table itemProp = {item}/>)
                        )
                    }

                </div>
                <div className="status_tab-container work">
                {task && task.map(item => 
                        item.stage === '2' && (
                            <Table itemProp = {item}/>)
                            
                        )
                    }
                </div>
                <div className="status_tab-container check">
                {task && task.map(item => 
                        item.stage === '3' && (
                            <Table itemProp = {item}/>)
                            
                        )
                    }
                </div>
                <div className="status_tab-container done">
                {task && task.map(item => 
                        item.stage === '4' && (
                            <Table itemProp = {item}/>)
                            
                        )
                    }
                </div>
            </div>
        </main>
    );
}

export default TaskBoard;