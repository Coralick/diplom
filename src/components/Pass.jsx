import { useState } from "react"
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'

function Pass(valueState){
    const [eye, setEye] = useState(false)

    return(
            <div className="pass">
                    <input className="input" type={eye? 'text' : 'password'} placeholder="Password" required />
                    <p className="formeye" onClick={ () => setEye(prev => !prev)}>  
                        {  
                            !eye ? <AiFillEye/> : <AiFillEyeInvisible/>
                        }
                    </p>
            </div>

    )
}
export default Pass