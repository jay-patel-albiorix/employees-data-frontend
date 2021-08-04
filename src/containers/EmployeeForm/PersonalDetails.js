import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import _get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import ActionButtons from './ActionButtons'
import RenderImage from '../../components/Image/FormField'
import RenderTextField from '../../components/TextField/FormField'
import RenderDatePicker from '../../components/DatePicker/FormField'
import { upload } from '../../state/employeeForm/actions'

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
    },
    profilePicFormHelperText: {
        textAlign: "center",
    },
    profilePicLabel: {
        textAlign: "center",
        width: "100%",
    },
    profilePic: {
        maxHeight: 150,
    },
})

const PersonalDetails = ({ 
    handleSubmit, 
    submitFailed,
    activeStep, 
    handleRemove, 
    handlePrev, 
    handleExit,
    upload,
}) => {
    const classes = useStyles()

    const handleUpload = useCallback(async (e) => {
        try {
            console.log("handleUpload", "\nevent", e)
            if (_get(e, "target.files.length") === 1) {

                const uploadFormData = new FormData()
                uploadFormData.append("upload", _get(e, "target.files[0]"))
    
                const { data: { url } } = await upload(uploadFormData)
                console.log("profile_pic", url)
                return url
            }
        } catch(err) {
            console.log(err)
        }

        // eslint-disable-next-line
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <Typography variant={"h5"} component={"h1"}>Personal Details</Typography>
                <Field 
                    name="personal_details.profile_pic"
                    component={RenderImage}
                    upload={handleUpload}
                    showError={submitFailed}
                    inputLabelChild={"Profile picture"}
                    formHelperTextProps={{
                        className: classes.profilePicFormHelperText
                    }}
                    inputLabelProps={{
                        className: classes.profilePicLabel,
                    }}
                    inputProps={{
                        inputProps: {
                            accept: "image/png, image/jpeg, image/jpg"
                        },
                    }}
                    imgProps={{
                        className: classes.profilePic,
                    }}

                />
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
                nextBtnProps={{ type: "submit" }}
            />
        </form>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        upload: formData => dispatch(upload(formData)),
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(
    reduxForm({})(PersonalDetails)
)
