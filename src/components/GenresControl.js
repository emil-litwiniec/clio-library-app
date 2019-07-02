import React from 'react';
import { Formik } from "formik";
import axios from "axios";

import Select from "./Select";
import utils from "../utils/utils"


class GenresControl extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { 
            phase: 1,
            done: false
        };
    }

    componentDidMount(){
        axios({
            method: "GET",
            url: "http://localhost:3000/getAllGenres"
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                genres: res.data, 
                done: true
            }))
        })
    }


    handleDelete() {
        console.log('Handle delete!')
        this.setState(state => ({...state , phase: 1}));

    }

    handleSubmit(values) {
        console.log('Handle submit: ', values)
        this.setState(state => ({...state , phase: 1}));
    }

    render() {
        return (

            <div>
                {this.state.done &&
                
                <Formik
                    enableReinitialize
                    initialValues={{
                        genreId: '1',
                        genreName: 'koko'
                    }}
                    onSubmit={(values, actions) => {
                        this.setState(state => ({...state, phase: 1}))
                        this.handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            {this.state.phase === 1 && (
                                <>
                                    <Select
                                        label="Genre:"
                                        name="genreId"
                                        
                                        value={props.values.genreId}
                                        options={utils.convertToSelectOptions.genres(
                                            this.state.genres
                                        )}
                                        formikProps={props}
                                    />

                                    <button type="button" onClick={() => {
                                        props.setValues({
                                            genreName: this.state.genres[parseInt(props.values.genreId) - 1].genre_name, 
                                            genreId: props.values.genreId
                                        })
                                            this.setState(state => ({...state, phase: 2}));
                                
                                }}>Modify</button>
                                    <button type="button" onClick={() => this.setState(state => ({...state, phase: 3}))}>Delete</button>
                                </>
                            )}
                            {this.state.phase === 2 && 
                            <>
                            <label>Genre name:</label>
                            {console.log(props)}
                            <input
                                type="text"
                                id="genreName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.genreName}
                                name="genreName"
                            />
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => this.setState(state => ({ ...state, phase: 1}))}>Back</button>
                            </>}

                            {this.state.phase === 3 &&
                            <>
                            <p>Are you sure?</p>
                            <button onClick={this.handleDelete}>Yes</button>
                            <button onClick={() => this.setState(state => ({...state, phase: 1}))}>No</button>
                            </>}

                        </form>
                    )}
                />
                }
            </div>
        );
    }
}

export default GenresControl;