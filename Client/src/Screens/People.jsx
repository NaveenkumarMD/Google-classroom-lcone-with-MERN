import React from 'react'
import '../Styles/stream.css'
import Logo from '../Assets/profile.png'
import Navbarwithprofileshadow from '../Components/navbarwithoutshadow'
import '../Styles/people.css'
import { useSelector } from 'react-redux'
function People() {
    const people = useSelector(state => state.user.roomdata)
    const students = people.students || []
    const teachers = people.teachers || []

    return (
        <div>
            <Navbarwithprofileshadow page="people" />
            <div className="people-container">
                <div>
                    <div className="title-people">Teachers</div>
                    {
                        teachers && teachers.map(teacher => {
                            return (
                                <div className="people-card">
                                    <div>
                                        <img src={Logo} alt="" width="50" />
                                    </div>
                                    <div className="people-name">{teacher.name.toUpperCase()}</div>
                                </div>
                            )
                        })
                    }


                    <div className="title-people-card">
                        <div>Students</div>
                        <div>{students.length || 0} students</div>
                    </div>
                    {
                        students && students.map(student => {
                            return (
                                <div className="people-card">
                                    <div>
                                        <img src={Logo} alt="" width="50" />
                                    </div>
                                    <div className="people-name">{student.name.toUpperCase()}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default People
