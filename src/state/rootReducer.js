import { combineReducers } from "redux";
import { reducer as form } from "redux-form"

import employeeList from './employeeList/reducer'
import employeeForm from './employeeForm/reducer'

export default combineReducers({
    form,
    employeeForm,
    employeeList,
})
