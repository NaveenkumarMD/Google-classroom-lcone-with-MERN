import React from 'react'
import Worksicon from '../Assets/works.png'
import driveicon from '../Assets/drive.png'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
function Classcard({ roomdata }) {
    const history = useHistory()
    const dispatch = useDispatch()
    console.log("roomdata is ",roomdata)
    return (
        <div className="class-card" onClick={async() => {
            await dispatch({type:"ROOMDATA",payload:roomdata})
            history.push({
                pathname: "/room/stream",
                state: {
                    roomdata: roomdata
                }
            })
        }}>
            <div className="card-top">
                <div style={{ width: "100%", height: "100%", position: "absolute" }}>
                    <div className="classname">
                        {roomdata.room_name}
                    </div>
                    <div className="owner_name">
                        {roomdata.room_owner_name}
                    </div>
                </div>
            </div>
            <div className="card-bottom">
                <div />
                <div className="icons">
                    <img src={Worksicon} alt="works-icon" className="works-icon" />
                    <img src={driveicon} alt="works" className="works-icon" />
                </div>

            </div>
        </div>
    )
}

export default Classcard
