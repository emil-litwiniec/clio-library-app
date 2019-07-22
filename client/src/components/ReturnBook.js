import React from 'react';
import axios from "axios";
import { Formik } from 'formik';



const ReturnBook = () => {

    const handleSubmit = () => {
        axios({
            method: ""
        })
    }
    return (
        <Formik
                enableReinitialize
                initialValues={{
                    bookId: ""
                }}
                onSubmit={(values, actions) => {
                    handleSubmit(values);

                    actions.setSubmitting(false);
                }}
                render={props => (
                    <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.bookId}
                            name="bookId"
                        />
                        {props.errors.name && (
                            <div id="feedback">{props.errors.name}</div>
                        )}
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
    )
};

export default ReturnBook;