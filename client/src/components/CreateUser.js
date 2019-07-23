import React, { useState, useEffect } from 'react';

import { history } from "../routers/AppRouter";

import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';



import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import makeStyles from "@material-ui/styles/makeStyles";

import { MyTextField } from './myMuiComponents';

const required = 'Field required';
const UserSchema = Yup.object().shape({
  firstName: Yup.string().required(required),
  lastName: Yup.string().required(required),
  email: Yup.string()
    .email('Invalid email')
    .required(required),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  phoneNumber: Yup.number().required(required)
});

const useStyles = makeStyles(theme => ({
  gridContainer: {
    display: 'flex'
  },
  formControl: {
    minWidth: '100%'
  },

  box: {
    [theme.breakpoints.only('xs')]: {
      margin: '10px 0px'
    }
  },
  boxSubmit: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 25
  },
  button: {
    width: '88%',
    marginTop: 8
  },
  submitGridContainer: {
    display: "flex",
    justifyContent: 'flex-end'
  }
}));

const CreateUser = () => {
  const classes = useStyles();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    message &&
      setTimeout(() => {
        setMessage('');
      }, 4000);
    error &&
      setTimeout(() => {
        setError('');
      });
  });

  const handleSubmit = values => {
    axios({
      method: 'PUT',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/createUser`,
      data: {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.lastName && { lastName: values.lastName }),
        ...(values.email && { email: values.email }),
        ...(values.password && { password: values.password }),
        ...(values.phoneNumber && { phoneNumber: values.phoneNumber })
      }
    })
      .then(res => {
				res.data.message && setMessage(res.data.message);
				setTimeout(() => history.push('/'), 3000);
      })
      .catch(err => {
        err.response.data.message && setError(err.response.data.message);
      });
  };

  return (

		message ? (
    <Typography variant="body2">{message}</Typography>
  ) : (
    <div>
      <Typography variant="overline">Create new user:</Typography>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          phoneNumber: ''
        }}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Grid container className={classes.gridContainer}>
              <Grid item container xs={12}>
                <Grid item xs={12} sm={6} className={classes.marginRight}>
                  <Box mr={1} className={classes.box}>
                    <MyTextField
                      id="firstName"
                      label="First name"
                      props={props}
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.marginLeft}>
                  <Box ml={1} className={classes.box}>
                    <MyTextField
                      id="lastName"
                      label="Last name"
                      props={props}
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={12} sm={6} className={classes.marginRight}>
                  <Box mr={1} className={classes.box}>
                    <MyTextField
                      id="email"
                      label="Email"
                      props={props}
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.marginLeft}>
                  <Box ml={1} className={classes.box}>
                    <MyTextField
                      id="password"
                      label="Password"
                      props={props}
                      className={classes.textField}
                      fullWidth
                      type="password"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12} sm={6} className={classes.marginRight}>
                  <Box mr={1} className={classes.box}>
                    <MyTextField
                      id="passwordConfirmation"
                      label="Confirm password"
                      props={props}
                      className={classes.textField}
                      fullWidth
                      type="password"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.marginLeft}>
                  <Box ml={1} className={classes.box}>
                    <MyTextField
                      id="phoneNumber"
                      label="Phone number"
                      props={props}
                      className={classes.textField}
                      fullWidth
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={false} sm={6} />
              <Grid item container xs={12} sm={6} className={classes.submitGridContainer}>
                <Grid item xs={6} sm={6}>
                  <Box className={classes.boxSubmit}>
                    <Button
                      variant="outlined"
                      type="submit"
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      />

		{error && <Typography>{error}
			</Typography>}

    </div>

  ))
};

export default CreateUser;
