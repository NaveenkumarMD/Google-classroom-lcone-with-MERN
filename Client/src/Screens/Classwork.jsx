import React from 'react'
import '../Styles/stream.css'
import Logo from '../Assets/notepad.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
import { useHistory } from 'react-router-dom'
import plus from '../Assets/plus1.svg'
import { useSelector } from 'react-redux'
function Classwork() {
    const store = useSelector(state => state.user)
    const work = useSelector(state => state.user.roomannouncements)
    const history = useHistory()
    return (
        <div>
            <Navbarwithprofileshadow page="work" />
            <div className="people-container">
                <div>
                    {
                        work.works && work.works.map((item, index) => {
                            let time=new Date(item.due)
                            return (
                                <div className="work-card" onClick={() => history.push(`/room/work/${item._id}`)}>
                                    <div className="work-card-name">
                                        <div className="logo-container">
                                            <img src={Logo} alt="" width="50" />
                                        </div>

                                        <div className="people-name">{item.title}</div>
                                    </div>
                                    <div className="work-card-due">Due {time.toLocaleString('en-us', { month: 'short' })+" "+ time.getDate()}</div>
                                </div>
                                )
                        })
                    }
                </div>
            </div>
            {
                store.userdata.classesasteacher.includes(store.roomdata._id) &&

                <div className="create-new-work-container">
                    <img src={plus} width="18px" style={{ marginLeft: "3px", marginRight: "5px" }} />
                    <div>Create</div>
                </div>
            }

        </div>
    )
}

export default Classwork
