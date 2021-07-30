import React from 'react'

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/moment'

const FormField = ({input: {value, ...input}, meta: {touched, invalid, error}, dateFormat, ...props}) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
                error={touched && invalid}
                helperText={touched && error} 
                format={dateFormat || "yyyy/MM/DD"}
                value={value || null}
                {...input}
                {...props}
            />
        </MuiPickersUtilsProvider>
    )
}

export default FormField
