import React from "react";
import {Formik} from 'formik';
import axios from 'axios'
import Select from "../components/Select";
import utils from "../utils/utils";



class AddBookForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {publishers: {}}
    }

    componentDidMount() {

        axios({
            method: "GET",
            url: "http://localhost:3000/getAllPubs"
        })
        .then((res) => {
            this.setState(state => {
                return {publishers: res.data}
            })
        })
    }

    render() {
        return (
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: "",
                        authorFirst: "",
                        authorLast: "",
                        pubYear: "",
                        pubId: "",
                        series: "",
                        edition: "",
                        genreId: "",
                        lang: "",
                        translatorId: "",
                        isbn: "",
                        keywords: "",
                        ukd: ""
                    }}
                    onSubmit={(values, actions) => {
                        this.props.handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    render={props => (
                        // TODO => form validation, mandatory fields
                        <form onSubmit={props.handleSubmit}>
                            <label>Title:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.title}
                                name="title"
                            />
                            {/* {props.errors.name && (
                                <div id="feedback">
                                    {props.errors.name}
                                </div>
                            )} */}
                            <label>Author first name:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.authorFirst}
                                name="authorFirst"
                            />

                            <label>Author last name:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.authorLast}
                                name="authorLast"
                            />

                            <label>Publication year:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.pubYear}
                                name="pubYear"
                            />
                            <label>Series:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.series}
                                name="series"
                            />
                            <label>Edition:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.edition}
                                name="edition"
                            />
                            <label>Isbn:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.isbn}
                                name="isbn"
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
                            <label>UKD:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.ukd}
                                name="ukd"
                            />

                            <label>Language:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lang}
                                name="lang"
                            />

                            {/* <Select
                                label="Genre:"
                                name="genreId"
                                value="genreId"
                                options={
                                    this.state.genres &&
                                    convertToSelectOptions(
                                        this.state.genres
                                    )
                                }
                                formikProps={props}
                            /> */}

                            <Select
                                label="Publisher:"
                                name="pubId"
                                value="pubId"
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


export default AddBookForm;