import React from 'react'
import { Field } from 'redux-form'

import Box from '@material-ui/core/Box'


const CurrentWork = () => {
    return (
        <Box>
            <Field
                name="current_work.designation"
                component="input" 
            />
        </Box>
    )
}

export default CurrentWork
