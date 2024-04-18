import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"


const Registr = () => {
    const [eye, setEye] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)
    const [error, setError] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_repeat: '',
    });

    const changeEyes = (e) => {
        if(e.target.dataset.form === "password"){
            if(eye){
                setEye(prev => !prev)
                e.target.className = "eye_form close"
            }
            else{
                setEye(prev => !prev)
                e.target.className = "eye_form";
            }
        }
        else{
            if(eyeRepeat){
                setEyeRepeat(prev => !prev)
                e.target.className = "eye_form close"
            }
            else{
                setEyeRepeat(prev => !prev)
                e.target.className = "eye_form";
            }
        }
    }

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
        axios.post('http://diplomapi.test/api/user', formData)
            .then(res => {
                if (res.data.status) {
                    console.log(res.data)
                    window.location.href = "/"
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        password_repeat: '',
                    });
                }
                else {
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

    return (
        <div className="body">
            <div className="main">
                <p className="logoText">Task Wave</p>
                <p className="title">Регистрация</p>

                <form onSubmit={handleSubmit} className="form">
                    
                    <input type="text" name="name" placeholder="Имя" className={error ? "input" : "input active"} required value={formData.name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Электронная почта" className={error ? "input" : "input active"} required value={formData.email} onChange={handleChange} />
                    <div className="pass">
                        <input className={error ? "input" : "input active"} name="password" value={formData.password} onChange={handleChange} type={eye ? 'text' : 'password'} placeholder="Пароль" required />
                        <div className="eye_form close" data-form="password" onClick={changeEyes}></div>
                    </div>

                    <div className="pass">
                        <input className={error ? "input" : "input active"} name="password_repeat" value={formData.password_repeat} onChange={handleChange} type={eyeRepeat ? 'text' : 'password'} placeholder="Повтор пароля" required />
                        <div className="eye_form close" data-form="password_repeat" onClick={changeEyes}></div>
                    </div>
            

                    <p className={error ? "msg" : "msg active"}>Данные уже используются</p>

                    <button className="button" type="submit">Зарегистрироваться</button>
                </form>

                <div className="b">
                    <Link to='/' className="link" >Вход</Link>
                </div>
            </div>
        </div>


    )
}
export default Registr