import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import AdminNavigation from "../components/AdminNavigation";


export const AdminRoute = ({
    userName,
    userId,
    isAdmin,
    component: Component,
    path,
    ...rest
}) => (


    <Route
        path={path}
        // {...rest}
        component={props =>
            isAdmin ? (
                <>
                
                <AdminNavigation userName={userName}/>
                <Component {...props} />
            
               
                </>
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

const mapStateToProps = state => ({
    isAdmin: !!state.auth.admin,
    userId: state.auth.userId,
    userName: {firstName: state.auth.firstName, lastName: state.auth.lastName}
});

export default connect(mapStateToProps)(AdminRoute);
