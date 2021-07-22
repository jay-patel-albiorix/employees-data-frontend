import React from 'react'
import { Field } from 'redux-form'

import Box from '@material-ui/core/Box'


const ProfessionalDetails = () => {
    return (
        <Box>
            <Field
                name="professional_details.resume"
                component="input" 
            />
        </Box>
    )
}

export default ProfessionalDetails
