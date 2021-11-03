import React from 'react'
import Worksicon from '../Assets/works.png'
import driveicon from '../Assets/drive.png'
import {useHistory} from 'react-router-dom'
function Classcard() {
    const history = useHistory()
    return (
        <div className="class-card" onClick={()=>history.push("/room/stream")}>
            <div className="card-top">
            <div style={{width:"100%",height:"100%",position:"absolute"}}>
                    <div className="classname">
                        MATHS
                    </div>
                    <div className="owner_name">
                        Naveenkumar M
                    </div>
                </div>
            </div>
            <div className="card-bottom">
<div/>
                <div className="icons">
                <img src={Worksicon} alt="works-icon" className="works-icon"/>
                <img src={driveicon} alt="works" className="works-icon"/>
                </div>
           
            </div>
        </div>
    )
}

export default Classcard
