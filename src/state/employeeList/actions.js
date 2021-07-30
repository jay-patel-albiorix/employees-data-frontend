import _map from 'lodash/map'
import _split from 'lodash/split'
import _trim from 'lodash/trim'


import { 
    SET_EMPLOYEE_LIST_DATA,
    CHANGE_EMPLOYEE_LIST_PAGE,
    CHANGE_EMPLOYEE_LIST_ROW_PER_PAGE,
    CHANGE_FILTER_EMPLOYEE_LIST,
} from '../action-types'

import api from '../../api'

export const getListData = (skip, limit, search, keys) => async dispatch => {
    try {
        const split = _split(_trim(search), / +/)
        const filter = {
            $or: [
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$personal_details.first_name",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$personal_details.last_name",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$current_work.designation",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$current_work.department",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                )
            ]
        }

        const query = {
            params: {
                skip,
                limit,
                filter: _trim(search) ? filter : {},
                keys,
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