import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Classwork from './Screens/Classwork'
import Home from './Screens/Home'
import Login from './Screens/Login'
import People from './Screens/People'
import Signup from './Screens/Signup'
import Stream from './Screens/Stream'
import Workview from './Screens/Workview'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/login'exact component={Login}/>
        <Route path='/signup'exact component={Signup}/>
        <Route path="/room/*" component={Roomroute} />
      </Switch>
    </BrowserRouter>

  )
}

function Roomroute(){
  return(
    <div>
    <Switch>
      <Route path="/room/stream" exact component={Stream} />    
      <Route path="/room/work" exact component={Classwork} /> 
      <Route path="/room/people" exact component={People} />   
      <Route path="/room/work/:id" exact component={Workview} />   
    </Switch>
    </div>
  )
}
export default App
