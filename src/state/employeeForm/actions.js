import {
} from '../action-types'

import api from '../../api'

import { setGlobalAlert } from '../globalAlert/actions'

export const getById = id => async dispatch => {
    try {
        if(!id) throw new Error("id is required to get document")
        
        const { data } = await api.employee.getById(id)
        console.log("getById data", data)

        return data
    } catch({message, response}) {
        console.log("get employee by id failed", message, response)
        dispatch(setGlobalAlert(
            "error",
            "Getting employee doc failed"
        ))
        return Promise.reject({message, response})

    }
} 

export const submit = (id, values) => async dispatch => {
    try {
        if(id) {
            delete values.updatedAt

            return await api.employee.put(id, values)
        } else {
            return await api.employee.post(values)
        }
    } catch({message, response}) {
        console.log("submitting employee form failed", message, response)
        // error shown in component
        return Promise.reject({message, response})
    }
}

export const remove = id => async dispatch => {
    try {
        const response = await api.employee.delete(id)
        console.log("response", response)
        return response
    } catch({message, response}) {
        console.log("removing employee failed", message, response)
        dispatch(setGlobalAlert(
            "error",
            "Removing employee doc failed"
        ))
        return Promise.reject({message, response})
    }
} 

export const upload = formData => async dispatch => {
    try {
        console.log("upload action formData", formData)
        return api.employee.upload(formData)
    } catch({message, response}) {
        console.log("uploading failed", message, response)
        dispatch(setGlobalAlert(
            "error",
            "Uploading failed"
        ))
        return Promise.reject({message, response})
    }
}