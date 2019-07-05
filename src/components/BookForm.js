import React from "react";
import {Formik} from 'formik';
import axios from 'axios'
import Select from "./Select";
import utils from "../utils/utils";
import * as Yup from "yup";

const Schema = Yup.object().shape({
    title: Yup.string().required(),
    authorFirst: Yup.string().required(),
    authorLast: Yup.string().required(),
    pubYear: Yup.string().matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.' ).required(),
    lang: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter language code.').required(),
    isbn: Yup.string().required(),
    genreId: Yup.number().required(),
    series: Yup.string().notRequired(),
    edition: Yup.string().notRequired(),
    ukd: Yup.string().notRequired(),
    pubId: Yup.number().notRequired()

})



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
                    validationSchema={Schema}
                    onSubmit={(values, actions) => {
                        this.props.handleSubmit(values);
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <label>Title:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.title}
                                name="title"
                            />
                            {props.errors.title && props.touched.title ?(
                                <div id="feedback">
                                    {props.errors.title}
                                </div>
                            ) : null} 
                            <label>Author first name:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.authorFirst}
                                name="authorFirst"
                            />
                            {props.errors.authorFirst && props.touched.authorFirst ?(
                                <div id="feedback">
                                    {props.errors.authorFirst}
                                </div>
                            ) : null} 

                            <label>Author last name:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.authorLast}
                                name="authorLast"
                            />
                            {props.errors.authorLast && props.touched.authorLast ?(
                                <div id="feedback">
                                    {props.errors.authorLast}
                                </div>
                            ) : null} 

                            <label>Publication year:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.pubYear}
                                name="pubYear"
                            />
                            {props.errors.pubYear && props.touched.pubYear ?(
                                <div id="feedback">
                                    {props.errors.pubYear}
                                </div>
                            ) : null} 
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
                            {props.errors.isbn && props.touched.isbn ?(
                                <div id="feedback">
                                    {props.errors.isbn}
                                </div>
                            ) : null} 

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
                            {props.errors.lang && props.touched.lang ?(
                                <div id="feedback">
                                    {props.errors.lang}
                                </div>
                            ) : null} 

                            <Select
                                label="Genre:"
                                name="genreId"
                                value={props.values.genreId}
                                options={
                                    utils.convertToSelectOptions.genres(this.state.genres)
                                }
                                formikProps={props}
                            />
                            {props.errors.genreId && props.touched.genreId ?(
                                <div id="feedback">
                                    {props.errors.genreId}
                                </div>
                            ) : null} 

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