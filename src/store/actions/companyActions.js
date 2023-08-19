import * as api from '../../store/index'
import { ALL_COMPANIES, CREATE_COMPANY, DELETE_COMPANIES, DELETE_COMPANY, GET_COMPANIES, GET_COMPANY, LOADING, SUCCESS, UPDATE_COMPANIES, UPDATE_COMPANY } from '../../Utils/Constant';

export const AllCompanies = () => async (dispatch) => {
    try {
        dispatch ({ type: LOADING })
        const { data: { data } } = await api.fetchAllCompanies();
        dispatch ({ type: ALL_COMPANIES, payload: { companies: data }})
        dispatch ({ type: SUCCESS })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany = (id) => async (dispatch) => {
    try{
        const { data } = await api.fetchCompany(id);
        dispatch ({ type: GET_COMPANY, payload: data})
    } catch(error){
        console.log(error)
    }
}

export const createCompany = (company) => async (disptach) => {
    try{
        const { data : {data} } = await api.createCompany(company);
        disptach({ type: CREATE_COMPANY, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateCompany = (id , company) => async (dispatch) => {
    try{
        const { data: {data}} = await api.updateCompany(id , company)
        dispatch({ type: UPDATE_COMPANY, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteCompany = (id) => async (dispatch) => {
    try{
        const {data} = await api.deleteCompany(id)
        console.log(id)
        dispatch({ type: DELETE_COMPANY, payload : id})
    }catch(error){
        console.log(error)
    }
}