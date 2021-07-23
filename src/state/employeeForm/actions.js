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