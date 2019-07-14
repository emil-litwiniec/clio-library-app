import React from "react";
import {Formik} from 'formik';
import axios from 'axios'
import Select from "./Select";
import utils from "../utils/utils";
import * as Yup from "yup";

import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"

const required = "Required field"

const Schema = Yup.object().shape({
    title: Yup.string().required(required),
    authorFirst: Yup.string().required(required),
    authorLast: Yup.string().required(required),
    pubYear: Yup.string().matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.' ).required(required),
    lang: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter language code.').required(required),
    isbn: Yup.string().required(required),
    genreId: Yup.number().required(required),
    series: Yup.string().notRequired(required),
    edition: Yup.string().notRequired(required),
    ukd: Yup.string().notRequired(required),
    pubId: Yup.number().notRequired(required)

})

const styles = {

}



class AddBookForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            publishers: [{
                value: '',
                label: "None",
                name: "None"
            }],
            genres: [],
            results: {}
    }
    }

    componentDidMount() {
        

        Promise.all([
            axios({
                method: "GET",
                url: "http://localhost:3000/getAllPubs"
            }),
            axios({
                method: "GET",
                url: "http://localhost:3000/getAllGenres"
            })
        ]).then(([pubRes, genreRes]) => {
            this.setState(state => ({
                ...state,
                results: this.props.values,
                genres: genreRes.data,
                publishers: [ ...state.publishers, ...pubRes.data]
            }))
        });
    }

    render() {
        const { classes } = this.props; 
        return (
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: this.props.values
                            ? this.state.results.title
                            : "",
                        authorFirst: this.props.values
                            ? this.state.results.first_name
                            : "",
                        authorLast: this.props.values
                            ? this.state.results.last_name
                            : "",
                        pubYear: this.props.values
                            ? this.state.results.year
                            : "",
                        pubId: this.props.values
                            ? this.state.results.pubId
                            : "",
                        series: this.props.values
                            ? this.state.results.series
                            : "",
                        edition: this.props.values
                            ? this.state.results.edition
                            : "",
                        genreId: this.props.values
                            ? this.props.values.genre_id
                            : "",
                        lang: this.props.values
                            ? this.state.results.lang
                            : "",
                        translatorId: this.props.values
                            ? this.state.results.translatorId
                            : "",
                        isbn: this.props.values
                            ? this.state.results.isbn
                            : "",
                        keywords: this.props.values
                            ? this.state.results.keywords
                            : "",
                        ukd: this.props.values
                            ? this.state.results.ukd
                            : ""
                    }}
                    validationSchema={Schema}
                    onSubmit={(values, actions) => {
                        this.props.handleSubmit(values);
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <TextField
                                // id="outlined-name"
                                label="Title"
                                error={
                                    props.errors.title &&
                                    props.touched.title
                                }
                                helperText={
                                    props.errors.title &&
                                    props.touched.title
                                        ? props.errors.title
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.title}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="title"
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                label="Author first name"
                                error={
                                    props.errors.authorFirst &&
                                    props.touched.authorFirst
                                }
                                helperText={
                                    props.errors.authorFirst &&
                                    props.touched.authorFirst
                                        ? props.errors.authorFirst
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.authorFirst}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="authorFirst"
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                label="Author last name"
                                error={
                                    props.errors.authorLast &&
                                    props.touched.authorLast
                                }
                                helperText={
                                    props.errors.authorLast &&
                                    props.touched.authorLast
                                        ? props.errors.authorLast
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.authorLast}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="authorLast"
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                label="Publication year"
                                error={
                                    props.errors.pubYear &&
                                    props.touched.pubYear
                                }
                                helperText={
                                    props.errors.pubYear &&
                                    props.touched.pubYear
                                        ? props.errors.pubYear
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.pubYear}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="pubYear"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Series"
                                className={classes.textField}
                                value={props.values.series}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="series"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Edition"
                                className={classes.textField}
                                value={props.values.edition}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="edition"
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                label="Isbn"
                                error={
                                    props.errors.isbn &&
                                    props.touched.isbn
                                }
                                helperText={
                                    props.errors.isbn &&
                                    props.touched.isbn
                                        ? props.errors.isbn
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.isbn}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="isbn"
                                margin="normal"
                                variant="outlined"
                            />

                            {/* <label>Keywords:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.keywords}
                                name="isbn"
                                disabled={true}
                            />

                            <label>Translator:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.translatorId}
                                name="isbn"
                                disabled={true}
                            /> */}

                            {/* UKD change type in SQL Database */}

                            <TextField
                                label="UKD"
                                className={classes.textField}
                                value={props.values.ukd}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="ukd"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Language"
                                error={
                                    props.errors.lang &&
                                    props.touched.lang
                                }
                                helperText={
                                    props.errors.lang &&
                                    props.touched.lang
                                        ? props.errors.lang
                                        : null
                                }
                                className={classes.textField}
                                value={props.values.lang}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="lang"
                                margin="normal"
                                variant="outlined"
                            />

                            <Select
                                label="Genre:"
                                name="genreId"
                                errorMessage={props.errors.genreId &&
                                    props.touched.genreId ? (
                                            props.errors.genreId
                                    ) : null}
                                error={props.errors.genreId &&
                                    props.touched.genreId ? true : false}
                                value={props.values.genreId}
                                options={utils.convertToSelectOptions.genres(
                                    this.state.genres
                                )}
                                formikProps={props}
                            />

                            <Select
                                label="Publisher:"
                                name="pubId"
                                value={props.values.pubId}
                                options={
                                    this.state.publishers &&
                                    utils.convertToSelectOptions.publishers(
                                        this.state.publishers
                                    )
                                }
                                formikProps={props}
                            />

                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
            </div>
        );
    }
}


export default withStyles(styles)(AddBookForm);