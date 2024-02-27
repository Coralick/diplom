import Button from "../../components/Button"
import Pass from "../../components/Pass"
import { Link } from "react-router-dom"
function Registr () {
    return(
        <div>
            <p className="title">РЕГИСТРАЦИЯ</p>
            <form className="form">
                <input type="text" placeholder="Имя" className="input"/><br />
                <input type="email"  placeholder="Email" className="input"/><br />
                <Pass/>
                
                <Button>Зарегистрироваться</Button>
            </form> 
                <Link to='/input' className="link">Вход</Link>
        </div>
        
        
    )
}

export default Registr