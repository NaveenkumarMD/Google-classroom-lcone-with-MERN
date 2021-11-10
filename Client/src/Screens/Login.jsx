import React from 'react'
import '../Styles/login.css'
import Navbar from '../Components/Navbar'
import Logo from '../Assets/classroom-logo.svg'
import { Link,useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
// component used react boostrap
function Login() {
    const history=useHistory()
    const dispatch=useDispatch()
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const submit=()=>{
        //validate mail and password and check for null
        if(email==null || password==null){
            return toast.error("Please enter email and password");
        }
        //email regex verification
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return toast.error("Please enter valid email");
        }
        if(password.length<6){
            return toast.error("Password must be atleast 8 characters");
        }
        fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'   
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                return toast.error(data.error);
            }
            toast.success("Login Successful");
            localStorage.setItem('token',data.token)
            dispatch({type:'LOGIN',payload:data.user})
            history.push('/')
        }).catch(err=>{
            console.log(err);
            toast.error("Something went wrong");
        })

    }
    return (
        <div>
            <Navbar   />
            <div className="container">
                <img src={Logo} width="150px"/>
                <div className="title">Login</div>
                <div className="form">
                    <label className="input-label">Email</label><br/>
                    <input className="input" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
                    <label className="input-label" >Password</label><br/>
                    <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
                </div>
                <button className="submit-btn" onClick={submit}>Submit</button>
                <Link className="link" to="/signup">New to Classroom?</Link>
            </div>
        </div>
    )
}

export default Login
