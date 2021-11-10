import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import Logo from '../Assets/classroom-logo.svg'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
function JoinroomasStudent() {
    const [roomid,setroomid]=useState(null)
    const submit=()=>{
        fetch("/joinroom",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            body:JSON.stringify({
                room_id:roomid
            })
        }).then(res=>res.json()).then(res=>{
            if(res.error){
                return toast.error(res.error)
            }
            toast.success(res.message)
        })
    }
    return (
        <div>
            <Navbar />
            <div className="container">
                <img src={Logo} width="150px" />
                <div className="title" >Join room</div>
                <div className="title-description">Ask your teacher for the room code</div>
                <div className="form">
                    <label className="input-label">Room Code</label><br />
                    <input className="input" value={roomid} onChange={e => setroomid(e.target.value)} /><br />
                </div>
                <button className="submit-btn" style={{ marginBottom: "20px" }} onClick={submit}>Submit</button>

            </div>
        </div>
    )
}

export default JoinroomasStudent
