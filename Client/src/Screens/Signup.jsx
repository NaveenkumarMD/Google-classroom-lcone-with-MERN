import React from 'react'
import '../Styles/login.css'
import Navbar from '../Components/Navbar'
import Logo from '../Assets/classroom-logo.svg'
import { Link } from 'react-router-dom'
// component used react boostrap
function Signup() {
    return (
        <div>
            <Navbar   />
            <div className="container signup-container">
                <img src={Logo} width="150px"/>
                <div className="title">Signup</div>
                <div className="form">
                    <label className="input-label">Name</label><br/>
                    <input className="input"/><br/>
                    <label className="input-label">Email</label><br/>
                    <input className="input"/><br/>
                    <label className="input-label">Password</label><br/>
                    <input className="input" type="password"/><br/>
                </div>
                <button className="submit-btn">Submit</button>
                <Link className="link">New to Classroom?</Link>
            </div>
        </div>
    )
}

export default Signup
