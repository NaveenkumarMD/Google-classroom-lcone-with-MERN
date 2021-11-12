import React from 'react'
import '../Styles/login.css'
import Navbar from '../Components/Navbar'
import Logo from '../Assets/classroom-logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

function Creatework() {
    const dispatch = useDispatch()
    const roomdata = useSelector(state => state.user.roomdata)
    const history = useHistory()
    const [title, setTitle] = React.useState(null)
    const [description, setDescription] = React.useState(null)
    const [due, setDue] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const submit =  (fileurl) => {
        console.log(title, description, due, file)
        if (title == null || description == null || due == null || file == null) {
            return toast.error("Please fill all the fields")
        }
        if (!fileurl) {
            return toast.error("Please upload a file")
        }
        let files = [fileurl]
        fetch('/creatework', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                title,
                description,
                due,
                files,
                room: roomdata._id
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                return toast.error(data.error)
            }
            toast.success("Work created successfully")
            history.push('/room/stream')
        }).catch(error => {
            toast.error(error)
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
            submit(data.url)
        }).catch(error => {
            console.log("error occured")
            toast.error("Error Occured")
            return null
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">

                <div className="title">Create work</div>
                <div className="form">
                    <label className="input-label">Title</label><br />
                    <input className="input" value={title} onChange={e => setTitle(e.target.value)} /><br />
                    <label className="input-label" >Description</label><br />
                    <textarea rows="4" className="input" value={description} onChange={e => setDescription(e.target.value)} /><br />
                    <label className="input-label">Due date</label><br />
                    <input className="input" type="datetime-local" value={due} onChange={e => setDue(e.target.value)} /><br />
                    <label className="input-label">File</label><br />
                    <input className="input" type="file" onChange={e => setFile(e.target.files[0])} /><br />
                </div>
                <button className="submit-btn" onClick={upload}>Submit</button>
                <Link className="link" to="/signup">New to Classroom?</Link>
            </div>
        </div>
    )
}

export default Creatework
