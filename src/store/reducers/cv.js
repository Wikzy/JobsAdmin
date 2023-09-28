import {CVBY_USER, ERROR, LOADING, SUCCESS } from "../../Utils/Constant"


const cv = (state = {isLoading: true, success: false, error: false, cv: []}, action) =>{
    switch(action.type){
        case LOADING:
            return {...state, isLoading: true}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true}
        case CVBY_USER:
            return {...state, cv: action.payload}
        default:
            return state;
    }
}

export default cv;