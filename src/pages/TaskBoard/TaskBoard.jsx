
import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Table from '../../components/Table';
import { DataContext } from '../Layout';

function TaskBoard() {
    let [task, setTask] = useState([])
    let id = useParams()
    const { http } = useContext(DataContext)
    const { updateTableDataToTask } = useContext(DataContext)

    useEffect(() => {
        http.get('api/task?id=' + id.id)
            .then(res => {
                // Обработка успешного ответа
                setTask(res.data.task)                
                updateTableDataToTask(res.data.table)
            })
            .catch(err => {
                // Обработка ошибки
                console.log(err);
            });
    }, [])

    return (
        <main className='taskboard_main'>
            <div className="taskboard_container">
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
                                <Table itemProp={item} />)
                        )
                        }

                    </div>
                    <div className="status_tab-container work">
                        {task && task.map(item =>
                            item.stage === '2' && (
                                <Table itemProp={item} />)

                        )
                        }
                    </div>
                    <div className="status_tab-container check">
                        {task && task.map(item =>
                            item.stage === '3' && (
                                <Table itemProp={item} />)

                        )
                        }
                    </div>
                    <div className="status_tab-container done">
                        {task && task.map(item =>
                            item.stage === '4' && (
                                <Table itemProp={item} />)
                        )
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TaskBoard;