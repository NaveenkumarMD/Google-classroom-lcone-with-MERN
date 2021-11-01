import React from 'react'
import Classcard from '../Components/Classcard'

import '../Styles/home.css'
import todo from '../Assets/todo.png'
import toreview from '../Assets/review1.png'
import Navbarwithprofile from '../Components/Navbarwithprofile'
function Home() {
    return (
        <div>
            <Navbarwithprofile/>
            <div className="top-bar-options">
                <img src={todo} width="25px"/>
                <span>To do</span>

                <img src={toreview} width="25px"/>
                <span>To review</span>
            </div>
            <div className="classes-home">
                <Classcard/>
                <Classcard/>
                <Classcard/>
                <Classcard/>
                <Classcard/>
                <Classcard/>
                <Classcard/>
                <Classcard/>

            </div>
        </div>
    )
}

export default Home
