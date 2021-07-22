import React from 'react'
import { Field } from 'redux-form'

import Box from '@material-ui/core/Box'


const PersonalDetails = () => {
    return (
        <Box>
            <Field
                name="personal_details.first_name"
                component="input" 
            />
        </Box>
    )
}

export default PersonalDetails
