import React from 'react'
import Logo from '../Assets/classroom-logo.svg'
import '../Styles/navbar.css'
function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src={Logo} alt="logo" className="navbar-logo" />
                <div className="logo-name">Classroom</div>
            </div>
        </div>
    )
}

export default Navbar
