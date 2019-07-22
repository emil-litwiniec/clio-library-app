import React from "react";

import { connect } from "react-redux";

import { Route } from "react-router-dom";

import Container from "@material-ui/core/Container";

import makeStyles from "@material-ui/styles/makeStyles";

import PublicNavigation from "../components/navigation/PublicNavigation";
import PrivateNavigation from "../components/navigation/PrivateNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 800,
      marginTop: theme.spacing(5),

    }
})) 

export const PublicRoute = ({
    path,
    userName,
    userId,
    isAdmin,
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    const classes = useStyles();
    return (
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (


                isAdmin ? (
                    <>
                    <AdminNavigation userName={userName} userId={userId}/>
                    <Container classes={{
                        root: classes.root
                    }}>
                        <Component {...props} />
                    </Container>
                    </>
                ) : (
                    <>
                        <PrivateNavigation userName={userName} userId={userId}/>
                        <Container classes={{
                        root: classes.root
                    }}>
                            <Component {...props} />
                        </Container>
                    </>
                )
            ) : (
                <>
                    <PublicNavigation />
                    <Container classes={{
                        root: classes.root
                    }}>
                        <Component {...props} />

                    </Container>
                </>
            )
        }
    />
)};

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.authenticated,
    isAdmin: !!state.auth.admin,
    userName: {firstName: state.auth.firstName, lastName:state.auth.lastName},
    userId: state.auth.userId

});

export default connect(mapStateToProps)(PublicRoute);
