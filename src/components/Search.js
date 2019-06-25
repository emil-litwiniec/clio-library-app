import React from "react";
import { Formik } from "formik";

const Search = (props) => {
    return (
        <div>
            <h3>Search:</h3>
            <Formik
                initialValues={{
                    value: "",
                    searchIn: "b",
                    searchBy: "title",
                    yearStart: 1920,
                    yearEnd: 2019
                }}
                onSubmit={(values, actions) => {
                    props.handleSubmit(values);
                    actions.setSubmitting(false);
                    alert(JSON.stringify(values));
                }}
                
                render={props => (
                    <form onSubmit={props.handleSubmit}>
                        
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.value}
                            name="value"
                        />
                        {props.errors.name && (
                            <div id="feedback">{props.errors.name}</div>
                        )}
                         <label>Search by:</label>
                        <select
                            name="searchBy"
                            value={props.values.searchBy}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ display: "block" }}
                            disabled={props.values.searchIn === 'a' ? true : false}
                        >
                            <option value="title" label="Title">
                                Title
                            </option>
                            <option value="author" label="Author">
                                Author
                            </option>
                        </select>

                        <label>Search in:</label>
                        <select
                            name="searchIn"
                            value={props.values.searchIn}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ display: "block" }}
                        >
                            <option value="b" label="Books">
                                Books
                            </option>
                            <option value="a" label="Authors">
                                Authors
                            </option>
                        </select>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.yearStart}
                            name="yearStart"
                        />
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.yearEnd}
                            name="yearEnd"
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    );
}

export default Search;