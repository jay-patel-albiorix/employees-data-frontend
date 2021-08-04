import React from 'react'

import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

const FormField = ({input, meta: {touched, invalid, error}, showError, formHelperTextProps, inputLabelProps, inputLabelChild, inputProps, imgProps, upload, ...props}) => {
    console.log("RenderImage", input)
    return (
        <Box>
            <img 
                src={input.value}
                alt=""
                {...imgProps}
            />
            {showError && error && 
                <FormHelperText error={true} {...formHelperTextProps}>
                    {error}
                </FormHelperText>
            }
            <InputLabel component="legend" {...inputLabelProps}>{inputLabelChild}</InputLabel>
            <Input
                type="file"
                onChange={async (event) => {
                    input.onChange("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif")
                    const url = await upload(event)
                    input.onChange(url)
                }}
                {...inputProps}
            />
        </Box>
    )
}

export default FormField