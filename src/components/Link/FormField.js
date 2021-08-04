import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

const FormField = ({input, meta: {touched, invalid, error}, linkChild, showError, formHelperTextProps, inputLabelProps, inputLabelChild, inputProps, upload, ...props}) => {
    console.log("RenderLink", input)
    return (
        <Box>
            
            <InputLabel component="legend" {...inputLabelProps}>{inputLabelChild}</InputLabel>
            
            <Input
                type="file"
                onChange={async (event) => {
                    input.onChange("#")
                    const url = await upload(event)
                    input.onChange(url)
                }}
                {...inputProps}
            />
            {
                showError && error && 
                <FormHelperText error={true} {...formHelperTextProps}>
                    {error}
                </FormHelperText>
            }
            {input.value && (input.value !== "#") &&
                <Button href={input.value} color="primary" variant="outlined" target="_blank">View</Button>
            }
        </Box>
    )
}

export default FormField