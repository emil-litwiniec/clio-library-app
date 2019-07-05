import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import ShowMessageAndError from "./ShowMessageAndError";


const UserSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().min(6).required(),
    phoneNumber: Yup.number().required()
})


const CreateUser = () => {

    const [ phase, setPhase ] = useState(1);
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')

    useEffect(() => {
        message && setTimeout(() => {
            setMessage('')
        }, 4000);
        error && setTimeout(() => {
            setError('')
        })

        
    })

    const handleSubmit = (values) => {
        console.log(values);
        axios({
            method: "PUT",
            url: "http://localhost:3000/createUser",
            data: {
                ...(values.firstName && {firstName: values.firstName}),
                ...(values.lastName && {lastName: values.lastName}),
                ...(values.email && {email: values.email}),
                ...(values.password && {password: values.password}),
                ...(values.phoneNumber && {phoneNumber: values.phoneNumber})
            }
        })
        .then(res => {
            res.data.message && setMessage(res.data.message)
        })
        .catch(err => {
            err.response.data.message && setError(err.response.data.message)
        })
    }

    return (
        <div>
            <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        phoneNumber: ""
                    }}
                    validationSchema={UserSchema}
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
                                value={props.values.name}
                                name="firstName"
                            />
                            {props.errors.firstName && props.touched.firstName ?(
                                <div id="feedback">
                                    {props.errors.firstName}
                                </div>
                            ) : null} 

                            <label>Last name:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.surname}
                                name="lastName"
                            />
                            {props.errors.lastName && props.touched.lastName ?(
                                <div id="feedback">
                                    {props.errors.lastName}
                                </div>
                            ) : null} 

                            <label>Password:</label>
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

                            <label>Email:</label>
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

                            <label>Phone number:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.phoneNumber}
                                name="phoneNumber"
                            />

                            {props.errors.phoneNumber && props.touched.phoneNumber ?(
                                <div id="feedback">
                                    {props.errors.phoneNumber}
                                </div>
                            ) : null} 
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

                            <ShowMessageAndError state={{message, error}}/>


                        </form>
                    )}
                />
        </div>
    )
}

export default CreateUser;