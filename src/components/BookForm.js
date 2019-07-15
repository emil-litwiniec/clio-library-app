import React from "react";
import {Formik} from 'formik';
import axios from 'axios'
import Select from "./Select";
import utils from "../utils/utils";
import * as Yup from "yup";

import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"

import { MyTextField } from "./myMuiComponents";

const required = "Required field"

const Schema = Yup.object().shape({
    title: Yup.string().required(required),
    authorFirst: Yup.string().required(required),
    authorLast: Yup.string().required(required),
    pubYear: Yup.string().matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.' ).required(required),
    lang: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter language code.').required(required),
    isbn: Yup.string().required(required),
    genreId: Yup.number().required(required),
    series: Yup.string().notRequired(),
    edition: Yup.string().notRequired(),
    ukd: Yup.string().notRequired(),
    pubId: Yup.number().notRequired()

})

const styles = {

}



class AddBookForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            done: false,
            publishers: [{
                value: '',
                name: "none",
                label:"none"
            }],
            genres: [],
            results: {}
    }
    }

    componentDidMount() {

        const { values }  = this.props;
        if(!values) {


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
                    results: {
                        title: "",
                        first_name: "",
                        last_name: "",
                        year: "",
                        pub_id: "",
                        series: "",
                        edition: "",
                        genreId: "",
                        lang: "",
                        translatorId: "",
                        isbn: "",
                        keywords: "",
                        ukd: ""
                    },
                    genres: genreRes.data,
                    publishers: [ ...state.publishers, ...pubRes.data],
                    done: true
                }))
            });
            
        } else {

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
                    results: values,
                    genres: genreRes.data,
                    publishers: [ ...state.publishers, ...pubRes.data],
                    done: true
                }))
            });

        }
        

    }

    render() {
        const { classes } = this.props; 
        return (
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: this.state.results.title || "",
                        authorFirst:
                            this.state.results.first_name || "",
                        authorLast: this.state.results.last_name || "",
                        pubYear: this.state.results.year || "",
                        pubId: this.state.results.pub_id || "",
                        series: this.state.results.series || "",
                        edition: this.state.results.edition || "",
                        genreId: this.state.results.genre_Id || "",
                        lang: this.state.results.lang || "",
                        // translatorId: this.state.results &&
                        //     this.state.results.translatorId
                        //     ,
                        isbn: this.state.results.isbn || "",
                        // keywords: this.state.results &&
                        //     this.state.results.keywords
                        //     ,
                        ukd: this.state.results.ukd || ""
                    }}
                    validationSchema={Schema}
                    onSubmit={(values, actions) => {
                        this.props.handleSubmit(values);
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>

                            <MyTextField
                                id="title"
                                label="Title"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />

                            <MyTextField
                                id="authorFirst"
                                label="Author first name"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />

                            <MyTextField
                                id="authorLast"
                                label="Author last name"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />


                            <MyTextField
                                id="pubYear"
                                label="Publication year"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />
                            <MyTextField
                                id="series"
                                label="Series"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />
                            <MyTextField
                                id="edition"
                                label="Edition"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />

                            <MyTextField
                                id="isbn"
                                label="Isbn"
                                props={props}
                                className={classes.textField}
                                margin="normal"
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

                            <MyTextField
                                id="ukd"
                                label="UKD"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />
                            <MyTextField
                                id="lang"
                                label="Language"
                                props={props}
                                className={classes.textField}
                                margin="normal"
                            />


                            <Select
                                label="Genre:"
                                name="genreId"
                                errorMessage={
                                    props.errors.genreId &&
                                    props.touched.genreId
                                        ? props.errors.genreId
                                        : ""
                                }
                                error={
                                    props.errors.genreId &&
                                    props.touched.genreId
                                        ? true
                                        : false
                                }
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