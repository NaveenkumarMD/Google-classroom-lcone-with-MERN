import React from 'react'
import Logo from '../Assets/classroom-logo.svg'
import '../Styles/navbar.css'
import ProfileLogo from '../Assets/profile.png'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory} from 'react-router-dom'
function Navbarwithprofile() {
    const history=useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout=()=>{
        localStorage.clear()
        history.push("/login")
    }
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src={Logo} alt="logo" className="navbar-logo" />
                <div className="logo-name">Classroom</div>
            </div>
            <div className="navbar-profile"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={ProfileLogo} className="img" />
            </div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>

        </div>
    )
}

export default Navbarwithprofile
