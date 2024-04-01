import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';


function Home() {
    let [table, setTable] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/table')
        .then(res => {
            // Обработка успешного ответа
            setTable(res.data)
            console.log(res.data);
        })
        .catch(err => {
            // Обработка ошибки
            console.error(err);
        });
    }, [])
    return (
        <div>
            
            <div className="main_block">
                <div className="table_container">
                    {table[0] && table[0].map((item) => (
                        <div className="table_card">
                            <h2 className="table_title">{item.title}</h2>
                            <hr/>
                            <div className="desc_content">
                                <p className="table_text">{item.content}</p>
                                <div className="table_deadline">{item.deadline}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="filter_container">

                    <div className="radio_filter">
                        <label htmlFor="deadline_mark" for="deadline_mark_1">    
                            <input type="radio" name="deadline_mark" id="deadline_mark_1" className='radio_box'/>
                            Горит
                        </label>

                        <label htmlFor="deadline_mark" for="deadline_mark_2">
                            <input type="radio" name="deadline_mark" id="deadline_mark_2" className='radio_box'/>
                            Ответственно
                        </label>

                        <label htmlFor="deadline_mark" for="deadline_mark_3">
                            <input type="radio" name="deadline_mark" id="deadline_mark_3" className='radio_box'/>
                            Свежее
                        </label>
                    </div>

                    <div className="checkbox_filter">
                    <label htmlFor="deadline_mark" for="deadline_checkbox_1">
                            <input type="checkbox" name="spec_mark" id="deadline_checkbox_1" className='checkbox_box'/>
                            Программисты 
                        </label>

                        <label htmlFor="deadline_mark" for="deadline_checkbox_2">
                            <input type="checkbox" name="spec_mark" id="deadline_checkbox_2" className='checkbox_box'/>
                            Дизайнеры
                        </label>

                        <label htmlFor="deadline_mark" for="deadline_checkbox_3">
                            <input type="checkbox" name="spec_mark" id="deadline_checkbox_3" className='checkbox_box'/>
                            Менеджеры
                        </label>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home;