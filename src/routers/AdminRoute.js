import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

import { Container } from '@material-ui/core';

import AdminNavigation from '../components/navigation/AdminNavigation';
import PrivateNavigation from '../components/navigation/PrivateNavigation';

const containerMaxWidth = 'md';

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
  return (
    <Route
      path={path}
      component={props =>
        isAuthenticated ? (
          isAdmin ? (
            <>
              <AdminNavigation userName={userName} />
              <Container maxWidth={containerMaxWidth}>
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
