import React from 'react'
import '../Styles/workview.css'
import Addwork from '../Assets/add.png'
import profile1 from '../Assets/profile-1.png'
import profile2 from '../Assets/profile-2.png'
import work from '../Assets/notepad.png'
import send from '../Assets/send.png'
import Navbarwithprofile from '../Components/Navbarwithprofile'
import { display } from '@mui/system'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Workview() {
    const { id } = useParams()
    const state = useSelector(state => state.user.roomannouncements)
    const [file, setFile] = React.useState(null)
    const data = state.works.filter(item => item._id === id)[0]
    const clickInput = () => {
        document.getElementById('file-input').click()
    }
    const getFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    const attachwork = (url) => {
        fetch("/attachwork", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                workid: data._id,
                files: [url]
            })

        }).then(res => res.json()).then(res => {
            console.log(res)
            if (res.error) {
                return toast.error(res.error)
            }
            toast.success("Work Attached")
        })

            .catch(err => {
                console.log(err)
                toast.error("Error in attaching work")
            })
    }
    const upload = () => {
        const data = new FormData
        data.append("file", file)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "naveenkumarmd")
        fetch("https://api.cloudinary.com/v1_1/naveenkumarmd/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {

            console.log(data.url)
            toast.success("Image Uploaded Successfully")
            attachwork(data.url)

        }).catch(error => {
            console.log("error occured")
            toast.error("Error Occured")
        })
    }

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
                    <div style={{ width: "86%" }}>
                        <div className="work-details-container">
                            <div className="header">
                                <div>{data.title}</div>
                                <div>{data.createdby.name} {new Date(data.createdon).toLocaleString('en-us', { month: 'short' }) + " " + new Date(data.createdon).getDate()}</div>
                                <div className="flex-space-between metadata">
                                    <div>
                                        20 points
                                    </div>
                                    <div>
                                        Due {new Date(data.due).toLocaleString('en-us', { month: 'short' }) + " " + new Date(data.due).getDate()}
                                    </div>
                                </div>
                            </div>
                            <div className="work-description">
                                {data.description}


                            </div>
                            <div className="work-description" >
                                <div style={{ fontSize: "20px" }}>Files</div>
                                <div>
                                    <a href={data.files[0]}>File</a>
                                </div>
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
                        <input type="file" id="file-input" style={{ display: "none" }} onChange={getFile} />
                        <div className="addwor-button" onClick={clickInput}>
                            <img src={Addwork} width="23" />   Add
                        </div>
                        <div className="work-submit-button" onClick={upload}>
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
