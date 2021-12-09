import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useAuth} from "../../Contexts/AuthContext";
import LoggedInNav from "../LoggedInNav/LoggedInNav";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
    render={props => {
        return currentUser ? (<div>
                <LoggedInNav/>
            <Component {...props} />
        </div>)
            : <Redirect to="/login"/>
    }}
    />
    )
}



