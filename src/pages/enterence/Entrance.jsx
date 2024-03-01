import axios from "axios"
import Button from "../../components/Button"
import Pass from "../../components/Pass"
import { Link } from "react-router-dom"
function Entrance () {
    let fetchHandler = e => {
        e.preventDefault();
        axios.post('http://diplomapi.test/api/authUser', {
        "email": "mail-email.com2",
        "password": "123413",
        })
        .then(res => {
            // Обработка успешного ответа
            console.log(res);
        })
        .catch(err => {
            // Обработка ошибки
            console.error(err);
        });
    }
    return(
        <div>
            <p className="title">ВХОД</p>
            <form className="form">
                <input className="input" type="email"  placeholder="Email"/><br />
                <Pass/>
                <button className="button" onClick={fetchHandler}>Войти</button>
                {/* <Button>Войти</Button> */}
            </form>
            <Link to='/' className='link'>Зарегистрироваться</Link>
        </div>
        
    )
}

export default Entrance