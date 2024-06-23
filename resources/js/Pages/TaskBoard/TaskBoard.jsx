import React, { useContext, useEffect, useState } from 'react';
import ModalForm from '@/Components/ModalForm';
import AuthenticatedLayout, { ModalContext } from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

function TaskBoard({ auth, role = '', table, stages, taskList, users = [], formData = false }) {

    const [burstOut, setBurstOut] = useState(false)
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: formData ? formData.title : '',
        content: formData ? formData.content : '',
        deadline: formData ? formData.deadline : '',
        stage_id: formData ? formData.stage_id : '0',
        table_id: table.id,
        id: formData ? formData.id : '',
    });

    const changeBurstOut = () => {
        setBurstOut(!burstOut)
    }

    const submitCreate = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('task.create'));
        setData({
            title: '',
            content: '',
            deadline: '',
            stage_id: '0',
            table_id: table.id,
        })
    };

    const submitEdit = (e) => {
        e.preventDefault();
        patch(route('task.update'),);

        setData({
            title: '',
            content: '',
            deadline: '',
            stage_id: '0',
            table_id: table.id,
        })
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            list={taskList}
            role={role}
            type={'task'}
        >
            <Head title="Задачи" />

            <div className="taskboard_container">
                <div className="taskboard_header">
                    <div className="status_tab agreement">Согласование</div>
                    <div className="status_tab work">В работе</div>
                    <div className="status_tab check">Проверка</div>
                    <div className="status_tab done">Выполнено </div>
                </div>
                <div className="task_container">
                    <div className="status_tab-container agreement">
                        {taskList && taskList.map(item =>
                            item.stage_id === 1 && (
                                <Table role={role} type={'task'} itemProp={item} />)
                        )
                        }

                    </div>
                    <div className="status_tab-container work">
                        {taskList && taskList.map(item =>
                            item.stage_id === 2 && (
                                <Table role={role} type={'task'} itemProp={item} />)
                        )
                        }
                    </div>
                    <div className="status_tab-container check">
                        {taskList && taskList.map(item =>
                            item.stage_id === 3 && (
                                <Table role={role} type={'task'} itemProp={item} />)
                        )
                        }
                    </div>
                    <div className="status_tab-container done">
                        {taskList && taskList.map(item =>
                            item.stage_id === 4 && (
                                <Table role={role} type={'task'} itemProp={item} />)
                        )
                        }
                    </div>
                </div>
                <div className="task_description-sidebar">
                    <div className="task_description-toggle">
                        <svg className='back_arrow' onClick={changeBurstOut} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.08772 24C3.08772 12.4505 12.4505 3.08772 24 3.08772C35.5495 3.08772 44.9123 12.4505 44.9123 24C44.9123 35.5495 35.5495 44.9123 24 44.9123C12.4505 44.9123 3.08772 35.5495 3.08772 24ZM24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM25.0917 13.9259C24.4887 13.323 23.5112 13.323 22.9083 13.9259C22.3054 14.5288 22.3054 15.5063 22.9083 16.1092L29.2552 22.4561H15.0175C14.1649 22.4561 13.4737 23.1473 13.4737 24C13.4737 24.8526 14.1649 25.5439 15.0175 25.5439H29.2552L22.9083 31.8908C22.3054 32.4937 22.3054 33.4712 22.9083 34.0741C23.5112 34.677 24.4887 34.677 25.0917 34.0741L34.0741 25.0917C34.677 24.4888 34.677 23.5112 34.0741 22.9083L25.0917 13.9259Z" fill="#EDEEF0" />
                        </svg>
                    </div>
                    <div className={`task_description-body ${burstOut && 'active'}`}>
                        <h2 className="title">{table.title}</h2>
                        <hr />
                        <p className="content">{table.content}</p>
                        <div className="author-container">
                            <img className='profile_icon' src='/media/profile_icon.svg' alt="profile_img" />
                            <p className="name">{table.username}</p>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>

            <ModalForm back_url={`/home/table?id=${table.id}`} trigger={formData} title={formData ? 'Изменить задачу' : 'Создание задачи'}>
                <form className='form' onSubmit={formData ? submitEdit : submitCreate}>
                    <InputLabel className={'modal_label'} for={'title'}>Название
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            required
                            value={data.title}
                            className={`modal_input`}
                            autoComplete="title"
                            isFocused={true}
                            placeholder='Введите название'
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </InputLabel>

                    <InputLabel className={'modal_label'} for={'content'}>Описание задачи
                        <textarea placeholder='Описание' className='modal_input' value={data.content} onChange={(e) => setData('content', e.target.value)} name="content" required />
                    </InputLabel>
                    <InputLabel className={'modal_label'} for={'deadline'}>Сроки задачи
                        <TextInput
                            id="deadline"
                            type="date"
                            name="deadline"
                            required
                            value={data.deadline}
                            className={`modal_input`}
                            autoComplete="deadline"
                            isFocused={true}
                            placeholder='Введите сроки'
                            onChange={(e) => setData('deadline', e.target.value)}
                        />
                    </InputLabel>
                    <InputLabel className={'modal_label'} for={'deadline'}>Этап задачи

                        <select name="stage_id" id="stage_id" onChange={(e) => setData('stage_id', e.target.value)} value={data.stage_id} required>
                            <option disabled selected value='0'>Этап задачи</option>
                            {stages && stages.map(item => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </InputLabel>
                    <button type='submit'>{formData ? 'Изменить' : 'Создать'}</button>
                </form>
            </ModalForm>
        </AuthenticatedLayout>
    );
}

export default TaskBoard;