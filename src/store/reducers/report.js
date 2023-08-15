import { ALL_JOBS, ALL_PLANS, ALL_REPORTS, ERROR, LOADING, SUCCESS } from "../../Utils/Constant"


const report = (state = {isLoading: true, success: false, error: false, reports: []}, action) =>{
    switch(action.type){
        case LOADING:
            return {...state, isLoading: true}
        case SUCCESS:
            return {...state, isLoading: false, success: true, error: false}
        case ERROR:
            return {...state, isLoading: false, success: false, error: true}
        case ALL_REPORTS:
            return {...state, reports: action.payload.reports}
        default:
            return state;

    }
}

export default report;
