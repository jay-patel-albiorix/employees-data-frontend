import {
} from '../action-types'

import api from '../../api'

export const getById = id => async dispatch => {
    try {
        if(!id) throw new Error("id is required to get document")
        
        const { data } = await api.employee.getById(id)
        console.log("getById data", data)

        return data
    } catch(err) {
        console.log("get employee by id failed", err)
    }
} 

export const submit = (id, values) => async dispatch => {
    try {
        if(id) {
            return api.employee.put(id, values)
        } else {
            return api.employee.post(values)
        }
    } catch(err) {
        console.log("submitting employee form failed", err)
        Promise.reject(err)
    }
}

export const remove = id => async dispatch => {
    try {
        return api.employee.delete(id)
    } catch(err) {
        console.log("removing employee failed", err)
    }
} 