import React from "react";

import { Formik } from "formik";
import axios from "axios";


class ModifyUser extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { 
            phase: 1,
            error: '',
            user: {}
        };
    }


    handleSubmit(values) {
        axios({
            method: "PUT",
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/createUser`,
            data: {
                ...(values.firstName && {firstName: values.firstName}),
                ...(values.lastName && {lastName: values.lastName}),
                ...(values.email && {email: values.email}),
                ...(values.phoneNumber && {phoneNumber: values.phoneNumber})
            }
        })
        .then(res => {
            console.log(res.data.message);
        })
        .catch(err => {
            err.response.data.message && setError({"error": err.response.data.message})
        })
    }

    render() {
        return (
            <div>
                <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            phoneNumber: ""
                        }}
                        onSubmit={(values, actions) => {
                            handleSubmit(values);
                            actions.setSubmitting(false);
                        }}
                        render={props => (
                            // TODO => form validation, mandatory fields
                            <form onSubmit={props.handleSubmit}>
    
                                <label>First name:</label>
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.firstName}
                                    name="firstName"
                                />
    
                                <label>Last name:</label>
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.lastName}
                                    name="lastName"
                                />
    
                                
    
                                <label>Email:</label>
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    name="email"
                                />
                                <label>Phone number:</label>
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.phoneNumber}
                                    name="phoneNumber"
                                />
    
                                {error.error &&
                                    <div>
                                        {error.error}
                                    </div>
                                }
                                {phase === 1 && 
                                    <button type="button" onClick={() => setPhase(2)}>Submit</button>
                                
                                }
    
                                {phase === 2 &&
                                <div>
                                    <button type="submit" onClick={() =>{ 
                                        setPhase(1);
                                        props.submitForm();
                                        }}>Yes</button>
                                    <button type="button" onClick={() => setPhase(1)}>No</button>
                                </div>
                                }
    
                            </form>
                        )}
                    />
            </div>
        )

    }
}

export default ModifyUser;