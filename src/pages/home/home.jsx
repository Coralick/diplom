import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Home() {
    let [table, setTable] = useState([])
    const  http = axios.create({
        baseURL: 'http://diplomapi.test/',
        headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json',
        },
    })
    useEffect(() => {
        http.get('api/table')
        .then(res => {
            // Обработка успешного ответа
            setTable(res.data)
            console.log(res.data['tables']);
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
                    {table['tables'] && table['tables'].map((item) => (
                    <div className="table_card">

                           <div className="author-container">
                            <img className='profile_icon' src={require('../../media/profile_icon.svg').default} alt="profile_img" />
                                <h2 className="table_title">{item.manager ? item.manager : "Неопознанный утконос"}</h2>
                            </div>
                            <hr />
                            <div className="desc_content">
                                <p className="table_text">{item.title}</p>
                            </div>
                            <hr />
                            <div className="date-container">
                                <p className="table_deadline">{item.deadline}</p>
                            </div>
                        </div>
                        ))}
                </div>

            </div>

        </div>
    );
}

export default Home;