import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import Select from './Select';
import {setActualQuery} from "../actions/actualQuery"
import utils from "../utils/utils";


const Search = (props) => {
    const [ genres, setGenres ] = useState({
        genres: [{
            genre_id: 'all',
            genre_name: 'all'
        }],
        done: false
    });
    if(props.genreSelectOptions.length > 0 && !genres.done) {
        setGenres({
            genres: [...props.genreSelectOptions, ...genres.genres],
            done: true
        });


    }
    // console.log('selectOptionss', utils.convertToSelectOptions.genres(props.genreSelectOptions))
    const selectOptions = {
        titles: [
            {
                value: "authorAsc",
                label: "authorAsc",
                name: "authors ascending"
            },
            {
                value: "authorDesc",
                label: "authorDesc",
                name: "authors descending"
            },
            {
                value: "titleAsc",
                label: "titleAsc",
                name: "titles ascending"
            },
            {
                value: "titleDesc",
                label: "titleDesc",
                name: "titles descending"
            }
        ],
        authors: [
            
            {
                value: "authorDesc",
                label: "authorDesc",
                name: "authors descending"
            },
            {
                value: "authorAsc",
                label: "authorAsc",
                name: "authors ascending"
            }
        ],
        searchIn: [
            {
                value: "b",
                label: "books",
                name: "books"
            },
            {
                value: "a",
                label: "Authors",
                name: "authors"
            }
        ],
        searchBy: [
            {
                value: "title",
                label: "Title",
                name: "Title"
            },
            {
                value: "author",
                label: "Author",
                name: "Author"
            }
        ]
    };
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
                    authorsOrderBy: "authorDesc",
                    genre: "all"
                }}
                onSubmit={(values, actions) => {
                    props.handleSubmit(values);
                    props.setActualQuery(values);

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

                        <Select
                            label="Search by:"
                            name="searchBy"
                            value="searchBy"
                            options={selectOptions.searchBy}
                            formikProps={props}
                            disabled={props.values.searchIn === "a" ? true : false}
                        />
                        <Select
                            label="Search in:"
                            name="searchIn"
                            value="searchIn"
                            options={selectOptions.searchIn}
                            formikProps={props}
                        />
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
                        
                        <Select
                                label="Genre:"
                                name="genre"
                                value="genre"
                                options={utils.convertToSelectOptions.genres(genres.genres)}
                                formikProps={props}
                                disabled={props.values.searchIn === "a" ? true : false}
                            />
                        

                        {props.values.searchIn !== "a" && (
                            <Select
                                label="Order by:"
                                name="titlesOrderBy"
                                value="titlesOrderBy"
                                options={selectOptions.titles}
                                formikProps={props}
                            />
                        )}

                        {props.values.searchIn === "a" && (
                            <Select
                                label="Order by:"
                                name="authorsOrderBy"
                                value="authorsOrderBy"
                                options={selectOptions.authors}
                                formikProps={props}
                            />
                        )}

                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setActualQuery: (query) => dispatch(setActualQuery(query))
})

export default connect(undefined, mapDispatchToProps)(Search);
