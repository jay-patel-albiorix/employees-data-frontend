import _get from 'lodash/get'
import { 
    SET_EMPLOYEE_LIST_DATA,
    CHANGE_EMPLOYEE_LIST_PAGE,
    CHANGE_EMPLOYEE_LIST_ROW_PER_PAGE,
    CHANGE_FILTER_EMPLOYEE_LIST,
} from "../action-types"

const initialState = {
    data: [],
    meta: {},
    currentPageIndex: 0,
    rowsPerPage: 10,
    search: "",
}

export const reducer = (state = initialState, { type, payload }) => {
    // console.log("reducer state", state)
    switch(type) {
        case SET_EMPLOYEE_LIST_DATA:
            return {
                ...state,
                data: _get(payload, "data"),
                meta: _get(payload, "meta"),
            }
        case CHANGE_EMPLOYEE_LIST_PAGE:
            return {
                ...state,
                currentPageIndex: payload,
            }
        case CHANGE_EMPLOYEE_LIST_ROW_PER_PAGE:
            return {
                ...state,
                rowsPerPage: payload,
                currentPageIndex: 0,
            }
        case CHANGE_FILTER_EMPLOYEE_LIST:
            return {
                ...state,
                search: payload,
                currentPageIndex: 0,
            }
        default:
            return state
    }
}

export default reducer