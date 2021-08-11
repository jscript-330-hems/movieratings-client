import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ requiresAdmin, children, ...rest}) {
    
    const { getToken, isAdmin } = useAuth();

    return (
        <Route {...rest} render={ props => {

            if (requiresAdmin && !isAdmin())
                return <Redirect to="/notanadmin" />

            return (getToken() !== null)
                ? children
                : <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location } 
                }}/>
        }} />
    )
}
