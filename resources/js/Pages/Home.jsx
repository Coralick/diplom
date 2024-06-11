import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import ModalForm from '@/Components/ModalForm';
import InputLabel from '@/Components/InputLabel';


export default function Home({ auth, role = '', tableList, formData = false }) {
    const [trigger, setTrigger] = useState(false)
    const submitCreate = (e) => {
        e.preventDefault();
        post(route('home.create'),);
        setData({
            title: formData ? formData.title : '',
            content: formData ? formData.content : '',
            deadline: formData ? formData.deadline : '',
        })
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        deadline: '',
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            list={tableList}
            role={role}
            type={'home'}
        >

            <Head title="Главная" />
            <div className="main_block">
                <div className="table_container">
                    {tableList && tableList.map((item) => (

                        <Table type={'home'} role={role} itemProp={item} />

                    ))}

                </div>

            </div>

            {role <= 2 && (

                <ModalForm trigger={formData} title={'Создание проекта'}>
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
                        <button type='submit'>Создать</button>
                    </form>
                </ModalForm>
            )}

        </AuthenticatedLayout>
    );
}