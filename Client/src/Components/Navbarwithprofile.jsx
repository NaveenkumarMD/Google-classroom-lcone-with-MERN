import React from 'react'
import Logo from '../Assets/classroom-logo.svg'
import '../Styles/navbar.css'
import ProfileLogo from '../Assets/profile.png'
function Navbarwithprofile() {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src={Logo} alt="logo" className="navbar-logo" />
                <div className="logo-name">Classroom</div>
            </div>
            <div className="navbar-profile">
                <img src={ProfileLogo} className="img"/>
            </div>
        </div>
    )
}

export default Navbarwithprofile
