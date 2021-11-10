import React, { useEffect, useState } from 'react'
import '../Styles/stream.css'
import Announcementlogo from '../Assets/shout.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
import Note from '../Components/Note'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
function Stream() {
    const roominfo = useSelector(state => state.user.roomdata)
    const roomannouncements = useSelector(state => state.user.roomannouncements)
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [announcementnote, setannouncementnote] = useState(null)

    console.log("Redux state is ", roominfo)

    const createannouncement = (content) => {
        fetch('/createannouncement', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                room: roominfo._id,
                title: content
            })
        }).then(res => res.json()).then(result => {
            if (result.error) {
                toast.error(result.error)
                return console.log(result.error)
            }
            toast.success('Announcement Created')
            console.log(result.data)
        })
    }
    return (
        <div>
            <Navbarwithprofileshadow page="stream" />
            <div className="top-image">
                <div></div>
                <div className="name-container">
                    <div className="name">CSE</div>
                    <div className="createdon">2020 August</div>
                </div>
            </div>
            <div className="stream-container-main">
                <div className="work-dues">
                    <div className="work-dues-header">
                        <div className="work-dues-header-text">Upcoming</div>
                    </div>
                    <div className="no-work-message">Woho! no work due soon</div>
                    <div className="work-dues-body">
                        <div className="work-dues-body-item">
                            <div className="work-dues-body-item-header">
                                <div className="work-dues-body-item-header-text">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-all-container">
                        <div></div>
                        <div className="view-all">View all</div>
                    </div>
                </div>
                <div className="container-stream">
                    <Note setannouncementnote={setannouncementnote} announcementnote={announcementnote}
                        createannouncement={createannouncement}
                    />
                    {
                        roomannouncements && roomannouncements.map((announcement, index) => {
                            let time=new Date(announcement.createdon)
                            console.log(time.getDate())

                            return (
                                <div className="stream-card-container" key={index}>
                                    <div className="stream-card">
                                        <div>
                                            <div className="icon-container">
                                                <img src={Announcementlogo} alt="logo" width="23px" height="23px" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="card-header-text">{announcement.createdby.name} posted a new announcement</div>
                                            <div className="card-createdon">{time.toLocaleString('en-us', { month: 'short' })+" "+ time.getDate()} </div>

                                        </div>

                                    </div>
                                    <div className="card-content">
                                        {announcement.title}
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Stream
