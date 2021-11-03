import React from 'react'
import Navbarwithprofile from '../Components/Navbarwithprofile'
import Logo from '../Assets/classroom-logo.svg'
import { Link } from 'react-router-dom'
function Createroom() {
    return (
        <div>
            <Navbarwithprofile/>
            <div className="container">
                <img src={Logo} width="150px"/>
                <div className="title" >Create room</div>
                <div className="form">
                    <label className="input-label">Room name</label><br/>
                    <input className="input"/><br/>
                </div>
                <button className="submit-btn" style={{marginBottom:"20px"}}>Submit</button>
             
            </div>
        </div>
    )
}

export default Createroom
