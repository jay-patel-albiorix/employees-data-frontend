import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EmployeeList from './containers/EmployeeList'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={EmployeeList}/>
        </Switch>
    )
}

export default Routes
