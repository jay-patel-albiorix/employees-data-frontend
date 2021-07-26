import React from 'react'
import { reduxForm, FieldArray } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ActionButtons from './ActionButtons'


const ExperienceDetails = ({ handleSubmit, activeStep, handlePrev, handleExit }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <FieldArray
                    name="experience_details"
                    component="input" 
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handlePrev={handlePrev}
                handleExit={handleExit}
                nextBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(ExperienceDetails)