import React, { useMemo, useCallback } from 'react'
import { reduxForm, Field } from 'redux-form'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';

import ActionButtons from './ActionButtons'
import RenderTextField from '../../components/TextField/FormField'
import RenderAutoComplete from '../../components/AutoComplete/FormField'


const useStyles = makeStyles({
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    spaced: {
        margin: 5,
    },
    fixedWidth: {
        width: 201,
    },
    grooupContainer: {
        width: 201
    },
    groupedItem: {
        width: '45%'
    },
    formLabel: {
        textAlign: "left",
    }
})

const ProfessionalDetails = ({ handleSubmit, activeStep, handlePrev, handleExit }) => {
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <Box className={classes.grooupContainer}>
                    <FormLabel component="legend" className={classes.formLabel}>Experience</FormLabel>
                    <Field 
                        name="professional_details.experience.years"
                        component={RenderTextField}
                        className={`${classes.spaced} ${classes.groupedItem}`}
                        type="number"
                        label="Years"
                        InputProps={{ inputProps: { min: 0} }}
                        normalize={value => value >= 0 ? value : 0 }
                    />
                    <Field 
                        name="professional_details.experience.months"
                        component={RenderTextField}
                        className={`${classes.spaced} ${classes.groupedItem}`}
                        type="number"
                        label="Months"
                        InputProps={{ inputProps: { min: 0, max: 11 } }}
                        normalize={value => value < 0 ? 0 : ( value > 11 ? 11 : value )}
                    />
                </Box>
                <Field
                    name="professional_details.resume"
                    component={RenderTextField}
                    className={classes.spaced}
                    label="Resume"
                />
                <Field 
                    name="professional_details.skills"
                    component={RenderAutoComplete}
                    className={`${classes.spaced} ${classes.fixedWidth}`}
                    defaultValue={[]}
                    autoCompleteProps={{
                        options: ["React Js", "Angular JS", "Vue JS"],
                        multiple: true, 
                        freeSolo: true,
                    }}
                    textFieldsProps={{
                        label: "Skills"
                    }}
                />
            </Box>
            <ActionButtons
                activeStep={activeStep}
                handlePrev={handlePrev}
                handleExit={handleExit}
                nextBtnProps={{type: "submit"}}
            />
        </form>
    )
}

export default reduxForm({})(ProfessionalDetails)
