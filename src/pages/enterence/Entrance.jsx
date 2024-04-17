import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
    

const Entrance = () => {
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
        axios.post('http://diplomapi.test/api/authUser', formData)
        .then(res => {
            if(res.data.status){
                window.location.href="/"
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