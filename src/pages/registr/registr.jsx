import { useState } from "react"
import Button from "../../components/Button"
import Pass from "../../components/Pass"
import { Link } from "react-router-dom"
import axios from "axios"
function Registr () {
    const [data, setData] = useState()
    let sunRise = e => {
        e.preventDefault()
        axios.post('http://diplomapi.test/api/user', {
        "name": "huan2",
        "email": "mail-email.com2",
        "password": "123413"
        })
        .then(res => {
            // Обработка успешного ответа
            setData(res)
            console.log(res);
        })
        .catch(err => {
            // Обработка ошибки
            console.error(err);
        });
    }
    return(
        
        <div>
            <p className="title">РЕГИСТРАЦИЯ</p>
            <form className="form">
                <input type="text" placeholder="Имя" className="input"/><br />
                <input type="email"  placeholder="Email" className="input"/><br />
                <Pass/>
                <button className="button" onClick={sunRise}>Зарегистрироваться</button>
            </form> 
                <Link to='/input' className="link" >Вход</Link>
        </div>
        
        
    )
}

export default Registr