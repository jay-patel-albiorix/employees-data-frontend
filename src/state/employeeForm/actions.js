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
            return await api.employee.put(id, values)
        } else {
            return await api.employee.post(values)
        }
    } catch({message, response}) {
        console.log("submitting employee form failed", message, response)
        return Promise.reject({message, response})
        // return err
    }
}

export const remove = id => async dispatch => {
    try {
        return api.employee.delete(id)
    } catch(err) {
        console.log("removing employee failed", err)
    }
} 