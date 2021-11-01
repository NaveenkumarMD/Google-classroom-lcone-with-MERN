import React from 'react'
import Logo from '../Assets/classroom-logo.svg'
import '../Styles/navbar.css'
import {useHistory} from 'react-router-dom'
import ProfileLogo from '../Assets/profile.png'

function Navbarwithprofileshadow({page}) {
    const history=useHistory()
    return (
        <>
            <div className="navbar" style={{ border: "none", height: "60px" }}>
                <div className="navbar-brand">
                    <img src={Logo} alt="logo" className="navbar-logo" />
                    <div className="logo-name">Classroom</div>
                </div>
                <div className="navbar-profile">
                    <img src={ProfileLogo} className="img" />
                </div>
            </div>
            <div className="tab-bar">
                <div onClick={()=>history.push("/room/stream")} 
                 style={{color: page=="stream" ? "green":"",borderBottomColor:page=="stream"?"green":""}}>Stream</div>
                <div onClick={()=>history.push("/room/work")} 
                 style={{color: page=="work" ? "green":"",borderBottomColor:page=="work"?"green":""}}>Classwork</div>
                <div onClick={()=>history.push("/room/people")}   
                style={{color: page=="people" ? "green":"",borderBottomColor:page=="people"?"green":""}}>People</div>
            </div>
        </>
    )
}

export default Navbarwithprofileshadow
