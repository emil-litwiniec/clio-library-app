import React from 'react';

import { Person } from '@material-ui/icons';



import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    display: 'flex',
    width: '100%'
  },
  icon: {
    width: '6rem',
    height: '100%'
  },
  iconBox: {
    width: '4rem'
  },
  iconGridWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
}));

const UserInfo = props => {
  const classes = useStyles();
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone
  } = props.user;
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12} sm={3} className={classes.iconGridWrapper}>
        <Person
          classes={{
            root: classes.icon
          }}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography variant="overline">User info:</Typography>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body1">First name:</Typography>
          <Typography variant="body1">{firstName}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Last name:</Typography>
          <Typography variant="body1">{lastName}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Email:</Typography>
          <Typography variant="body1">{email}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Phone number:</Typography>
          <Typography variant="body1">{phone}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
