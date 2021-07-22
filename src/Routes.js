import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EmployeeList from './containers/EmployeeList'
import EmployeeForm from './containers/EmployeeForm'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={EmployeeList}/>
            <Route exact path="/employee-form" component={EmployeeForm} />
            <Route exact path="/employee-form/:id" component={EmployeeForm} />
        </Switch>
    )
}

export default Routes
