import React, { useMemo, useCallback } from 'react'
import { reduxForm, Field } from 'redux-form'
import { useMutation } from '@apollo/client'

import _get from 'lodash/get'

import { UPLOAD } from '../../graphql/mutations'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography'

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'
import RenderAutoComplete from '../../components/AutoComplete/FormField'
import RenderLink from '../../components/Link/FormField'


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
    fullWidth: {
        width: '100%',
    },
    groupContainer: {
        width: '100%',
        display: 'flex',
    },
    formLabel: {
        textAlign: "left",
        width: "100%",
    }
})

const ProfessionalDetails = ({ 
    id,
    handleSubmit, 
    submitFailed, 
    activeStep, 
    handleRemove, 
    handlePrev, 
    handleExit,
}) => {

    const [ upload ] = useMutation(
        UPLOAD,
    )

    const classes = useStyles()

    const skills = useMemo(() => ["Java", "Javascript", "Python", "React Js", "Angular JS", "Vue JS", "Node JS", "express", "Django", "Spring boot", "jHipstor", "MongoDB", "MySQL", "PostgreSQL"], [])

    const handleUpload = useCallback(async (e) => {
        try {
            console.log("handleUpload", "\nevent", e)
            if (_get(e, "target.files.length") === 1) {

                console.log("uploading file", _get(e, "target.files[0]"))
    
                const { data: { upload: { url } } } = await upload({
                    variables: {
                        file: _get(e, "target.files[0]"),
                    }
                })
                console.log("url", url)
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
            <Typography variant={"h5"} component={"h1"}>Professional Details</Typography>
            <Field 
                    name="professional_details.resume"
                    component={RenderLink}
                    upload={handleUpload}
                    linkButtonLabel={"View Resume"}
                    showError={submitFailed}
                    inputLabelChild={"Resume"}
                    formHelperTextProps={{
                        // className: classes.profilePicFormHelperText
                    }}
                    inputLabelProps={{
                        className: classes.formLabel,
                    }}
                    inputProps={{
                        inputProps: {
                            accept: "image/jpeg, image/jpg"
                        },
                    }}
                />

                <FormLabel component="legend" className={classes.formLabel}>Total Experience</FormLabel>
                <Box className={classes.groupContainer}>
                    <Field 
                        name="professional_details.experience.years"
                        component={RenderTextField}
                        className={classes.spaced}
                        type="number"
                        label="Years"
                        InputProps={{ inputProps: { min: 0} }}
                        normalize={value => value >= 0 ? value : 0 }
                        fullWidth
                    />
                    <Field 
                        name="professional_details.experience.months"
                        component={RenderTextField}
                        className={classes.spaced}
                        type="number"
                        label="Months"
                        InputProps={{ inputProps: { min: 0, max: 11 } }}
                        normalize={value => value < 0 ? 0 : ( value > 11 ? 11 : value )}
                        fullWidth
                    />
                </Box>
                <Field 
                    name="professional_details.skills"
                    component={RenderAutoComplete}
                    className={`${classes.spaced} ${classes.fullWidth}`}
                    defaultValue={[]}
                    autoCompleteProps={{
                        options: skills,
                        multiple: true, 
                        freeSolo: true,
                    }}
                    textFieldsProps={{
                        label: "Skills",
                        onKeyDown: e => {
                            // console.log("skills onKeyDown event", e, "key", e.key)
                            if(e.key === "Enter") e.preventDefault()
                        },
                        fullWidth: true
                    }}
                />
            </Box>
            <ActionButtons
                id={id}
                activeStep={activeStep}
                handleRemove={handleRemove}
                handlePrev={handlePrev}
                handleExit={handleExit}
                nextBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(ProfessionalDetails)


