import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _forEach from 'lodash/forEach'

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
    if(!_get(values, "personal_details.phone") && !_get(values, "personal_details.email")) {
        personalDetailsErrors["phone"] = "Either phone or email is required"
    } else if(_get(values, "personal_details.phone") && (_get(values, "personal_details.phone.length") !== 10) && !/^\d{10}$/.test(_get(values, "personal_details.phone"))) {
        personalDetailsErrors["phone"] = "Invalid"
    }
    if(!_get(values, "personal_details.email") && !_get(values, "personal_details.phone") ) {
        personalDetailsErrors["email"] = "Either phone or email is required"
    } else if(_get(values, "personal_details.email") && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_get(values, "personal_details.email"))) {
        personalDetailsErrors["email"] = "Invalid"
    }

    if(!_isEmpty(personalDetailsErrors)) {
        errors["personal_details"] = personalDetailsErrors
    }


    const bankDetailsErrors = {}
    if(!_get(values, "bank_details.account_number")) {
        bankDetailsErrors["account_number"] = "Required"
    }
    if(!_get(values, "bank_details.ifsc")) {
        bankDetailsErrors["ifsc"] = "Required"
    }
    if(!_get(values, "bank_details.pan_card_number")) {
        bankDetailsErrors["pan_card_number"] = "Required"
    } else if(_get(values, "bank_details.pan_card_number.length") !== 10 || !/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/.test(_get(values, "bank_details.pan_card_number"))) {
        bankDetailsErrors["pan_card_number"] = "Invalid"
    }
    if(!_get(values, "bank_details.adhaar_card_number")) {
        bankDetailsErrors["adhaar_card_number"] = "Required"
    } else if(_get(values, "bank_details.adhaar_card_number.length") !== 12 || !/^[0-9]*$/.test(_get(values, "bank_details.adhaar_card_number"))) {
        bankDetailsErrors["adhaar_card_number"] = "Invalid"
    }

    if(!_isEmpty(bankDetailsErrors)) {
        errors["bank_details"] = bankDetailsErrors
    }


    const professionalDetailsErrors = {}
    const experienceErrors = {}
    if((_get(values, "professional_details.experience.years", null) !== null) && (_get(values, "professional_details.experience.years") < 0)) {
        experienceErrors["years"] = "Invalid"
    }
    if((_get(values, "professional_details.experience.months", null) !== null) && (_get(values, "professional_details.experience.months") < 0 || _get(values, "professional_details.experience.months") >= 12)) {
        experienceErrors["months"] = "Invalid"
    }
    if(!_isEmpty(experienceErrors)) {
        professionalDetailsErrors["experience"] = experienceErrors
    }

    if(!_isEmpty(professionalDetailsErrors)) {
        errors["professional_details"] = professionalDetailsErrors
    }


    const currentWorkErrors = {}
    if(!_get(values, "current_work.company")) {
        currentWorkErrors["company"] = "Required"
    }
    if(!_get(values, "current_work.designation")) {
        currentWorkErrors["designation"] = "Required"
    }
    if(!_get(values, "current_work.department")) {
        currentWorkErrors["department"] = "Required"
    }
    if(!_get(values, "current_work.from")) {
        currentWorkErrors["from"] = "Required"
    }

    if(!_isEmpty(currentWorkErrors)) {
        errors["current_work"] = currentWorkErrors
    }

    if(_get(values, "past_works.length")) {
        const pastWorksArrErrors = []
        _forEach(
            _get(values, "past_works"),
            (pastWork, index) => {
                const pastWorkError = {}
                if(!_get(pastWork, "company")) {
                    pastWorkError["company"] = "Required"
                }

                if(new Date(_get(pastWork, "from")) > new Date(_get(pastWork, "to"))) {
                    pastWorkError["from"] = "Bad value"
                    pastWorkError["to"] = "Bad value"
                }

                pastWorksArrErrors[index] = pastWorkError
            }
        )

        errors["past_works"] = pastWorksArrErrors
    }


    if(_get(values, "educational_details.length")) {
        const educationalDetailsArrErrors = []
        _forEach(
            _get(values, "educational_details"),
            (education, index) => {
                const educationError = {}
                if(!_get(education, "course")) {
                    educationError["course"] = "Required"
                }
                if(!_get(education, "university")) {
                    educationError["university"] = "Required"
                }
                educationalDetailsArrErrors[index] = educationError            
            }
        )
        errors["educational_details"] = educationalDetailsArrErrors
    }

    // console.log("sync errors", errors)
    return errors
}

export default syncValidate