import React from 'react'
import '../Styles/stream.css'
import Announcementlogo from '../Assets/shout.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
import Note from '../Components/Note'
function Stream() {
    return (
        <div>
            <Navbarwithprofileshadow page="stream" />
            <div className="top-image">
                <div></div>
                <div className="name-container">
                    <div className="name">CSE</div>
                    <div className="createdon">2020 August</div>
                </div>
            </div>
            <div className="stream-container-main">
                <div className="work-dues">
                    <div className="work-dues-header">
                        <div className="work-dues-header-text">Upcoming</div>
                    </div>
                    <div className="no-work-message">Woho! no work due soon</div>
                    <div className="work-dues-body">
                        <div className="work-dues-body-item">
                            <div className="work-dues-body-item-header">
                                <div className="work-dues-body-item-header-text">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-all-container">
                        <div></div>
                        <div className="view-all">View all</div>
                    </div>
                </div>
                <div className="container-stream">
                    <Note />
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                    <div className="stream-card">
                        <div>
                            <div className="icon-container">
                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                            </div>
                        </div>
                        <div>
                            <div className="card-header-text">Jenso peter posted an new assignment</div>
                            <div className="card-createdon">October 5 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stream
