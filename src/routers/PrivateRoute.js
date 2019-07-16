import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

import AdminNavigation from '../components/navigation/AdminNavigation';
import PrivateNavigation from '../components/navigation/PrivateNavigation';


const useStyles = makeStyles(theme => ({
  root: {
      maxWidth: 800,
      marginTop: theme.spacing(5),
  }
}))

export const PrivateRoute = ({
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
  const privateUser = props => {
    if (path === '/user/:userId') {
      if (props.match.params.userId === userId) {
        return (
          <>
            <PrivateNavigation userName={userName} userId={userId} />
            <Container classes={{
              root: classes.root
            }}>
              <Component {...props} />
            </Container>
          </>
        );
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <Redirect to="/" />;
    }
  };
  return (
    <Route
      path={path}
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
            <>{privateUser(props)}</>
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

export default connect(mapStateToProps)(PrivateRoute);
