import React, { useMemo } from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormLabel from '@material-ui/core/FormLabel';

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'
import RenderAutoComplete from '../../components/AutoComplete/FormField'


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
    }
})

const ProfessionalDetails = ({ handleSubmit, activeStep, handleRemove, handlePrev, handleExit }) => {
    const classes = useStyles()

    const skills = useMemo(() => ["Java", "Javascript", "Python", "React Js", "Angular JS", "Vue JS", "Node JS", "express", "Django", "Spring boot", "jHipstor", "MongoDB", "MySQL", "PostgreSQL"], [])

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
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
                    name="professional_details.resume"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Resume"
                    fullWidth
                />
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
                        onKeyDown: e => e.preventDefault(),
                        fullWidth: true
                    }}
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

export default reduxForm({})(ProfessionalDetails)
