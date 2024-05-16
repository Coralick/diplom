import React, { useContext, useEffect, useState } from 'react';
import ProfileBlock from './ProfileBlock';
import Modal from './Modal';
import { DataContext, ModalContext } from '../pages/Layout'
import { getCookie } from '../App';
function Header() {

    const url = new URL(window.location.href).pathname.split('/')[1]

    const tableId = new URL(window.location.href).pathname.split('/')[2]

    // context data
    const { updateValue } = useContext(DataContext)
    const { http } = useContext(DataContext)
    const { modalToggle } = useContext(ModalContext)
    const { updateModalToggle } = useContext(ModalContext)
    const { modalUpdateId } = useContext(ModalContext)

    // create formData
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        deadline: '',
        stage: '',
        table_id: Number(tableId),
        user_id: Number(getCookie('user_id')),
        modal_update_id: Number(modalUpdateId),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const sortBy = e => {
        const method = e.target.dataset.sort
        http.get('api/table?method=' + method)
            .then(res => {
                updateValue(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const sendTable = (e) => {
        e.preventDefault();
        http.post('api/table', formData)
            .then(res => {
                if (res.data.status) {
                    window.location.reload();
                    setFormData({
                        title: '',
                        deadline: '',
                        content: '',
                    });
                }

                else {
                    console.log(res.data)
                }
            })

            .catch(err => {
                // Обработка ошибки
                console.log(err)
            });
    }

    useEffect(() => {
        http.get('api/' + url + "_one?id=" + modalUpdateId)
            .then(res => {
                if (res.data.status) {
                    setFormData(res.data.table_info);
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [modalToggle])

    const updateTable = (e) => {
        e.preventDefault();
        http.put('api/table', formData)
            .then(res => {
                if (res.data.status) {
                    window.location.reload();
                    setFormData({
                        title: '',
                        deadline: '',
                        content: '',
                    });
                }

                else {
                    console.log(res.data)
                }
            })

            .catch(err => {
                // Обработка ошибки
                console.log(err)
            });
    }

    const sendTask = (e) => {
        e.preventDefault();
        http.post('api/task', formData)
            .then(res => {
                if (res.data.status) {
                    window.location.reload();
                    setFormData({
                        title: '',
                        deadline: '',
                        content: '',
                        stage: '',
                        table_id: tableId,
                    });
                }
                else {
                    console.log(res.data);
                }
            })

            .catch(err => {
                // Обработка ошибки
                console.log(err)
            });
    }

    const updateTask = (e) => {
        e.preventDefault();
        http.put('api/task', formData)
            .then(res => {
                if (res.data.status) {
                    window.location.reload();
                    setFormData({
                        title: '',
                        deadline: '',
                        content: '',
                        stage: '',
                        table_id: tableId,
                    });
                }
                else {
                    console.log(res.data);
                }
            })

            .catch(err => {
                // Обработка ошибки
                console.log(err)
            });
    }


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        updateModalToggle(false)
    };

    return (
        <header>
            <div className="function_conteiner">

                <div className="line-up_container">
                    <p className="filter_title">Вид</p>
                    <div className="line-up">
                        <img src={require('../media/line-up_icon_1.svg').default} alt="line-up" className='line-up_icon' />
                        <hr />
                        <img src={require('../media/line-up_icon_2.svg').default} alt="line-up" className='line-up_icon' />
                    </div>
                </div>

                <div className="sort_container">
                    <p className="filter_title">Сортировка</p>
                    <div className="sort">
                        <div onClick={sortBy} data-sort="manager" className="sort_icon"></div>
                        <hr />
                        <div onClick={sortBy} data-sort="flag" className="sort_icon"></div>
                        <hr />
                        <div onClick={sortBy} data-sort="created_at" className="sort_icon"></div>
                        <hr />
                        <div onClick={sortBy} data-sort="deadline" className="sort_icon"></div>
                    </div>
                </div>

                {url === 'task' ?

                    <button onClick={handleOpenModal} className="create_button">Создать задачу</button>

                    :

                    <button onClick={handleOpenModal} className="create_button">Создать проект</button>

                }

            </div>
            {url === 'task' ?
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

            }

            <ProfileBlock />

        </header>
    );
}

export default Header;