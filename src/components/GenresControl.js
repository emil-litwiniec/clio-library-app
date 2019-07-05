import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from 'yup';

import Select from "./Select";
import utils from "../utils/utils"
import ShowMessageAndError from "./ShowMessageAndError";

const GenreSchema = Yup.object().shape({
    genreName: Yup.string().required(),
})


class GenresControl extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = { 
            phase: 1,
            done: false,
            genres: [],
            message: '',
            error: ''
        };
    }

    componentDidMount(){
        this.updateState();
    }

    componentDidUpdate(prevProps, prevState){
        prevState.message && setTimeout(() => this.setState((state) =>({
            ...state,
            message: ''
        })), 4000);

        prevState.error && setTimeout(() => this.setState((state) => ({
            ...state,
            error: ''
        })), 4000)
    }

    updateState() {
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
        .catch(err => {
            this.setState(state => ({
                ...state,
                error: err
            }))
        });
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

            this.setState(state => ({
                ...state,
                 phase: 1,
                 ...(res.data.message && {
                    message: res.data.message
                })
                }));
            this.updateState();
        })
        .catch(err => {
            this.setState(state => ({
                ...state,
                error: err
            }))
        });
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
            this.setState(state => ({
                ...state,
                phase: 1,
                ...(res.data.message && {
                    message: res.data.message
                })
            }));
            this.updateState();
        })
        .catch(err => {
            this.setState(state => ({
                ...state,
                error: err
            }))
        });

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
            this.setState(state => ({
                ...state,
                phase: 1,
                ...(res.data.message && {
                    message: res.data.message
                })
            }));
            this.updateState();
        })
        .catch(err => {
            this.setState(state => ({
                ...state,
                error: err
            }))
        });

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
                        genreId: this.state.genres[0].genre_id,
                        genreName: ''
                    }}
                    validationSchema={GenreSchema}
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

                                        const findData = (arr, id, data) => {
                                            return arr.find(el => el.genre_id == id)[`${data}`]
                                        }

                                        props.setValues({
                                            genreName: findData(this.state.genres, props.values.genreId, 'genre_name'), 
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
                                        onClick={() => {
                                            props.setValues({
                                                genreName: '', 
                                                genreId: props.values.genreId
                                            })
                                            this.setState(state => ({...state, phase: 4}))}
                                            }>
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
                            {props.errors.genreName && props.touched.genreName ?(
                                <div id="feedback">
                                    {props.errors.genreName}
                                </div>
                            ) : null} 

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
                            {props.errors.genreName && props.touched.genreName ?(
                                <div id="feedback">
                                    {props.errors.genreName}
                                </div>
                            ) : null} 

                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => this.setState(state => ({ ...state, phase: 1}))}>Back</button>
                            </>}
                            <ShowMessageAndError state={this.state}/>


                        </form>
                    )}
                />
                }
            </div>
        );
    }
}

export default GenresControl;