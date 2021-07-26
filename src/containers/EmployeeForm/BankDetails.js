import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'

const useStyles = makeStyles({
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    spaced: {
        margin: 5,
    }
})

const BankDetails = ({ handleSubmit, activeStep, handlePrev, handleExit }) => {
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>            
            <Box className={classes.fieldContainer}>
                <Field
                    name="bank_details.account_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Account Number"
                />
                <Field
                    name="bank_details.ifsc"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="IFSC"
                />
                <Field
                    name="bank_details.pan_card_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="PAN Card Number"
                />
                <Field
                    name="bank_details.adhaar_card_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Adhaar Card Number"
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

export default reduxForm({})(BankDetails)
