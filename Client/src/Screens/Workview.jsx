import React from 'react'
import '../Styles/workview.css'
import Addwork from '../Assets/add.png'
import profile1 from '../Assets/profile-1.png'
import profile2 from '../Assets/profile-2.png'
import work from '../Assets/notepad.png'
import send from '../Assets/send.png'
import Navbarwithprofile from '../Components/Navbarwithprofile'
function Workview() {
    return (
        <div>
            <Navbarwithprofile />
            <div className="workview-container">
                <div className="details-container">
                    <div>
                        <div className="work-img-container">
                            <img src={work} alt="profile" width="25" />
                        </div>
                    </div>
                    <div style={{width:"86%"}}>
                        <div className="work-details-container">
                            <div className="header">
                                <div>Crypto Assignment</div>
                                <div>Jatin Singht Aug 8</div>
                                <div className="flex-space-between metadata">
                                    <div>
                                        20 points   
                                    </div>
                                    <div>
                                        Due Aug 18
                                    </div>
                                </div>
                            </div>
                            <div className="work-description">
                            Cryptography with python assignment:

Go to this site https://cryptopals.com/sets/1 and submit the code of the first 5 questions. Make sure to properly comment on your code in your own words.
You can either submit the individual .py files or a txt or a word document containing all the codes.
                            </div>
                            <div className="class-comments"></div>
                        </div>
                    </div>
                </div>
                <div className="submit-container">
                    <div className="work-submit-container">
                        <div className="your-work-header">
                            <div>Your work</div>
                            <div>Assigned</div>
                        </div>
                        <div className="addwor-button">
                            <img src={Addwork} width="23" />   Add
                        </div>
                        <div className="work-submit-button">
                            Turn in
                        </div>
                    </div>
                    <div className="private-comments-container">
                        <div className="private-comments-header">
                            <img src={profile1} />
                            <span>Private comments</span>
                        </div>
                        <div className="comment-input-container">
                            <div className="profile-icon-2">
                                <img src={profile2} width="40" />
                            </div>
                            <div className="input-container-1">
                                <input type="text" placeholder="Write a comment..." />
                                <img src={send} width="28" height="28" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workview
