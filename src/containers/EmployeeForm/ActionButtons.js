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

const ActionButtons = ({ id, activeStep, handleRemove, handlePrev, handleExit, nextBtnProps = {}, submitBtnProps = {} }) => {
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
                <Button 
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
                <Button
                    className={classes.spaced}
                    variant="contained"
                    color="primary"
                    disabled={activeStep === 5} 
                    {...nextBtnProps}
                >
                    Next
                </Button>
            </Box>
            <Button
                disabled={activeStep !== 5} 
                color="Primary"
                variant="contained"
                {...submitBtnProps}
            >
                Submit
            </Button>
        </Box>
    )
}

export default ActionButtons
