import React ,{useEffect}from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Classwork from './Screens/Classwork'
import Createroom from './Screens/Createroom'
import Home from './Screens/Home'
import Login from './Screens/Login'
import People from './Screens/People'
import Signup from './Screens/Signup'
import Stream from './Screens/Stream'
import Workview from './Screens/Workview'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store, persistor } from './Store/index'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector, useDispatch } from 'react-redux'
import JoinroomasStudent from './Screens/JoinroomasStudent'
import Creatework from './Screens/Creatework'
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer hideProgressBar={true} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path="/room/*" component={Roomroute} />
            <Route path="/createroom" component={Createroom} />
            <Route path="/join" component={JoinroomasStudent}/>
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  )
}


function Roomroute() {
  const dispatch=useDispatch()
  const roominfo = useSelector(state => state.user.roomdata)
  const roomannouncements = useSelector(state => state.user.roomannouncements)
  useEffect(()=>{
    fetch("/getroom",{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
        "Authorization":'Bearer '+localStorage.getItem('token')
      },
      body:JSON.stringify({
        id:roominfo._id
      })
    }).then(res=>res.json()).then(res=>{
      if(res.error){
        return toast.error("failed to fetch")
      }
      dispatch({
        type:"ROOMDATA",
        payload:res.data
      })
    })
  },[])
  useEffect(() => {
    fetch('/roomposts', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room: roominfo._id
      })
    }).then(res => res.json()).then(result => {
      if (result.error) {
        return console.log(result.error)
      }
      dispatch({
        type: "ROOMANNOUNCEMENTS",
        payload: result.data
      })
      console.log(result.data)
    })
  }, [])
  return (
    <div>
      <Switch>
        <Route path="/room/stream" exact component={Stream} />
        <Route path="/room/work" exact component={Classwork} />
        <Route path="/room/people" exact component={People} />
        <Route path="/room/work/:id" exact component={Workview} />
        <Route path="/room/creatework" exact component={Creatework} />
      </Switch>
    </div>
  )
}
export default App
