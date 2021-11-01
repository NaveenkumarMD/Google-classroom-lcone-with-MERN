import React from 'react'
import '../Styles/stream.css'
import Logo from '../Assets/notepad.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
function Classwork() {
    return (
        <div>
            <Navbarwithprofileshadow page="work"/>
            <div className="people-container">
                <div>


                    <div className="work-card">
                        <div className="work-card-name">
                        <div className="logo-container">
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        
                        <div className="people-name">NAVEEN KUMAR</div>
                        </div>
                        <div className="work-card-due">Due Aug 15</div>
                    </div>
                    <div className="work-card">
                        <div className="work-card-name">
                        <div className="logo-container">
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        
                        <div className="people-name">NAVEEN KUMAR</div>
                        </div>
                        <div className="work-card-due">Due Aug 15</div>
                    </div>
                    <div className="work-card">
                        <div className="work-card-name">
                        <div className="logo-container">
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        
                        <div className="people-name">NAVEEN KUMAR</div>
                        </div>
                        <div className="work-card-due">Due Aug 15</div>
                    </div>
                    <div className="work-card">
                        <div className="work-card-name">
                        <div className="logo-container">
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        
                        <div className="people-name">NAVEEN KUMAR</div>
                        </div>
                        <div className="work-card-due">Due Aug 15</div>
                    </div>
                    <div className="work-card">
                        <div className="work-card-name">
                        <div className="logo-container">
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        
                        <div className="people-name">NAVEEN KUMAR</div>
                        </div>
                        <div className="work-card-due">Due Aug 15</div>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Classwork
