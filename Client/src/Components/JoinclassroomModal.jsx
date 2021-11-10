import React,{useState} from 'react'
import { GrClose } from "react-icons/gr";
import {toast} from 'react-toastify'
function JoinclassroomModal({closeModal}) {
    const [roomid,setRoom_id]=useState(null)
    const submit=()=>{
        if( roomid===null){
            return toast.error("Enter the room code")
        }
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
        <>
            <div className="modal-close-btn" onClick={closeModal}><GrClose /></div>
            <div className="modal-header" style={{ alignItems: "center" }}>
                <div className="join-class-text">
                    <div>Join Class</div>

                    <div>Join a class to start learning,Ask your class teacher for the class code</div>
                </div>

            </div>
            <div className="modal-body">
                <input type="text" placeholder="Class Code" value={roomid} onChange={e=>setRoom_id(e.target.value)} /><br />
                <button onClick={submit}>Submit</button>
            </div>
            <div>

            </div>
        </>
    )
}

export default JoinclassroomModal
