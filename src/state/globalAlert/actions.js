import { SET_GLOBAL_ALERT, CLEAR_GLOBAL_ALERT } from '../action-types'

export const setGlobalAlert = (severity, message) => ({
    type: SET_GLOBAL_ALERT,
    payload: {severity, message},
})

export const clearGlobalAlert = (severity, message) => ({
    type: CLEAR_GLOBAL_ALERT,
})