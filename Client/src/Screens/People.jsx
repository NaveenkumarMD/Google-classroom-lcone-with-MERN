import React from 'react'
import '../Styles/stream.css'
import Logo from '../Assets/profile.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
import '../Styles/people.css'
function People() {
    return (
        <div>
            <Navbarwithprofileshadow page="people"/>
            <div className="people-container">
                <div>
                    <div className="title-people">Teachers</div>
                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>
                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>
                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>
                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>
                    <div className="title-people-card">
                    <div>Students</div>
                    <div>206 students</div>
                    </div>

                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>                    <div className="people-card">
                        <div>
                            <img src={Logo} alt="" width="50"/>
                        </div>
                        <div className="people-name">NAVEEN KUMAR</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default People
