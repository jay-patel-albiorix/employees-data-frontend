import {
    SET_EMPLOYEE_FORM_INITIAL_VALUES,
    CLEAR_EMPLOYEE_FORM_INITIAL_VALUES,
} from '../action-types'

import api from '../../api'

export const setInitialValues = data => ({
    type: SET_EMPLOYEE_FORM_INITIAL_VALUES,
    payload: data,
})

export const clearInitialValues = () => ({
    type: CLEAR_EMPLOYEE_FORM_INITIAL_VALUES,
})

export const getById = id => async dispatch => {
    try {
        if(!id) throw new Error("id is required to get document")
        
        const { data } = await api.employee.getById(id)
        console.log("getById data", data)

        dispatch(setInitialValues(data))
        return data
    } catch(err) {
        console.log("get employee by id failed", err)
    }
} 