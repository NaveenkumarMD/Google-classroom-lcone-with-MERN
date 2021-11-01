import React,{useState} from 'react'
import '../Styles/note.css'
import ProfileLogo from '../Assets/profile.png'
function Note() {
    const [flag,setFlag]=useState(false)
    if (flag){
        return (
            <div className="card-after-container" >
                <div contentEditable="true" className="input-container">
                    hello
                </div>
                <div className="note-options">
                    <div></div>
                    <div className="note-options-base">
                        <div onClick={()=>setFlag(false)}>Cancel</div>
                        <div>Post</div>
                    </div>
                </div>
            </div>
        )
    }
    return (        
        <div className="card-before-container" onClick={()=>setFlag(true)}>
            <div>
                <div className="icon-containe">
                    <img src={ProfileLogo} alt="logo" width="45px" height="45   px" />
                </div>
            </div>
            <div>
                <div className="card-header-text" style={{ fontWeight: "500", fontSize: "14px" }}>Announce something to your class</div>
            </div>
        </div>
    )
}

export default Note
