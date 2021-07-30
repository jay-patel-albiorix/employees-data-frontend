import _get from 'lodash/get'

import { SET_GLOBAL_ALERT, CLEAR_GLOBAL_ALERT } from '../action-types'

const initialState = {
    isAlert: false,
    severity: "",
    message: "",
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_GLOBAL_ALERT:
            return {
                ...state,
                isAlert: true,
                severity: _get(payload, "severity"),
                message: _get(payload, "message"),
            }
        case CLEAR_GLOBAL_ALERT:
            return {
                ...state,
                isAlert: false,
                severity: "",
                message: "",
            }
        default:
            return state
    }
}

export default reducer