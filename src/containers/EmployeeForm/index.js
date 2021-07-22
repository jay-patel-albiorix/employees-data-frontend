import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import _get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';

import { getById, clearInitialValues, } from '../../state/employeeForm/actions'

import PersonalDetails from './PersonalDetails'
import BankDetails from './BankDetails'
import ProfessionalDetails from './ProfessionalDetails'
import EducationalDetails from './EducationalDetails'
import ExperienceDetails from './ExperienceDetails'
import CurrentWork from './CurrentWork'


const useStyles = makeStyles({
    spaced: {
        margin: 5,
    },    
})

const Form = ({
    getById,
    clearInitialValues,
    location,
    match,
    history,
}) => {
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const id = _get(match, "params.id")
        if(id) getById(id)

        return () => clearInitialValues({})
    }, [])

    const classes = useStyles()

    const steps = useMemo(() => [
        "Personal Details", 
        "Bank Details", 
        "Professional Details", 
        "Current Status", 
        "Experience Details", 
        "Educational Details"
    ], [])



    return (
        <Grid container justifyContent="center">
            <Grid item sm={12} lg={9} xl={6}>
                <Paper className={classes.spaced} elevation={3}>
                    Employee Form
                    id: {_get(match, "params.id", "new")}

                    <Stepper 
                        alternativeLabel 
                        activeStep={0}
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    <PersonalDetails />
                    <BankDetails />
                    <ProfessionalDetails />
                    <CurrentWork />
                    <ExperienceDetails />
                    <EducationalDetails />

                    <Box>
                    <Button 
                        disabled={activeStep === 0} 
                        // onClick={handleBack} 
                        // className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleNext}
                        // className={classes.button}
                    >
                        Next
                    </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        initialValues: _get(state, "employeeForm.initialValues"),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getById: id => dispatch(getById(id)),
        clearInitialValues: () => dispatch(clearInitialValues()),
    }
}

export default 
connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
        form: "parent-employee-form",
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(
        Form
    )
)
