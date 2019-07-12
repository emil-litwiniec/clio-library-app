import React from 'react';
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { login } from "../actions/auth";

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required()

})


const Login = (props) => {
    const classes = useStyles();
    const errorMessage = props.errorMessage;
    const handleSubmit = (values) => {
       props.login(values, props.history)
    };
    

        return (
            <>
                {props.isAuthenticated ? (
                    <p>You are already logged in.</p>
                ) : (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={(values, actions) => {
                                    handleSubmit(values);
                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                }}
                                render={props => (
                                    <form
                                        className={classes.form}
                                        onSubmit={props.handleSubmit}
                                    >
                                        <TextField
                                            onChange={
                                                props.handleChange
                                            }
                                            onBlur={props.handleBlur}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            value={props.values.email}
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        <TextField
                                            onChange={
                                                props.handleChange
                                            }
                                            onBlur={props.handleBlur}
                                            value={
                                                props.values.password
                                            }
                                            name="password"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Sign in
                                        </Button>
                                        {/* <label>Email: </label> */}
                                        {/* <input
                                            type="text"
                                            onChange={
                                                props.handleChange
                                            }
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                            name="email"
                                        />
                                        {props.errors.email &&
                                        props.touched.email ? (
                                            <div id="feedback">
                                                {props.errors.email}
                                            </div>
                                        ) : null} */}

                                        {/* <label>password: </label>
                                        <input
                                            type="text"
                                            onChange={
                                                props.handleChange
                                            }
                                            onBlur={props.handleBlur}
                                            value={
                                                props.values.password
                                            }
                                            name="password"
                                        />
                                        {props.errors.password &&
                                        props.touched.password ? (
                                            <div id="feedback">
                                                {props.errors.password}
                                            </div>
                                        ) : null} */}

                                        {/* <button type="submit">
                                            Submit
                                        </button> */}
                                    </form>
                                )}
                            />

                            {errorMessage && <p>{errorMessage}</p>}
                            {/* <form className={classes.form} noValidate> */}

                            {/* </form> */}
                        </div>
                    </Container>
                )
                //     <div>
                //      <Formik
                //         enableReinitialize
                //         initialValues={{
                //             email: "",
                //             password: "",

                //         }}
                //         validationSchema={LoginSchema}
                //         onSubmit={(values, actions) => {
                //             handleSubmit(values);
                //             actions.setSubmitting(false);
                //             actions.resetForm();
                //         }}
                //         render={props => (
                //             <form onSubmit={props.handleSubmit}>
                //                 <label>Email: </label>
                //                 <input
                //                     type="text"
                //                     onChange={props.handleChange}
                //                     onBlur={props.handleBlur}
                //                     value={props.values.email}
                //                     name="email"
                //                 />
                //                 {props.errors.email && props.touched.email ?(
                //                     <div id="feedback">
                //                         {props.errors.email}
                //                     </div>
                //                 ) : null}

                //                 <label>password: </label>
                //                 <input
                //                     type="text"
                //                     onChange={props.handleChange}
                //                     onBlur={props.handleBlur}
                //                     value={props.values.password}
                //                     name="password"
                //                 />
                //                 {props.errors.password && props.touched.password ?(
                //                     <div id="feedback">
                //                         {props.errors.password}
                //                     </div>
                //                 ) : null}

                //                 <button type="submit">Submit</button>
                //             </form>
                //         )}
                //     />

                //     {errorMessage && <p>{errorMessage}</p>}
                // </div>
                }
            </>
        );

}

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: !!state.auth.authenticated
    }
}

export default connect(mapStateToProps, { login })(Login);