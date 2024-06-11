import BackButton from '@/Components/BackButton';
import SimpleHeader from '@/Components/SimpleHeader';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

function TaskDesc({ auth, task, role, author, userList = [], otherUsers }) {
    otherUsers.map(user => {
        console.log(user)
    })
    return (
        <div>
            <SimpleHeader user={auth.user} />
            <Head title="Описание" />

            <main className="task_desc-container">
                <div className="task_content">
                    <BackButton>Назад</BackButton>
                    <p className="task_title">{task.title}</p>
                    <div className="task_text-container">
                        <div className="task_text-header">
                            <p className="task_header-title">Описание</p>
                            <p className="task_header-deadline">{task.startline} - {task.deadline}</p>
                        </div>
                        <div className="task_text-body">{task.content}</div>
                    </div>
                </div>

                <div className="task_dev-container">
                    <div className='task_dev-body'>

                        <p className="task_dev-header">Ответственные</p>
                        <div className="task_dev-bar">
                            <div className="task_bar-block">
                                <div className="task_bar_name">
                                    <img src='/media/profile_icon.svg' alt="manager" />
                                    <p className="task_bar-title">{author.name}</p>
                                </div>
                                <p className="task_bar-role">Автор</p>
                            </div>
                            {userList && userList.map(user => (
                                <div className="task_bar-block">

                                    <div className="task_bar_name">
                                        <img src='/media/profile_icon.svg' alt="manager" />
                                        <p className="task_bar-title">{user.name}</p>
                                    </div>
                                    <div className="task_bar-left">
                                        <p className="task_bar-role">{user.role.name}</p>
                                        {role <= 2 && (
                                            <Link href={route('task.remove-user')} data={{ id: user.id, task_id: task.id }} method='post'>
                                                <div className='remove'></div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <hr />
                        {role <= 2 && (
                            <div className='other'>
                                <p className="task_dev-header">Свободные</p>

                                <div className="task_dev-bar">
                                    {otherUsers && otherUsers.map(user => (
                                        <div className="task_bar-block">
                                            <div className="task_bar_name">
                                                <img src='/media/profile_icon.svg' alt="manager" />

                                                <p className="task_bar-title">{user.name}</p>
                                            </div>
                                            <div className="task_bar-left">
                                                <p className="task_bar-role">{user.role.name}</p>
                                                <Link href={route('task.add-user')} data={{ id: user.id, task_id: task.id }} method='post'><div className='add'></div></Link>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

export default TaskDesc;