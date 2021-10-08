import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useAuth} from "../../Contexts/AuthContext";

 function PrivateRoute({component, ...rest}) {
    const {currentUser} = useAuth()

    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    currentUser
                        ? (
                           component
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    )
}

export default PrivateRoute;