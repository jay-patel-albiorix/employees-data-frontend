import {
    SET_EMPLOYEE_FORM_INITIAL_VALUES,
    CLEAR_EMPLOYEE_FORM_INITIAL_VALUES,
} from '../action-types'

const initialState = {
    initialValues: {},
}

export const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_EMPLOYEE_FORM_INITIAL_VALUES:
            return {
                ...state,
                initialValues: payload,
            }
        case CLEAR_EMPLOYEE_FORM_INITIAL_VALUES:
            return {
                ...state,
                initialValues: {},
            }
        default:
            return state
    }
}

export default reducer