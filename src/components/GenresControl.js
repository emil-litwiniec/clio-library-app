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
        this.updateGenresState = this.updateGenresState.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = { 
            phase: 1,
            done: false
        };
    }

    updateGenresState() {
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
    handleUpdate(values) {
        axios({
            method: "PATCH",
            url: "http://localhost:3000/admin/updateGenre",
            data: {
                genreId: values.genreId,
                genreNewName: values.genreName
            }

        })
        .then(res => {

            this.setState(state => ({...state , phase: 1}));
            this.updateGenresState();
        })
        .catch( err => 
            console.log(err)
            )
    }

    handleCreate(values) {
        axios({
            method: "PUT",
            url: "http://localhost:3000/admin/addGenre",
            data: {
                genreName: values.genreName
            }

        })
        .then(res => {
            
            this.setState(state => ({...state , phase: 1}));
            this.updateGenresState();
        })
        .catch(err => {
            console.log(err)
        })

    }

    componentDidMount(){
        this.updateGenresState();
    }


    handleDelete(value) {
        axios({
            method: "DELETE",
            url: "http://localhost:3000/admin/removeGenre",
            data: {
                genreId: value
            }
        })
        .then(res => {
            this.setState(state => ({...state , phase: 1}));
            this.updateGenresState()

        })

    }

    handleSubmit(values) {

        if(this.state.phase === 4) {
            // CREATE
            this.handleCreate(values);
            
        } else if(this.state.phase === 2) {
            // UPDATE
            this.handleUpdate(values)
            
        }
    }

    render() {
        return (

            <div>
                {this.state.done &&
                
                <Formik
                    enableReinitialize
                    initialValues={{
                        genreId: '1',
                        genreName: ''
                    }}
                    onSubmit={(values, actions) => {
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

                                        const findGenreName = (arr, id) => {
                                            return arr.find(el => el.genre_id == id).genre_name
                                        }

                                        props.setValues({
                                            genreName: findGenreName(this.state.genres, props.values.genreId), 
                                            genreId: props.values.genreId
                                        })
                                            this.setState(state => ({...state, phase: 2}));
                                
                                }}>Modify</button>

                                    <button 
                                    type="button" 
                                    onClick={() => this.setState(state => ({...state, phase: 3}))}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => this.setState(state => ({...state, phase: 4}))}>
                                            Create
                                    </button>
                                </>
                            )}
                            {this.state.phase === 2 && 
                            <>
                            <label>Genre name:</label>
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
                            // CONFIRM DELETE PHASE
                            <>
                            <p>Are you sure?</p>
                            <button onClick={() => this.handleDelete(props.values.genreId)}>Yes</button>
                            <button onClick={() => this.setState(state => ({...state, phase: 1}))}>No</button>
                            </>}

                            {this.state.phase === 4 && 
                            <>
                            <label>Create genre: </label>
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

                        </form>
                    )}
                />
                }
            </div>
        );
    }
}

export default GenresControl;