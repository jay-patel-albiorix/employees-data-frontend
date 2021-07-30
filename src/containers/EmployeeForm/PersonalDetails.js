import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'
import RenderDatePicker from '../../components/DatePicker/FormField'

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

const PersonalDetails = ({ handleSubmit, activeStep, handleRemove, handlePrev, handleExit }) => {
    const classes = useStyles()
    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <Field
                    name="personal_details.first_name"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="First Name"
                    fullWidth
                />
                <Field
                    name="personal_details.last_name"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Last Name"
                    fullWidth
                />
                <Field
                    name="personal_details.date_of_birth"
                    component={RenderDatePicker}
                    className={classes.spaced}
                    label="Date of Birth"
                    dateFormat="yyyy/MM/DD"
                    disableFuture={true}
                    maxDate={new Date()}
                    fullWidth
                />
                <Field
                    name="personal_details.phone"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Phone"
                    fullWidth
                />
                <Field
                    name="personal_details.email"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Email"
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

export default reduxForm({
})(PersonalDetails)
