import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'

const useStyles = makeStyles({
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: '5%',
        marginRight: '5%',
    },
    spaced: {
        margin: 5,
    }
})

const BankDetails = ({ handleSubmit, activeStep, handleRemove, handlePrev, handleExit }) => {
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>            
            <Box className={classes.fieldContainer}>
                <Field
                    name="bank_details.account_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Account Number"
                    fullWidth
                />
                <Field
                    name="bank_details.ifsc"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="IFSC"
                    fullWidth
                />
                <Field
                    name="bank_details.pan_card_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="PAN Card Number"
                    fullWidth
                />
                <Field
                    name="bank_details.adhaar_card_number"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Adhaar Card Number"
                    fullWidth
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handleRemove={handleRemove}
                handlePrev={handlePrev}
                handleExit={handleExit}
                nextBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(BankDetails)
