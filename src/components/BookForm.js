import React from "react";
import {Formik} from 'formik';
import axios from 'axios'
import Select from "./Select";
import utils from "../utils/utils";



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
        
        return (
            <div>
                {console.log(this.state.results)}
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: this.props.values ? this.state.results.title : '',
                        authorFirst: this.props.values ? this.state.results.first_name : "",
                        authorLast: this.props.values ? this.state.results.last_name : "",
                        pubYear: this.props.values ? this.state.results.year : "",
                        pubId: this.props.values ? this.state.results.pubId : "",
                        series: this.props.values ? this.state.results.series : "",
                        edition: this.props.values ? this.state.results.edition : "",
                        genreId: this.props.values ? this.props.values.genre_id : "" ,
                        lang: this.props.values ? this.state.results.lang : "",
                        translatorId: this.props.values ? this.state.results.translatorId : "",
                        isbn: this.props.values ? this.state.results.isbn : "",
                        keywords: this.props.values ? this.state.results.keywords : "",
                        ukd: this.props.values ? this.state.results.ukd : ""
                    }}
                    onSubmit={(values, actions) => {
                        this.props.handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    render={props => (
                        // TODO => form validation, mandatory fields
                        <form onSubmit={props.handleSubmit}>
                            {console.log(props.values.genreId)}
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

                            {/* {console.log(props)} */}
                            <Select
                                label="Genre:"
                                name="genreId"
                                value={props.values.genreId}
                                // value='3'
                                options={
                                    utils.convertToSelectOptions.genres(this.state.genres)
                                }
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


export default AddBookForm;