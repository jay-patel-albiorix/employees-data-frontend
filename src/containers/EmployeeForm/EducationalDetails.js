import React, { useCallback } from 'react'
import { reduxForm, FieldArray, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CancelIcon from '@material-ui/icons/Cancel'
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

const RenderEducations = ({ fields, meta: { error } }) => {
    const classes = useStyles()

    const handleAdd = useCallback(() => fields.push(), [fields])
    const handleRemove = useCallback(index => fields.remove(index), [fields])

    return (
        <Box className={classes.fieldArrayComponent}>
            <Typography variant={"h5"} component={"h1"}>Educational Details</Typography>
            {fields.map((education, index) => {
                return (
                    <Box key={index} className={classes.mappedFieldContainer}>
                        <Box>
                            <Field
                                name={`${education}.course`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="Course"
                                fullWidth
                            />
                            <Field
                                name={`${education}.university`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="University"
                                fullWidth
                            />
                            <Field
                                name={`${education}.passed_on`}
                                component={RenderDatePicker}
                                className={classes.spaced}
                                label="Passed on"
                                dateFormat="yyyy/MM/DD"
                                disableFuture={true}
                                maxDate={new Date()}
                                fullWidth
                                // clearable
                            />
                            <Field
                                name={`${education}.grade`}
                                component={RenderTextField}
                                className={classes.spaced}
                                label="Grade"
                                fullWidth
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
                <Box>Add New Education</Box>
            </Box>
        </Box>
    )
}

const EducationalDetails = ({ handleSubmit, activeStep, handleRemove, handlePrev, handleExit }) => {
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <FieldArray
                    name="educational_details"
                    component={RenderEducations}
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handleRemove={handleRemove}
                handlePrev={handlePrev}
                handleExit={handleExit}
                submitBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(EducationalDetails)
