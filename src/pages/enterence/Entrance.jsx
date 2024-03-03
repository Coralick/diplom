import { Link } from "react-router-dom"
import { useState } from "react"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/authUser', formData)
        .then(res => {
            if(res.data.status){
                console.log(res.data)
                window.location.href="/home"
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
        // Очистка данных формы

    };
    return(
        <div className="body">
                <p className="title">ВХОД</p>
            <form className="form" onSubmit={handleSubmit}>
                <input  name="email" value={formData.email} onChange={handleChange} className={error ? "input" : "input active"} type="email"  placeholder="Email" required/><br />
                {/* <hr className="hr"/> */}
                <div className="pass">
                    <input className={error ? "input" : "input active"} name="password" value={formData.password} onChange={handleChange} type={eye? 'text' : 'password'} placeholder="Password" required />
                    <p className="formeye" onClick={ () => setEye(prev => !prev)}>  
                        {  
                            !eye ? <AiFillEye/> : <AiFillEyeInvisible/>
                        }
                    </p>
                </div>
                <p className={error ? "msg" : "msg active"}>Данные не корректны</p>
                <button className="button" type="submit">Войти</button>
            </form>
            <div className="b entrance">
                <Link to='/' className='link'>Зарегистрироваться</Link>
            </div>
            {/* <hr className="hrb"/> */}
            
        </div>
        
    )
}

export default Entrance