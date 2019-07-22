import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';


import Container from "@material-ui/core/Container";

import makeStyles from "@material-ui/styles/makeStyles";


import AdminNavigation from '../components/navigation/AdminNavigation';


const useStyles = makeStyles(theme => ({
  root: {
      maxWidth: 700,
      marginTop: theme.spacing(5),

  }
}))

export const AdminRoute = ({
  isAuthenticated,
  userName,
  userId,
  isAdmin,
  component: Component,
  path,
  history,
  ...rest
}) => {

  const classes = useStyles();
  return (
    <Route
      path={path}
      component={props =>
        isAuthenticated ? (
          isAdmin ? (
            <>
              <AdminNavigation userName={userName} />
              <Container classes={{
              root: classes.root
            }}>
                <Component {...props} />
              </Container>
            </>
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.authenticated,
  isAdmin: !!state.auth.admin,
  userId: state.auth.userId,
  userName: { firstName: state.auth.firstName, lastName: state.auth.lastName }
});

export default connect(mapStateToProps)(AdminRoute);
