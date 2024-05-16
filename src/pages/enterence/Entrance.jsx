import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { getCookie } from "../../App"

const Entrance = () => {

    if(getCookie('user_id') != undefined){
        window.location.href="/table"
    }
    const [eye,setEye] = useState(false)
    const [error, setError] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setError(true)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const changeEyes = (e) => {
        if(eye){
            setEye(prev => !prev)
            e.target.className = "eye_form close"
        }
        else{
            setEye(prev => !prev)
            e.target.className = "eye_form"
        }
        console.log(e.target.className)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://cf06014.tw1.ru/api/authUser', formData)
        .then(res => {
            if(res.data.status){
                console.log( res.data.user_id)
                document.cookie = "user_id=" +  res.data.user_id + "; path=/"
                window.location.href="/table"
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
            }
            else{
                setError(false)
                console.log(res.data)
            }
        })

        .catch(err => {
            // Обработка ошибки
            console.log(err)
            setError(false)
        });


    };
    return(
        <div className="body">
            <div className="main">
                <p className="logoText">Task Wave</p>
                <p className="title">Вход</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input  name="email" value={formData.email} onChange={handleChange} className={error ? "input" : "input active"} type="email"  placeholder="Электронная почта" required/>
                    <div className="pass">
                        <input className={error ? "input" : "input active"} name="password" value={formData.password} onChange={handleChange} type={eye? 'text' : 'password'} placeholder="Пароль" required />
                        <div className="eye_form close" onClick={changeEyes}>  </div>
                    </div>
                    <p className={error ? "msg" : "msg active"}>Данные не корректны</p>
                    <button className="button" type="submit">Войти</button>
                </form>
                <div className="b">
                    <Link to='/registr' className="link" >Регистрация</Link>
                </div>
            </div>
        </div>
        
    )
}

export default Entrance