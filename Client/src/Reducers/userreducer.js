import {LOGIN,GETCLASSES,ROOMDATA, ROOMANNOUNCEMTS} from '../Actions/Types'
const initialState={
    userdata:{},
    classesasstudent:[],
    classesasteacher:[],
    roomdata:null,
    roomannouncements:{
        works:[],
        announcements:[]
    }
    
}

export default (state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                userdata:action.payload
            }
        case GETCLASSES:
            return{
                ...state,
                classesasstudent:action.payload.classesasstudent,
                classesasteacher:action.payload.classesasteacher
            }
        case ROOMDATA:
            return{
                ...state,
                roomdata:action.payload
            }
        case ROOMANNOUNCEMTS:
            return{
                ...state,
                roomannouncements:action.payload
            }
        default:{
            return state
        }
    }

}