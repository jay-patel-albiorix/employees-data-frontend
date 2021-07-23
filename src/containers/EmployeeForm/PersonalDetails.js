import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ActionButtons from './ActionButtons'


const PersonalDetails = ({ handleSubmit, activeStep, handlePrev, handleBack }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <Field
                    name="personal_details.first_name"
                    component="input" 
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handlePrev={handlePrev}
                handleBack={handleBack}
                nextBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(PersonalDetails)
