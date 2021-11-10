import React from 'react'
import Navbarwithprofile from '../Components/Navbarwithprofile'
import Logo from '../Assets/classroom-logo.svg'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
function Createroom() {
    const [roomName, setRoomName] = React.useState('')
    const submit=()=>{
        if (roomName==null){
            toast.error("Please enter a room name")
        }
        fetch("/createroom",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                room_name:roomName
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                toast.error(data.error)
            }
            toast.success("Room created successfully")
        })
    }

    return (
        <div>
            <Navbarwithprofile/>
            <div className="container">
                <img src={Logo} width="150px"/>
                <div className="title" >Create room</div>
                <div className="form">
                    <label className="input-label">Room name</label><br/>
                    <input className="input" value={roomName} onChange={e=>setRoomName(e.target.value)}/><br/>
                </div>
                <button className="submit-btn" style={{marginBottom:"20px"}} onClick={submit}>Submit</button>
             
            </div>
        </div>
    )
}

export default Createroom
