import { Button } from '@material-ui/core'
import * as React from 'react'
import '../../App.css'
import axios from 'axios'

const Login=()=>{

    const[email,setEmail]=React.useState('')
    const[pass,setPass]=React.useState(null)


    return(
        <div className='general-container'>
            <input placeholder='email...' onChange={(event)=>{setEmail(event.target.value)}}/>
            <input placeholder='pass...' onChange={(event)=>{setPass(event.target.value)}}/>
            <Button style={{backgroundColor:'blue',borderRadius:'10px'}} onClick={()=>{
                axios({
                    method: 'POST',
                    url: 'https://petwalkapp.herokuapp.com/users/login',
                    data: {
                        "email":email,
                        "pass":pass
                    }
                })
                .then((data)=>{
                    console.log(data.data.token);
                    localStorage.setItem("token", data.data.token);
                    window.location.href = "/myInfo";
                })
                .catch((err)=>{
                    if(err)
                    console.log("login error:\n"+err)
                    return
                })
            }} >Enter</Button>
        </div>
    )
}

export default Login