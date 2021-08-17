import React, { useCallback } from 'react'
import { useQuery } from '@apollo/client'

import { cache } from '../../cache'
import { GET_GLOBAL_ALERT } from '../../graphql/queries'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const SnackbarAlert = () => {
    const { data: { isAlert: open, severity, message } = {isAlert: false, severity: "success", message: ""} } = useQuery(GET_GLOBAL_ALERT)

    const onClose = useCallback(() => {
        cache.writeQuery({
            query: GET_GLOBAL_ALERT,
            data: {
                isAlert: false,
                severity: "success",
                message: "",
            }
        })
    }, [])

    return (
        <Snackbar 
            open={open}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert