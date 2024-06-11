

import React, { useContext, useEffect, useState } from 'react';
import ModalForm from '@/Components/ModalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

function TaskBoard({ auth, role = '', table, stages, taskList, users = [], formData = false }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: formData ? formData.title : '',
        content: formData ? formData.content : '',
        deadline: formData ? formData.deadline : '',
        stage_id: formData ? formData.stage_id : null,
        table_id: table.id
    });

    console.log(data.table_id)

    const submitCreate = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('task.create'));
        setData({
            title: '',
            content: '',
            deadline: '',
            stage_id: null,
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
            </div>
            <ModalForm trigger={formData} title={'Создание задачи'}>
                <form className='form' onSubmit={submitCreate}>
                    <InputLabel className={'modal_label'} for={'title'}>Название
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
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
                            value={data.deadline}
                            className={`modal_input`}
                            autoComplete="deadline"
                            isFocused={true}
                            placeholder='Введите сроки'
                            onChange={(e) => setData('deadline', e.target.value)}
                        />
                    </InputLabel>
                    <InputLabel className={'modal_label'} for={'deadline'}>Этап задачи

                        <select name="stage_id" id="stage_id" onChange={(e) => setData('stage_id', e.target.value)} value={data.stage_id}>
                            <option disabled selected>Этап задачи</option>
                            {stages && stages.map(item => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </InputLabel>
                    <button type='submit'>Создать</button>
                </form>
            </ModalForm>
        </AuthenticatedLayout>
    );
}

export default TaskBoard;