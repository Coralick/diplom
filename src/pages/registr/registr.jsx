import { useState } from "react"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link } from "react-router-dom"
import axios from "axios"

const Registr = () => {
    const [eye,setEye] = useState(false)
    const [error, setError] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
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
        axios.post('http://127.0.0.1:8000/api/user', formData)
        .then(res => {
            if(res.data.status){
                console.log(res.data)
                window.location.href="/input"
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
            console.log(err)
            setError(false)
        });
        // Очистка данных формы
        
    };

    return(
        
        <div className="body">
            <p className="title">РЕГИСТРАЦИЯ</p>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="name" placeholder="Имя" className={error ? "input" : "input active"} required value={formData.name} onChange={handleChange} /><br />
                {/* <hr className="hr"/> */}
                <input type="email" name="email" placeholder="Email" className={error ? "input" : "input active"} required value={formData.email} onChange={handleChange}/><br />
                {/* <hr className="hr"/> */}
                {/* <Pass/> */}
                <div className="pass">
                    <input className={error ? "input" : "input active"} name="password" value={formData.password} onChange={handleChange} type={eye? 'text' : 'password'} placeholder="Password" required />
                    <p className="formeye" onClick={ () => setEye(prev => !prev)}>  
                        {  
                            !eye ? <AiFillEye/> : <AiFillEyeInvisible/>
                        }
                    </p>
                </div>
                <p className={error ? "msg" : "msg active"}>Данные уже используются</p>
                {/* <button className="button" onClick={sunRise}>Зарегистрироваться</button> */}
                <button className="button" type="submit">Зарегистрироваться</button>
            </form> 
            <div className="b">
                <Link to='/input' className="link" >Вход</Link>
            </div>
            {/* <hr className="hrb"/> */}
        </div>
        
        
    )
}
export default Registr