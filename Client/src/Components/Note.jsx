import React, { useRef, useState } from 'react'
import '../Styles/note.css'
import ProfileLogo from '../Assets/profile.png'
function Note({ announcementnote, setannouncementnote,createannouncement }) {
    const [flag, setFlag] = useState(false)
    const contentref = useRef(null)
    const handleclick = () => {
        console.log(contentref)
    }
    if (flag) {
        return (
            <div className="card-after-container" >
                <div
                    name="textbox"
                    ref={contentref}
                    className="input-container"
                    onChange={e => handleclick()}
                    contentEditable="true"
                    role="textbox"
                    aria-multiline="true"
                    tabIndex="0px"
                    placeholder="Type something..."
                    spellCheck="false">
                </div>
                <div className="note-options">
                    <div></div>
                    <div className="note-options-base">
                        <div onClick={() => setFlag(false)}>Cancel</div>
                        <div onClick={() => {
                            console.log(contentref.current.innerText)
                            setannouncementnote(contentref.current.innerText)
                            createannouncement(contentref.current.innerText)
                            contentref.current.innerText = ""
                            setFlag(false)
                        }}>Post</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="card-before-container" onClick={() => setFlag(true)}>
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
