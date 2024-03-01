import axios from 'axios';
import React, { useState } from 'react';


function Home() {
    let [table, setTable] = useState({})
    axios.get('http://diplomapi.test/api/authUser')
    .then(res => {
        // Обработка успешного ответа
        setTable(res.data.tables)
        console.log(res);
    })
    .catch(err => {
        // Обработка ошибки
        console.error(err);
    });

    return (
        <div>
            <p></p>
            {table.map((item) => (
                <div className="table_cart">
                    <h2 className="table_title">{item.title}</h2>
                    <p className="table_text">{item.text}</p>
                    <div className="table_deadline">{item.date}</div>
                </div>
            ))}
        </div>
    );
}

export default Home;