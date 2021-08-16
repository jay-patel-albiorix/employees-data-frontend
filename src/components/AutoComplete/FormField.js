import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'

const FormField = (
    { input: { value, onChange, onBlur, ...input },
        meta: { touched, invalid, error },
        className,
        defaultValue,
        autoCompleteProps: { options = [], ...autoCompleteProps } = {},
        textFieldsProps: { label, ...textFieldsProps } = {},
        ...props
    }) => {
    // console.log("autocomplete formfield props", "\n value", value, "\n defaultValue", defaultValue, "\n input", input, "\n autoCompleteProps", autoCompleteProps)
    return (
        <Autocomplete
            className={className}
            options={options}
            value={value || defaultValue}
            onChange={(e, value) => onChange(value)}
            {...input}
            {...autoCompleteProps}
            renderInput={params => <TextField
                {...params}
                error={touched && invalid}
                helperText={touched && error}
                label={label}
                {...textFieldsProps}
            />}
        />
    )
}

export default FormField