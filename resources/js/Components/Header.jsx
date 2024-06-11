import React, { useContext, useEffect, useState } from 'react';
import ProfileBlock from './ProfileBlock';
import { Link } from '@inertiajs/react';
import { ModalContext } from '@/Layouts/AuthenticatedLayout';
function Header({ user, role }) {

    const { updateModalStatus, modalStatus } = useContext(ModalContext)
    return (
        <header>
            <div className="function_conteiner">
                <div className="sort_container">
                    <p className="filter_title">Сортировка</p>
                    <div className="sort">
                        <Link href='' data-sort="manager" className="sort_icon"></Link>
                        <hr />
                        <Link href='' data-sort="flag" className="sort_icon"></Link>
                        <hr />
                        <Link href='' data-sort="created_at" className="sort_icon"></Link>
                        <hr />
                        <Link href='' data-sort="deadline" className="sort_icon"></Link>
                    </div>
                </div>
                {role <= 2 && (

                    <button onClick={!modalStatus ? updateModalStatus : undefined} className="create_button">Создать</button>

                )

                }

            </div>
            {/* {url === 'task' ?
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Создание задачи</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title} onChange={handleChange} required />
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline} onChange={handleChange} required />
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content} onChange={handleChange} required />
                    <input type="text" placeholder='Этап' name="stage" value={formData.stage} onChange={handleChange} required className='modal_input' />
                    <button onClick={sendTask} type='submit'>Создать</button>
                </Modal>

                :

                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Создание таблицы</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title} onChange={handleChange} required />
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline} onChange={handleChange} required />
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content} onChange={handleChange} required />
                    <button onClick={sendTable} type='submit'>Создать</button>
                </Modal>

            }

            {url === 'task' ?
                <Modal isOpen={modalToggle} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Измение задачи</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title} onChange={handleChange} required />
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline} onChange={handleChange} required />
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content} onChange={handleChange} required />
                    <input type="text" placeholder='Этап' name="stage" value={formData.stage} onChange={handleChange} required className='modal_input' />
                    <button onClick={updateTask} data-id={modalUpdateId} type='submit'>Изменить</button>
                </Modal>

                :

                <Modal isOpen={modalToggle} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Измение таблицы</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title} onChange={handleChange} required />
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline} onChange={handleChange} required />
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content} onChange={handleChange} required />
                    <button onClick={updateTable} data-id={modalUpdateId} type='submit'>Изменить</button>
                </Modal>

            } */}

            <ProfileBlock user={user} />

        </header>
    );
}

export default Header;