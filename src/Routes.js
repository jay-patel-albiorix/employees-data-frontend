import React from 'react'
import { Route, Switch } from "react-router-dom"

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => "routing /"}/>
        </Switch>
    )
}

export default Routes
