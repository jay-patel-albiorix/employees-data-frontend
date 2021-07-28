import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, initialize, destroy } from 'redux-form'

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

import { getById, } from '../../state/employeeForm/actions'
import syncValidate from './syncValidate'

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

export const formName = "employee"

const Form = ({
    getById,
    initialize,
    destroy,
    location,
    match,
    history,
}) => {
    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        const func = async () => {
            const id = _get(match, "params.id")
            if(id) {
                const initialData = await getById(id)
                initialize(formName, initialData)
            } else {
                initialize(
                    formName,
                    {
                        current_work: {
                            company: "Albiorix Technologies Private Limited"
                        }
                    }
                )
            }
        }
        func()
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

    const handlePrev = useCallback(() => {
        setActiveStep(step => step > 0 ? step - 1 : 0)
    }, [])

    const handleExit = useCallback(() => {
        destroy(formName)
        history.push("/")
    }, [])

    const handleNext = useCallback(() => {
        setActiveStep(step => step < 5 ? step + 1 : 5)
    }, [])

    const handleSubmit = useCallback((values,) => {
        console.log("submitting", values)
    }, [])

    const handleSubmitSuccess = useCallback(() => {
        destroy(formName)
        history.push("/")
    }, [],)

    return (
        <Grid container justifyContent="center">
            <Grid item sm={12} lg={9} xl={6}>
                <Paper className={classes.spaced} elevation={3}>
                    Employee Form
                    id: {_get(match, "params.id", "new")}

                    <Stepper 
                        alternativeLabel 
                        activeStep={activeStep}
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    {activeStep === 0 && <PersonalDetails 
                        form={formName}   
                        destroyOnUnmount={false}
                        activeStep={activeStep}   
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}       
                    />}
                    {activeStep === 1 && <BankDetails 
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 2 && <ProfessionalDetails 
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 3 && <CurrentWork 
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 4 && <ExperienceDetails 
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 5 && <EducationalDetails 
                        form={formName}        
                        destroyOnUnmount={false}
                        onSubmitSuccess={handleSubmitSuccess}            
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}                   
                    />}
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getById: id => dispatch(getById(id)),
        initialize: (formName, data) => dispatch(initialize(formName, data)),
        destroy: formName => dispatch(destroy(formName)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form)
