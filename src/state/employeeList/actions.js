import _get from 'lodash/get'

import { 
    SET_EMPLOYEE_LIST_DATA,
    CHANGE_EMPLOYEE_LIST_PAGE,
    CHANGE_EMPLOYEE_LIST_ROW_PER_PAGE,
    CHANGE_FILTER_EMPLOYEE_LIST,
} from '../action-types'

import api from '../../api'

export const getListData = (skip, limit, search) => async dispatch => {
    try {
        const query = {
            params: {
                skip,
                limit,
                // filter: search ? { 
                //     $or: [ 
                //         { 
                //             "personal_details.first_name": { 
                //                 $regex: search, 
                //                 $options: "i" 
                //             } 
                //         } 
                //     ] 
                // }: {},
            },
        }
        const { data } = await api.employee.get(query)

        console.log("setting list", data)
        dispatch({
            type: SET_EMPLOYEE_LIST_DATA,
            payload: data
        })

    } catch(err) {
        console.log("getting list failed", err)
    }
}

export const changePage = newPageIndex => ({
    type: CHANGE_EMPLOYEE_LIST_PAGE,
    payload: newPageIndex,
})

export const changeRowPerPage = newRowPerPage => ({
    type: CHANGE_EMPLOYEE_LIST_ROW_PER_PAGE,
    payload: newRowPerPage,
})

export const changeFilter = search => ({
    type: CHANGE_FILTER_EMPLOYEE_LIST,
    payload: search,
})