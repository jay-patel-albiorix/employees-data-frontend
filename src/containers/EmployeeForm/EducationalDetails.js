import React from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ActionButtons from './ActionButtons'


const EducationalDetails = ({ handleSubmit, activeStep, handlePrev, handleBack }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <FieldArray
                    name="educational_details"
                    component="input" 
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handlePrev={handlePrev}
                handleBack={handleBack}
                submitBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(EducationalDetails)
