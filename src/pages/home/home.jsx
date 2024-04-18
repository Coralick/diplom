import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';


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
        })
        .catch(err => {
            // Обработка ошибки
            console.error(err);
        });
        console.log( table['tables'])

        // table['tables'].forEach(item => {
        //     const startDate = new Date(item.created_at)
        //     const endDate = new Date(item.deadline)
        //     const currentDay = new Date()
        //     let deadlineDay = endDate - startDate
        //     deadlineDay = deadlineDay/1000/60/60/24
        //     let nowDay = endDate - currentDay
        //     nowDay = nowDay/1000/60/60/24
        //     const difference = deadlineDay/nowDay
        //     if(difference < 1){
        //         item.tongle_color = 'green'
        //     }
        //     else if(difference > 1 && difference < 2){
        //         item.tongle_color = 'yellow'
        //     }
        //     else{
        //         item.tongle_color = 'red'
        //     }   
        // })
    }, [])

    
    console.log(table)


    return (
        <main>
            
            <div className="main_block">
                <div className="table_container">
                    {table['tables'] && table['tables'].map((item) => (
                        <Table itemProp = {item}/>
                        ))}
                </div>

            </div>

        </main>
    );
}

export default Home;