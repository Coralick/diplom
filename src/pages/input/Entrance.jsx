import Button from "../../components/Button"
import Pass from "../../components/Pass"
import { Link } from "react-router-dom"
function Entrance () {
    return(
        <div>
            <p className="title">ВХОД</p>
            <form className="form">
                <input className="input" type="email"  placeholder="Email"/><br />
                <Pass/>
                <Button>Войти</Button>
            </form>
            <Link to='/' className='link'>Зарегистрироваться</Link>
        </div>
        
    )
}

export default Entrance