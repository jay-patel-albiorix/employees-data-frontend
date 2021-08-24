import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles({
    actions: {
        display: "flex",
        justifyContent: "space-around",
        padding: 5,
    },
    spaced: {
        margin: 5,
    },    
})

const ActionButtons = ({ id, activeStep, nextDisabled, handleRemove, handlePrev, handleExit, handleNext }) => {
    const classes = useStyles()

    return (
        <Box className={classes.actions}>
            <Button
                color="secondary"
                variant="contained"
                onClick={handleRemove}
                disabled={id ? false : true}
            >
                Remove
            </Button>
            <Box>
                <Button     // replace with icon
                    className={classes.spaced}
                    disabled={activeStep === 0} 
                    onClick={handlePrev} 
                    color="primary"
                    variant="outlined"
                >
                    Previous
                </Button>
                <Button 
                    className={classes.spaced}
                    onClick={handleExit} 
                    color="secondary"
                    variant="outlined"
                >
                    Exit
                </Button>
                <Button     // replace with icon
                    className={classes.spaced}
                    onClick={handleNext}
                    variant="outlined"
                    color="primary"
                    disabled={nextDisabled || (activeStep === 5)} 
                >
                    Skip
                </Button>
            </Box>
            <Button
                color="primary"
                variant="contained"
                type="submit"
            >
                Save
            </Button>
        </Box>
    )
}

export default ActionButtons
