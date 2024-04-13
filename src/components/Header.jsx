import React, { useState } from 'react';
import ProfileBlock from './ProfileBlock';
import Modal from './Modal';
import axios from 'axios';
function Header() {
    const url = new URL(window.location.href).pathname.split('/')[1]
    const tableId = new URL(window.location.href).pathname.split('/')[2]
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        deadline: '',
        stage: '',
        table_id: Number(tableId),
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const sendTable = (e) =>{
        e.preventDefault();
        console.log(formData);
        axios.post('http://diplomapi.test/api/table', formData)
        .then(res => {
            if(res.data.status){
                console.log(res.data)
                window.location.reload();
                setFormData({
                    title: '',
                    deadline: '',
                    content: '', 
                });
            }
            else{
                console.log(res.data)
            }
        })

        .catch(err => {
            // Обработка ошибки
            console.log(err)
        });
    }
    const sendTask = (e) =>{
        e.preventDefault();
        console.log(formData);
        axios.post('http://diplomapi.test/api/task', formData)
        .then(res => {
            if(res.data.status){
                console.log(res.data);
                window.location.reload();
                setFormData({
                    title: '',
                    deadline: '',
                    content: '',
                    stage: '',
                    table_id: tableId,
                });
            }
            else{
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
        };

    return (
        <header>
            <div className="function_conteiner">

                <div className="line-up_container">
                    <p className="filter_title">Вид</p>
                    <div className="line-up">
                        <img src={require('../media/line-up_icon_1.svg').default} alt="line-up" className='line-up_icon'/>
                        <hr />
                        <img src={require('../media/line-up_icon_2.svg').default} alt="line-up" className='line-up_icon'/>
                    </div>
                </div>
                
                <div className="sort_container">
                    <p className="filter_title">Сортировка</p>
                    <div className="sort">
                        <svg data-icon="profile" className='sort_icon' width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 33C8.15294 33 1 25.8471 1 17C1 8.15294 8.15294 1 17 1C25.8471 1 33 8.15294 33 17C33 25.8471 25.7529 33 17 33ZM17 2.88235C9.18824 2.88235 2.88235 9.18824 2.88235 17C2.88235 24.8118 9.18824 31.1176 17 31.1176C24.8118 31.1176 31.1176 24.8118 31.1176 17C31.1176 9.18824 24.7176 2.88235 17 2.88235Z" fill="#5A77DF" />
                            <path d="M7.77647 28.5765L6.08235 27.8235C6.55294 26.6941 8.05882 26.0353 9.65882 25.2824C11.2588 24.5294 13.2353 23.6824 13.2353 22.6471V21.2353C12.6706 20.7647 11.7294 19.7294 11.5412 18.2235C11.0706 17.7529 10.3176 16.9059 10.3176 15.7765C10.3176 15.1176 10.6 14.5529 10.7882 14.1765C10.6 13.4235 10.4118 12.0118 10.4118 10.8824C10.4118 7.21176 12.9529 4.76471 17 4.76471C18.1294 4.76471 19.5412 5.04706 20.2941 5.89412C22.0824 6.27059 23.5882 8.34118 23.5882 10.8824C23.5882 12.4824 23.3059 13.8 23.1176 14.4588C23.3059 14.7412 23.4941 15.2118 23.4941 15.7765C23.4941 17 22.8353 17.8471 22.2706 18.2235C22.0824 19.7294 21.2353 20.6706 20.6706 21.1412V22.6471C20.6706 23.4941 22.3647 24.1529 23.8706 24.7176C25.6588 25.3765 27.5412 26.1294 28.2 27.6353L26.4118 28.2941C26.1294 27.5412 24.6235 26.9765 23.2118 26.5059C21.1412 25.7529 18.7882 24.9059 18.7882 22.7412V20.2941L19.2588 20.0118C19.2588 20.0118 20.3882 19.2588 20.3882 17.7529V17.0941L20.9529 16.8118C21.0471 16.8118 21.5176 16.5294 21.5176 15.7765C21.5176 15.5882 21.3294 15.3059 21.2353 15.2118L20.8588 14.8353L21.0471 14.3647C21.0471 14.3647 21.5176 12.8588 21.5176 10.9765C21.5176 9.18824 20.4824 7.87059 19.6353 7.87059H19.0706L18.7882 7.4C18.7882 7.02353 18.1294 6.64706 17 6.64706C14.0824 6.64706 12.2941 8.24706 12.2941 10.8824C12.2941 12.1059 12.7647 14.1765 12.7647 14.1765L12.8588 14.6471L12.4824 15.1176C12.3882 15.1176 12.2 15.4 12.2 15.7765C12.2 16.2471 12.7647 16.8118 13.0471 17L13.4235 17.2824V17.7529C13.4235 19.1647 14.6471 19.9176 14.6471 20.0118L15.1176 20.2941V22.7412C15.1176 25 12.6706 26.1294 10.4118 27.0706C9.37647 27.4471 7.96471 28.1059 7.77647 28.5765Z" fill="#5A77DF" />
                            <path d="M33 17C33 25.8366 25.8366 33 17 33M33 17C33 8.16344 25.8366 1 17 1M33 17C33 8.15294 25.8471 1 17 1M33 17C33 25.8471 25.7529 33 17 33M17 33C8.16344 33 1 25.8366 1 17M17 33C8.15294 33 1 25.8471 1 17M1 17C1 8.16344 8.16344 1 17 1M1 17C1 8.15294 8.15294 1 17 1M17 2.88235C9.18824 2.88235 2.88235 9.18824 2.88235 17C2.88235 24.8118 9.18824 31.1176 17 31.1176C24.8118 31.1176 31.1176 24.8118 31.1176 17C31.1176 9.18824 24.7176 2.88235 17 2.88235ZM7.77647 28.5765L6.08235 27.8235C6.55294 26.6941 8.05882 26.0353 9.65882 25.2824C11.2588 24.5294 13.2353 23.6824 13.2353 22.6471V21.2353C12.6706 20.7647 11.7294 19.7294 11.5412 18.2235C11.0706 17.7529 10.3176 16.9059 10.3176 15.7765C10.3176 15.1176 10.6 14.5529 10.7882 14.1765C10.6 13.4235 10.4118 12.0118 10.4118 10.8824C10.4118 7.21176 12.9529 4.76471 17 4.76471C18.1294 4.76471 19.5412 5.04706 20.2941 5.89412C22.0824 6.27059 23.5882 8.34118 23.5882 10.8824C23.5882 12.4824 23.3059 13.8 23.1176 14.4588C23.3059 14.7412 23.4941 15.2118 23.4941 15.7765C23.4941 17 22.8353 17.8471 22.2706 18.2235C22.0824 19.7294 21.2353 20.6706 20.6706 21.1412V22.6471C20.6706 23.4941 22.3647 24.1529 23.8706 24.7176C25.6588 25.3765 27.5412 26.1294 28.2 27.6353L26.4118 28.2941C26.1294 27.5412 24.6235 26.9765 23.2118 26.5059C21.1412 25.7529 18.7882 24.9059 18.7882 22.7412V20.2941L19.2588 20.0118C19.2588 20.0118 20.3882 19.2588 20.3882 17.7529V17.0941L20.9529 16.8118C21.0471 16.8118 21.5176 16.5294 21.5176 15.7765C21.5176 15.5882 21.3294 15.3059 21.2353 15.2118L20.8588 14.8353L21.0471 14.3647C21.0471 14.3647 21.5176 12.8588 21.5176 10.9765C21.5176 9.18824 20.4824 7.87059 19.6353 7.87059H19.0706L18.7882 7.4C18.7882 7.02353 18.1294 6.64706 17 6.64706C14.0824 6.64706 12.2941 8.24706 12.2941 10.8824C12.2941 12.1059 12.7647 14.1765 12.7647 14.1765L12.8588 14.6471L12.4824 15.1176C12.3882 15.1176 12.2 15.4 12.2 15.7765C12.2 16.2471 12.7647 16.8118 13.0471 17L13.4235 17.2824V17.7529C13.4235 19.1647 14.6471 19.9176 14.6471 20.0118L15.1176 20.2941V22.7412C15.1176 25 12.6706 26.1294 10.4118 27.0706C9.37647 27.4471 7.96471 28.1059 7.77647 28.5765Z" stroke="#5A77DF" />
                        </svg>
                        <hr />
                        <svg className='sort_icon' width="29" height="36" viewBox="0 0 29 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 22.8C2 22.8 3.5625 21.2 8.25 21.2C12.9375 21.2 16.0625 24.4 20.75 24.4C25.4375 24.4 27 22.8 27 22.8V3.6C27 3.6 25.4375 5.2 20.75 5.2C16.0625 5.2 12.9375 2 8.25 2C3.5625 2 2 3.6 2 3.6V22.8ZM2 34V22.8V34Z" fill="#EDEEF0" />
                            <path d="M2 22.8C2 22.8 3.5625 21.2 8.25 21.2C12.9375 21.2 16.0625 24.4 20.75 24.4C25.4375 24.4 27 22.8 27 22.8V3.6C27 3.6 25.4375 5.2 20.75 5.2C16.0625 5.2 12.9375 2 8.25 2C3.5625 2 2 3.6 2 3.6V22.8ZM2 22.8V34" stroke="#5A77DF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <hr />
                        <svg data-icon="calendar" className='sort_icon' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 17.4545C8.17157 17.4545 7.5 18.1058 7.5 18.9091C7.5 19.7124 8.17157 20.3636 9 20.3636H9.015C9.84343 20.3636 10.515 19.7124 10.515 18.9091C10.515 18.1058 9.84343 17.4545 9.015 17.4545H9Z" fill="#5A77DF" />
                            <path d="M15 17.4545C14.1716 17.4545 13.5 18.1058 13.5 18.9091C13.5 19.7124 14.1716 20.3636 15 20.3636H15.015C15.8434 20.3636 16.515 19.7124 16.515 18.9091C16.515 18.1058 15.8434 17.4545 15.015 17.4545H15Z" fill="#5A77DF" />
                            <path d="M21 17.4545C20.1716 17.4545 19.5 18.1058 19.5 18.9091C19.5 19.7124 20.1716 20.3636 21 20.3636H21.015C21.8434 20.3636 22.515 19.7124 22.515 18.9091C22.515 18.1058 21.8434 17.4545 21.015 17.4545H21Z" fill="#5A77DF" />
                            <path d="M9 23.2727C8.17157 23.2727 7.5 23.924 7.5 24.7273C7.5 25.5306 8.17157 26.1818 9 26.1818H9.015C9.84343 26.1818 10.515 25.5306 10.515 24.7273C10.515 23.924 9.84343 23.2727 9.015 23.2727H9Z" fill="#5A77DF" />
                            <path d="M15 23.2727C14.1716 23.2727 13.5 23.924 13.5 24.7273C13.5 25.5306 14.1716 26.1818 15 26.1818H15.015C15.8434 26.1818 16.515 25.5306 16.515 24.7273C16.515 23.924 15.8434 23.2727 15.015 23.2727H15Z" fill="#5A77DF" />
                            <path d="M21 23.2727C20.1716 23.2727 19.5 23.924 19.5 24.7273C19.5 25.5306 20.1716 26.1818 21 26.1818H21.015C21.8434 26.1818 22.515 25.5306 22.515 24.7273C22.515 23.924 21.8434 23.2727 21.015 23.2727H21Z" fill="#5A77DF" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C9.82843 0 10.5 0.651222 10.5 1.45455V2.90909H19.5V1.45455C19.5 0.651222 20.1716 0 21 0C21.8284 0 22.5 0.651222 22.5 1.45455V2.90909H25.5C27.9853 2.90909 30 4.86276 30 7.27273V27.6364C30 30.0463 27.9853 32 25.5 32H4.5C2.01472 32 0 30.0463 0 27.6364V7.27273C0 4.86276 2.01472 2.90909 4.5 2.90909H7.5V1.45455C7.5 0.651222 8.17157 0 9 0ZM3 14.5455V27.6364C3 28.4397 3.67157 29.0909 4.5 29.0909H25.5C26.3284 29.0909 27 28.4397 27 27.6364V14.5455H3ZM27 11.6364H3V7.27273C3 6.4694 3.67157 5.81818 4.5 5.81818H7.5V7.27273C7.5 8.07605 8.17157 8.72727 9 8.72727C9.82843 8.72727 10.5 8.07605 10.5 7.27273V5.81818H19.5V7.27273C19.5 8.07605 20.1716 8.72727 21 8.72727C21.8284 8.72727 22.5 8.07605 22.5 7.27273V5.81818H25.5C26.3284 5.81818 27 6.4694 27 7.27273V11.6364Z" fill="#5A77DF" />
                        </svg>
                        <hr />
                        <svg className='sort_icon' width="29" height="36" viewBox="0 0 29 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.819 34C21.8172 34 27 29.0844 27 22.3167C27 18.2717 25.1155 16.2778 22.3828 13.389L22.3466 13.3492C19.8638 10.7235 16.9345 7.54911 16.0552 2C14.7533 2.76823 13.6299 3.80684 12.7603 5.0463C11.4034 7.0264 10.7828 9.60364 12.3879 12.8265C13.4276 14.9122 13.7276 17.569 11.9103 19.3933C10.7776 20.5305 8.87241 21.2973 6.81379 20.4076C5.51724 19.8468 4.48103 18.7547 3.64483 17.3094C2.66724 18.5314 2 20.3211 2 22.3167C2 28.9753 7.66897 34 14.819 34Z" fill="#EDEEF0" stroke="#5A77DF" stroke-width="3" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <button onClick = {handleOpenModal} className="create_button">Создать проект</button>
            </div>
            {url === 'taskboard' ?  
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Создание задачи</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title}  onChange={handleChange} required/>
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline}  onChange={handleChange} required/>
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content}  onChange={handleChange} required/>
                    <input type="text"  placeholder='Этап' name="stage" value={formData.stage} onChange={handleChange} required className='modal_input' />
                    <button onClick={sendTask} type='submit'>Создать</button>
                </Modal>
                :
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className='modal_title'>Создание таблицы</h2>
                    <input type="text" placeholder='Название' className='modal_input' name="title" value={formData.title}  onChange={handleChange} required/>
                    <input type="date" placeholder='Дедлайны' className='modal_input' name="deadline" value={formData.deadline}  onChange={handleChange} required/>
                    <textarea placeholder='Описание' className='modal_input' name="content" value={formData.content}  onChange={handleChange} required/>
                    <button onClick={sendTable} type='submit'>Создать</button>
                </Modal> 
                
                }
            
            
            <ProfileBlock/>

        </header>
    );
}

export default Header;