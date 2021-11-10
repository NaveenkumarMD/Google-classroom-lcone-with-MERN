import React from 'react'
import '../Styles/login.css'
import Navbar from '../Components/Navbar'
import Logo from '../Assets/classroom-logo.svg'
import { Link } from 'react-router-dom'
import {toast, ToastContainer } from 'react-toastify'
import {useHistory} from 'react-router-dom'
import { GrMail } from 'react-icons/gr'
// component used react boostrap
function Signup() {
    const history = useHistory()
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [name,setname] = React.useState(null)
    const submit=()=>{
        if (email==null || undefined || '' || password==null || undefined || '' || name==null || undefined || '') {
            return toast.error('Please fill all the fields')
        }
        if (password.length<6) {
            return toast.error('Password must be atleast 6 characters long')
        }
        //mail validate
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return toast.error('Invalid email address')
        }
        fetch('/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                name:name
            })    
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            toast.success("Signup successful")
            history.push('/login')
        }).catch(err=>{
            toast.error("Signup failed")
        })
    }
    return (
        <div>

            <Navbar   />
            <div className="container signup-container">
                <img src={Logo} width="150px"/>
                <div className="title">Signup</div>
                <div className="form">
                    <label className="input-label" >Name</label><br/>
                    <input className="input" value={name} onChange={(e)=>setname(e.target.value)}/><br/>
                    <label className="input-label" >Email</label><br/>
                    <input className="input" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
                    <label className="input-label" >Password</label><br/>
                    <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
                </div>
                <button className="submit-btn" onClick={submit}>Submit</button>
                <Link className="link">New to Classroom?</Link>
            </div>
        </div>
    )
}

export default Signup
