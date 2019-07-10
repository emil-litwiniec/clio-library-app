import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

// import Header from "../components/Header";

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (
                <>
                    {/* {path === '/user/:userId' && props.match.params.userId == userId ? 
                <Component {...props} />
                 : <Redirect to="/"/>} */}
                    <Component {...props} />
                </>
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.authenticated,
    userId: state.auth.userId,

});

export default connect(mapStateToProps)(PrivateRoute);
