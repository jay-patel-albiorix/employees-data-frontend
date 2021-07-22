import React from 'react'
import { Field } from 'redux-form'

import Box from '@material-ui/core/Box'


const BankDetails = () => {
    return (
        <Box>
            <Field
                name="bank_details.account_number"
                component="input" 
            />
        </Box>
    )
}

export default BankDetails
