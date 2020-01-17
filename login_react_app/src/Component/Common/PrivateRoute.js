import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authenticate } from '../../helpers/common'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = authenticate()

    return (
        <Route
            {...rest}
            render={props => {
                const { location } = props
                const key = `${location.pathname}${location.search}`
                props = { ...props, key }
               return isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute;