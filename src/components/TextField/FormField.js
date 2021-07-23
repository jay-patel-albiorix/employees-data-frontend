import React from 'react'
import TextField from '@material-ui/core/TextField'

const FormField = ({input, meta: {touched, invalid, error}, ...props}) => {
    return (
        <TextField 
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...props}
        />
    )
}

export default FormField