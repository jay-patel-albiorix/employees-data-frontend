import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { initialize, destroy, SubmissionError } from 'redux-form'

import _get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { getById, submit, remove } from '../../state/employeeForm/actions'
import { setGlobalAlert } from '../../state/globalAlert/actions'
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
    submit,
    remove,
    setGlobalAlert,
    location,
    match,
    history,
}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [removeAlert, setRemoveAlert] = useState(false)

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
                            company: "Albiorix Technology Private Limited"
                        }
                    }
                )
            }
        }
        func()
        // eslint-disable-next-line
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

    const handleRemove = useCallback(() => {
        const id = _get(match, "params.id")
        console.log("removing", id)
        setRemoveAlert(true)
        // eslint-disable-next-line
    }, [])

    const handlePrev = useCallback(() => {
        setActiveStep(step => step > 0 ? step - 1 : 0)
    }, [])

    const handleExit = useCallback(() => {
        destroy(formName)
        history.push("/")
        // eslint-disable-next-line
    }, [])

    const handleNext = useCallback(() => {
        setActiveStep(step => step < 5 ? step + 1 : 5)
    }, [])

    const handleSubmit = useCallback(async (values,) => {
        try {
            console.log("submitting", values)

            const id = _get(match, "params.id")
            const submitResponse = await submit(id, values)
            console.log("handleSubmit response", submitResponse)
            return submitResponse
        } catch({ message, response }) {
            console.log("handleSubmit catch", message, response, _get(response, "data.message"))
            // return Promise.reject(_get(response, "data.message"))
            throw new SubmissionError(_get(response, "data"))
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmitSuccess = useCallback(() => {
        console.log("handleSubmitSuccess")
        destroy(formName)
        setGlobalAlert(
            "success",
            "Saved successfully"
        )
        history.push("/")
        // eslint-disable-next-line
    }, [],)

    const handleSubmitFail = useCallback((errors) => {
        console.log("handleSubmitFail", errors)
        setGlobalAlert(
            "error",
            _get(errors, "message"),
        )
        // eslint-disable-next-line
    }, [])

    const handleCloseRemoveAlert = useCallback(() => setRemoveAlert(false), [])

    const handleConfirmRemoveAlert = useCallback(async () => {
        const id = _get(match, "params.id")
        const { data } = await remove(id)
        console.log("removed employee", data)
        if(data) {
            setGlobalAlert(
                "success",
                "Saved successfully"
            )
            history.replace("/")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <Dialog
            open={removeAlert}
            onClose={handleCloseRemoveAlert}aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you surely removing this employee?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleCloseRemoveAlert}
                >
                    No
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleConfirmRemoveAlert}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        <Grid container justifyContent="center">
            <Grid item sm={12} lg={9} xl={6}>
                <Paper className={classes.spaced} elevation={3}>
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
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}       
                    />}
                    {activeStep === 1 && <BankDetails 
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 2 && <ProfessionalDetails 
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 3 && <CurrentWork 
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 4 && <ExperienceDetails 
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleNext}                   
                    />}
                    {activeStep === 5 && <EducationalDetails 
                        form={formName}        
                        destroyOnUnmount={false}
                        onSubmitSuccess={handleSubmitSuccess}            
                        handleRemove={handleRemove}
                        activeStep={activeStep}            
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}     
                        onSubmitFail={handleSubmitFail}              
                    />}
                </Paper>
            </Grid>
        </Grid>
        </>
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
        submit: (id, values) => dispatch(submit(id, values)),
        remove: id => dispatch(remove(id)),
        setGlobalAlert: (severity, message) => dispatch(setGlobalAlert(severity, message)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form)
