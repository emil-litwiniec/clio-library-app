import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import PublicNavigation from "../components/navigation/PublicNavigation";
import PrivateNavigation from "../components/navigation/PrivateNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";

export const PublicRoute = ({
    path,
    userName,
    isAdmin,
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (


                isAdmin ? (
                    <>
                        <AdminNavigation userName={userName}/>
                        <Component {...props} />
                    </>
                ) : (
                    <>
                        <PrivateNavigation userName={userName} />
                        <Component {...props} />
                    </>
                )
            ) : (
                <>
                    <PublicNavigation />
                    <Component {...props} />
                </>
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.authenticated,
    isAdmin: !!state.auth.admin,
    userName: {firstName: state.auth.firstName, lastName:state.auth.lastName}

});

export default connect(mapStateToProps)(PublicRoute);
