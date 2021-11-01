import {combineReducers} from 'redux'
import userReducer  from './userreducer'    
export default combineReducers({
    user: userReducer,
})  