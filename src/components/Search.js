import React from "react";
import { Formik } from "formik";
import axios from "axios";

const Search = () => {

    const handleSubmit = (values) => {
          

          axios({
            method: 'get',
            url: 'http://localhost:3000/search',
            params: {
                query: values.query,
                col: values.searchBy,
                value: values.value
            }
        
          })
            .then((res) => {

                alert(JSON.stringify(res, null ,2 ));
               
            })
            .catch(err => {
                alert(JSON.stringify(err, null ,2 ))
            
            }
            )

    }
    return (
        <div>
            <h3>Search:</h3>
            <Formik
                initialValues={{
                    value: "",
                    query: "b",
                    searchBy: "title"
                }}
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    handleSubmit(values);
                    actions.setSubmitting(false);
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
                            name="query"
                            value={props.values.query}
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
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    );
}

export default Search;