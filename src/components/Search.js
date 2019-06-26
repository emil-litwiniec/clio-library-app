import React from "react";
import { Formik } from "formik";

const Search = (props) => {
    return (
        <div>
            <h3>Search:</h3>
            <Formik
                enableReinitialize
                initialValues={{
                    value: "",
                    searchIn: "b",
                    searchBy: "title",
                    yearStart: 1920,
                    yearEnd: 2019,
                    titlesOrderBy: "titleAsc",
                    authorsOrderBy: "authorAsc"
                }}
                onSubmit={(values, actions) => {
                    props.handleSubmit(values);
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
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
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
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.yearEnd}
                            name="yearEnd"
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />

                        {props.values.searchIn !== "a" && (
                            <>
                                <label>Order by:</label>
                                <select
                                    name="titlesOrderBy"
                                    value={props.values.titlesOrderBy}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    style={{ display: "block" }}
                                >
                                    <option
                                        value="authorAsc"
                                        label="authorAsc"
                                    >
                                        authors ascending
                                    </option>
                                    <option
                                        value="authorDesc"
                                        label="authorDesc"
                                    >
                                        authors descending
                                    </option>
                                    <option
                                        value="titleAsc"
                                        label="titleAsc"
                                    >
                                        titles ascending
                                    </option>
                                    <option
                                        value="titleDesc"
                                        label="titleDesc"
                                    >
                                        titles descending
                                    </option>
                                </select>
                            </>
                        )}

                        {props.values.searchIn === "a" && (
                            <>
                                <label>Order by:</label>
                                <select
                                    name="authorsOrderBy"
                                    value={props.values.authorsOrderBy}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    style={{ display: "block" }}
                                >
                                    <option
                                        value="authorAsc"
                                        label="authorAsc"
                                    >
                                        authors ascending
                                    </option>
                                    <option
                                        value="authorDesc"
                                        label="authorDesc"
                                    >
                                        authors descending
                                    </option>
                                </select>
                            </>
                        )}

                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    );
}

export default Search;