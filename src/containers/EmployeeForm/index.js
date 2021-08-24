import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { initialize, destroy, SubmissionError } from 'redux-form'
import { useLazyQuery, useMutation } from '@apollo/client'

import _get from 'lodash/get'
import _isString from 'lodash/isString'
import _set from 'lodash/set'
import _map from 'lodash/map'

import { cache } from '../../graphql/cache'
import { GET_EXISTING_EMPLOYEE, GET_GLOBAL_ALERT } from '../../graphql/queries'
import { POST_NEW_EMPLOYEE, PATCH_EMPLOYEE, DELETE_EMPLOYEE } from '../../graphql/mutations'
import { omitDeepFields } from '../../utilities'

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

import syncValidate from './syncValidate'

import PersonalDetails from './PersonalDetails'
import BankDetails from './BankDetails'
import ProfessionalDetails from './ProfessionalDetails'
import EducationalDetails from './EducationalDetails'
import ExperienceDetails from './ExperienceDetails'
import CurrentWork from './CurrentWork'


const normalizeInitialValues = (employee) => {
    const normalizedEmployee = omitDeepFields(employee, "__typename")
                
    const experienceYears = _get(normalizedEmployee, "professional_details.experience.years")
    const experienceMonths = _get(normalizedEmployee, "professional_details.experience.months")
    const currentCtc = _get(normalizedEmployee, "current_work.ctc")

    if(experienceYears !== null) _set(normalizedEmployee, "professional_details.experience.years", `${experienceYears}`)
    if(experienceMonths !== null) _set(normalizedEmployee, "professional_details.experience.months", `${experienceMonths}`)
    if(currentCtc !== null) _set(normalizedEmployee, "current_work.ctc", `${currentCtc}`)
    
    _set(
        normalizedEmployee,
        "past_works",
        _map(
            _get(normalizedEmployee, "past_works"),
            work => {
                const ctc = _get(work, "ctc")
                if(ctc !== null) _set(work, "ctc", `${ctc}`) 
                return work
            }
        )    
    )

    return normalizedEmployee
}

const useStyles = makeStyles({
    spaced: {
        margin: 5,
    },    
})

export const formName = "employee"

