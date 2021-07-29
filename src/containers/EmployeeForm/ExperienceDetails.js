import React, { useCallback } from 'react'
import { reduxForm, FieldArray, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CancelIcon from '@material-ui/icons/Cancel'

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
    fieldArrayComponent: {
        width: '100%',
    },
    mappedFieldContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
        padding: 15,
        border: 1,
        borderColor: 'darkgray',
        borderStyle: 'solid',
        borderRadius: 15,
    },
    addIconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    removeIcon: {
        alignSelf: 'start',
        transform: 'translate(50%, -50%)',
        background: 'white',
        border: '1px solid black',
        "&:hover": {
            backgroundColor: "white"
        }
    },
    spaced: {
        margin: 5,
    }
})

const RenderPastWorks = ({ fields, meta: { error } }) => {
    const classes = useStyles()

    const handleAdd = useCallback(() => fields.push())
    const handleRemove = useCallback(index => fields.remove(index), [])

    return (
        <Box className={classes.fieldArrayComponent}>
            {fields.map((pastWork, index) => {
                return (
                    <Box key={index} className={classes.mappedFieldContainer}>
                        <Box>
                            <Field
                                name={`${pastWork}.company`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="Company"
                                fullWidth
                            />
                            <Field
                                name={`${pastWork}.designation`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="Designation"
                                fullWidth
                            />
                            <Field
                                name={`${pastWork}.department`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="Department"
                                fullWidth
                            />
                            <Field
                                name={`${pastWork}.ctc`}
                                component={RenderTextField}
                                className={classes.spaced}
                                type="number"
                                label="CTC"
                                normalize={value => value >= 0 ? value : 0}
                                fullWidth
                            />
                            <Field
                                name={`${pastWork}.from`}
                                component={RenderDatePicker}
                                className={classes.spaced}
                                label="From"
                                dateFormat="yyyy/MM/DD"
                                disableFuture={true}
                                maxDate={new Date}
                                fullWidth
                                // clearable
                            />
                            <Field
                                name={`${pastWork}.to`}
                                component={RenderDatePicker}
                                className={classes.spaced}
                                label="To"
                                dateFormat="yyyy/MM/DD"
                                disableFuture={true}
                                maxDate={new Date}
                                fullWidth
                                // clearable
                            />
                        </Box>
                        <IconButton className={classes.removeIcon}
                            color="secondary"
                            onClick={handleRemove.bind(this, index)}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Box>
                )
            })}
            <Box
                className={classes.addIconContainer}
            >
                <IconButton 
                    color="primary"
                    onClick={handleAdd}
                    >
                    <AddBoxIcon fontSize="large"/>
                </IconButton>
                <Box>Add New Experiece</Box>
            </Box>
        </Box>
    )
}

const ExperienceDetails = ({ handleSubmit, activeStep, handlePrev, handleExit }) => {
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <FieldArray
                    name="past_works"
                    component={RenderPastWorks}
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handlePrev={handlePrev}
                handleExit={handleExit}
                nextBtnProps={{ type: "submit" }}
            />
        </form>

    )
}

export default reduxForm({})(ExperienceDetails)
