import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import Select from './Select';
import {setActualQuery} from "../actions/actualQuery"
import utils from "../utils/utils";

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200
    },
}));


const Search = (props) => {
    const classes = useStyles();
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
                        

                        <TextField
                            id="outlined-name"
                            label="Search"
                            className={classes.textField}
                            value={props.values.value}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="value"
                            margin="normal"
                            variant="outlined"
                        />

                        <Select
                            label="Search by:"
                            name="searchBy"
                            value={props.values.searchBy}
                            options={selectOptions.searchBy}
                            formikProps={props}
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />
                        <Select
                            label="Search in:"
                            name="searchIn"
                            value={props.values.searchIn}
                            options={selectOptions.searchIn}
                            formikProps={props}
                        />

                        <TextField
                            id="outlined-name"
                            label="From year"
                            className={classes.textField}
                            value={props.values.yearStart}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="value"
                            margin="normal"
                            variant="outlined"
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />
                        <TextField
                            id="outlined-name"
                            label="To year"
                            className={classes.textField}
                            value={props.values.yearEnd}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="value"
                            margin="normal"
                            variant="outlined"
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />
                       
        

                        <Select
                            label="Genre:"
                            name="genre"
                            value={props.values.genre}
                            options={utils.convertToSelectOptions.genres(
                                genres.genres
                            )}
                            formikProps={props}
                            disabled={
                                props.values.searchIn === "a" ? true : false
                            }
                        />

                        {props.values.searchIn !== "a" && (
                            <Select
                                label="Order by:"
                                name="titlesOrderBy"
                                value={props.values.titlesOrderBy}
                                options={selectOptions.titles}
                                formikProps={props}
                            />
                        )}

                        {props.values.searchIn === "a" && (
                            <Select
                                label="Order by:"
                                name="authorsOrderBy"
                                value={props.values.authorsOrderBy}
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