const Form = ({
    initialize,
    destroy,
    location,
    match,
    history,
}) => {
    
    console.log("rendering employee form")
    const [activeStep, setActiveStep] = useState(0)
    const [removeAlert, setRemoveAlert] = useState(false)

    useEffect(() => {
        const id = _get(match, "params.id")
        if(id) {
           fetchEmployee()
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
        // eslint-disable-next-line 
    }, [])

    const [ fetchEmployee, { data: { employee } = {} } ] = useLazyQuery(
        GET_EXISTING_EMPLOYEE,
        {
            variables: {
                _id: _get(match, "params.id")
            },
            fetchPolicy: "network-only",
            notifyOnNetworkStatusChange: true,
            onCompleted: ({ employee }) => {
            
                // console.log("fetchEmployee onComplete employee", employee)
                const normalizedEmployee = normalizeInitialValues(employee)
                console.log("fetchEmployee onComplete normalizedEmployee", normalizedEmployee)

                initialize(formName, normalizedEmployee)
            },
            onError: (error) => {
                console.log("list error", error, "\n", error.message, "\n", error.graphQLErrors, "\n", error.networkError)
                cache.writeQuery({
                    query: GET_GLOBAL_ALERT,
                    data: {
                        isAlert: true,
                        severity: "error",
                        message: error.message || "Getting employee doc failed",
                    }
                })
            },
        }
    )

    const [ post ] = useMutation(
        POST_NEW_EMPLOYEE,
        {
            onCompleted: ({ post: {_id, ...employee} }) => {
                console.log("posted employee", _id, employee)
                history.replace(`/employee-form/${_id}`)    // don't add key on /employee-data & /employee-data/:id Route
            }
        }
    )

    const [ patch ] = useMutation(
        PATCH_EMPLOYEE,
    )

    const [ remove ] = useMutation(
        DELETE_EMPLOYEE,
        {
            onCompleted: ({ delete: { personal_details: { first_name, last_name } }}) => {
                cache.writeQuery({
                    query: GET_GLOBAL_ALERT,
                    data: {
                        isAlert: true,
                        severity: "success",
                        message: `Removed "${first_name} ${last_name}" successfully`,
                    }
                })
                history.replace("/")
            },
            onError: (error) => {
                console.log("list error", error, "\n", error.message, "\n", error.graphQLErrors, "\n", error.networkError)
                cache.writeQuery({
                    query: GET_GLOBAL_ALERT,
                    data: {
                        isAlert: true,
                        severity: "error",
                        message: error.message || "Removing employee doc failed",
                    }
                })
            },
        }
    )

    const classes = useStyles()

    const steps = useMemo(() => [
        {
            field: "personal_details",
            label: "Personal Details",
        }, 
        {
            field: "bank_details",
            label: "Bank Details",
        }, 
        {
            field: "professional_details",
            label: "Professional Details",
        }, 
        {
            field: "current_work",
            label: "Current Status",
        }, 
        {
            field: "past_works",
            label: "Experience Details",
        }, 
        {
            field: "educational_details",
            label: "Educational Details",
        },
    ], [])

    const handleRemove = useCallback(() => {
        const id = _get(match, "params.id")
        console.log("removing", id)
        setRemoveAlert(true)
        // eslint-disable-next-line
    }, [])

    const handlePrev = useCallback(() => {
        if(employee) {
            const normalizedEmployee = normalizeInitialValues(employee)
            console.log("handlePrev normaizedEmployee", normalizedEmployee)
            initialize(formName, normalizedEmployee)
        } else if(_get(match, "params.id")) {
            fetchEmployee()
        }

        setActiveStep(step => step > 0 ? step - 1 : 0)
        // eslint-disable-next-line
    }, [employee, match])

    const handleExit = useCallback(() => {
        destroy(formName)
        history.push("/")
        // eslint-disable-next-line
    }, [])

    const handleNext = useCallback(() => {
        if(employee) {
            const normalizedEmployee = normalizeInitialValues(employee)
            console.log("handleNext normalizedEmployee", normalizedEmployee)
            initialize(formName, normalizedEmployee)
        } else if(_get(match, "params.id")) {
            fetchEmployee()
        }

        setActiveStep(step => step < 5 ? step + 1 : 5)
        // eslint-disable-next-line
    }, [employee, match])

    const handleSubmit = useCallback(async (values,) => {
        try {

            // delete values.updatedAt
            const { [steps[activeStep]["field"]]: currentStepValues } = values

            console.log("saving currentStepValues", {[steps[activeStep]["field"]]: currentStepValues})

            const id = _get(match, "params.id")
            return id ? (
               await patch({
                    variables: {
                        _id: id,
                        data: {[steps[activeStep]["field"]]: currentStepValues},
                    }
                })
            ) : await post({
                variables: {
                    data: {[steps[activeStep]["field"]]: currentStepValues}
                },
            })
          
               
        } catch({ message, response }) {
            console.log("handleSubmit catch", message, response, _get(response, "data"))

            throw new SubmissionError(_get(response, "data", message))
        }
        // eslint-disable-next-line
    }, [activeStep])

    const handleSubmitSuccess = useCallback(({ data: { 
        patch: { personal_details: { first_name: firstNamePut, last_name: lastNamePut } } = {personal_details: {first_name: "", last_name: ""}} , 
        post: { personal_details: { first_name: firstNamePost, last_name: lastNamePost } } = {personal_details: {first_name: "", last_name: ""}}, 
    } }) => {
        console.log("handleSubmitSuccess", )
        activeStep === 5 && destroy(formName)

        cache.writeQuery({
            query: GET_GLOBAL_ALERT,
            data: {
                isAlert: true,
                severity: "success",
                message: `Saved "${firstNamePost || firstNamePut} ${lastNamePost || lastNamePut}"'s ${steps[activeStep]["label"]} successfully`,
            }
        })
        
        activeStep === 5 ? history.push("/") : setActiveStep(step => step < 5 ? step + 1 : 5) 
        // eslint-disable-next-line
    }, [activeStep])

    const handleSubmitFail = useCallback((errors) => {
        console.log("handleSubmitFail", errors)

        cache.writeQuery({
            query: GET_GLOBAL_ALERT,
            data: {
                isAlert: true,
                severity: "error",
                message: _get(errors, "message", _isString(errors) ? errors : "Submit failed"),
            }
        })

        // eslint-disable-next-line
    }, [])

    const handleCloseRemoveAlert = useCallback(() => setRemoveAlert(false), [])

    const handleConfirmRemoveAlert = useCallback(async () => {
        const id = _get(match, "params.id")
        remove({
            variables: {
                _id: id
            },
        })

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
                        {steps.map(({label}, index) => (
                            <Step key={label}>
                                <StepLabel>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    {activeStep === 0 && <PersonalDetails 
                        id={_get(match, "params.id")}
                        form={formName}   
                        destroyOnUnmount={false}
                        activeStep={activeStep}   
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        handleNext={handleNext}
                        nextDisabled={_get(match, "params.id") ? false : true}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}
                        onSubmitSuccess={handleSubmitSuccess}            
                        onSubmitFail={handleSubmitFail}              
                    />}
                    {activeStep === 1 && <BankDetails 
                        id={_get(match, "params.id")}
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        handleNext={handleNext}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}
                        onSubmitSuccess={handleSubmitSuccess}            
                        onSubmitFail={handleSubmitFail}              
                    />}
                    {activeStep === 2 && <ProfessionalDetails 
                        id={_get(match, "params.id")}
                        form={formName}
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        handleNext={handleNext}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}     
                        onSubmitSuccess={handleSubmitSuccess}            
                        onSubmitFail={handleSubmitFail}              
                    />}
                    {activeStep === 3 && <CurrentWork 
                        id={_get(match, "params.id")}
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        handleNext={handleNext}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}                   
                        onSubmitSuccess={handleSubmitSuccess}            
                        onSubmitFail={handleSubmitFail}              
                    />}
                    {activeStep === 4 && <ExperienceDetails 
                        id={_get(match, "params.id")}
                        form={formName}                    
                        destroyOnUnmount={false}
                        activeStep={activeStep}            
                        handleRemove={handleRemove}
                        handlePrev={handlePrev}
                        handleExit={handleExit}
                        handleNext={handleNext}
                        validate={syncValidate}       
                        onSubmit={handleSubmit}                   
                        onSubmitSuccess={handleSubmitSuccess}            
                        onSubmitFail={handleSubmitFail}              
                    />}
                    {activeStep === 5 && <EducationalDetails 
                        id={_get(match, "params.id")}
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


const mapDispatchToProps = dispatch => {
    return {
        initialize: (formName, data) => dispatch(initialize(formName, data)),
        destroy: formName => dispatch(destroy(formName)),
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(Form)
