import React, { useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

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

const CurrentWork = ({ id, handleSubmit, activeStep, handleRemove, handlePrev, handleExit, handleNext, change }) => {
    const classes = useStyles()

    useEffect(() => {
        change("current_work.company", "Albiorix Technology Private Limited")
        // eslint-disable-next-line
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <Typography variant={"h5"} component={"h1"}>Current Status</Typography>
                <Field
                    name="current_work.company"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Company"
                    fullWidth
                    inputProps={{
                        readOnly: true,
                    }}
                />
                <Field
                    name="current_work.designation"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Designation"
                    fullWidth
                />
                <Field
                    name="current_work.department"
                    component={RenderTextField} 
                    className={classes.spaced}
                    label="Department"
                    fullWidth
                />
                <Field
                    name="current_work.ctc"
                    component={RenderTextField} 
                    className={classes.spaced}
                    type="number"
                    label="CTC"
                    normalize={value => value >= 0 ? value : 0 }
                    fullWidth
                />
                 <Field
                    name="current_work.from"
                    component={RenderDatePicker}
                    className={classes.spaced}
                    label="Working from"
                    dateFormat="yyyy/MM/DD"
                    disableFuture={true}
                    maxDate={new Date()}
                    fullWidth
                />
                
            </Box>
            <ActionButtons
                id={id}
                activeStep={activeStep}
                handleRemove={handleRemove}
                handlePrev={handlePrev}
                handleExit={handleExit}
                handleNext={handleNext}
            />
        </form>
    )
}

export default reduxForm({})(CurrentWork)
