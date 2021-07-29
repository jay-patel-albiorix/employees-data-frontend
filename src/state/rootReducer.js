import { combineReducers } from "redux";
import { reducer as form } from "redux-form"

import employeeList from './employeeList/reducer'
import employeeForm from './employeeForm/reducer'
import globalAlert from './globalAlert/reducer'


export default combineReducers({
    form,
    employeeForm,
    employeeList,
    globalAlert,
})
