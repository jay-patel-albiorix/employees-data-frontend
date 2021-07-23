import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { isDate } from 'moment'

export const syncValidate = (values, ) => {
    const errors = {}

    // errors["_error"] = "Global Error"

    const personalDetailsErrors = {}
    if(!_get(values, "personal_details.first_name")) {
        personalDetailsErrors["first_name"] = "Required"
    }
    if(!_get(values, "personal_details.last_name")) {
        personalDetailsErrors["last_name"] = "Required"
    }
    if(!_get(values, "personal_details.date_of_birth")) {
        personalDetailsErrors["date_of_birth"] = "Required"
    } 
    // else if(!isDate(new Date("abc"))) {
    //     personalDetailsErrors["date_of_birth"] = "Invalid"
    // }

    if(!_get(values, "personal_details.phone")) {
        personalDetailsErrors["phone"] = "Required"
    } else if(!/^\d{10}$/.test(_get(values, "personal_details.phone"))) {
        personalDetailsErrors["phone"] = "Invalid"
    }
    if(!_get(values, "personal_details.email")) {
        personalDetailsErrors["email"] = "Required"
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_get(values, "personal_details.email"))) {
        personalDetailsErrors["email"] = "Invalid"
    }

    if(!_isEmpty(personalDetailsErrors)) {
        errors["personal_details"] = personalDetailsErrors
    }

    console.log("sync errors", errors)
    return errors
}

export default syncValidate