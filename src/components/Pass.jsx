import { useState } from "react"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
function Pass(){
    const [eye, setEye] = useState(false)
    return(
        <div className="inp_pass">
            <input className="input" type={eye? 'text' : 'password'} placeholder="Password"/><br />
            <div className="eye" onClick={ () => setEye(prev => !prev)}>  
                {  
                    !eye ? <AiFillEye/> : <AiFillEyeInvisible/>
                }
            </div>
        </div>
    )
}
export default Pass