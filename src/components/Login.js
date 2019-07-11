import React from 'react';
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";


import { login } from "../actions/auth";


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required()

})

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleSubmit(values) {
        this.props.login(values, this.props.history);
    }

    render() {

        const errorMessage = this.props.errorMessage;
        return (
            <>
            {this.props.isAuthenticated ? <p>You are already logged in.</p>
                :
                <div>
                 <Formik
                    enableReinitialize
                    initialValues={{
                        email: "",
                        password: "",
                        
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) => {
                        this.handleSubmit(values);
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <label>Email: </label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                name="email"
                            />
                            {props.errors.email && props.touched.email ?(
                                <div id="feedback">
                                    {props.errors.email}
                                </div>
                            ) : null} 


                            <label>password: </label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                            />
                            {props.errors.password && props.touched.password ?(
                                <div id="feedback">
                                    {props.errors.password}
                                </div>
                            ) : null} 
                           
                            
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />

                {errorMessage && <p>{errorMessage}</p>}
            </div>}
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: !!state.auth.authenticated
    }
}

export default connect(mapStateToProps, { login })(Login);