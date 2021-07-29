import React from 'react'
import { connect } from 'react-redux'

import _get from 'lodash/get'

import { clearGlobalAlert } from '../../state/globalAlert/actions'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const SnackbarAlert = ({open, onClose, severity, message}) => {
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

const mapStateToProps = state => {
    return {
        open: _get(state, "globalAlert.isAlert"),
        severity: _get(state, "globalAlert.severity"),
        message: _get(state, "globalAlert.message"),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch(clearGlobalAlert()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarAlert)