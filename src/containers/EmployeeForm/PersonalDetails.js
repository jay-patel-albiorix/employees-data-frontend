import React from 'react'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import syncValidate from './syncValidate'
import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'
import RenderDatePicker from '../../components/DatePicker/FormField'

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

const PersonalDetails = ({ handleSubmit, activeStep, handlePrev, handleExit }) => {
    const classes = useStyles()
    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <Field
                    name="personal_details.first_name"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="First Name"
                />
                <Field
                    name="personal_details.last_name"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Last Name"
                />
                <Field
                    name="personal_details.date_of_birth"
                    component={RenderDatePicker}
                    normalize={value => moment(value).format()}
                    className={classes.spaced}
                    label="Date of Birth"
                    dateFormat="YYYY/MM/DD"
                    disableFuture={true}
                />
                <Field
                    name="personal_details.phone"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Phone"
                />
                <Field
                    name="personal_details.email"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Email"
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

export default reduxForm({
    validate: syncValidate,
})(PersonalDetails)
