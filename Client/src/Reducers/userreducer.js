import {LOGIN} from '../Actions/Types'
const initialState={
    userdata:{},
    classes:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                userdata:action.payload
            }
    }

}