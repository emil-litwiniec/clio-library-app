import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from 'yup';

import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";

import Select from "../Select";
import utils from "../../utils/utils"
import ShowMessageAndError from "../ShowMessageAndError";


const GenreSchema = Yup.object().shape({
    genreName: Yup.string().required("Required field"),
})


class GenresControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateButton = this.handleCreateButton.bind(this);
        this.handleModifyButton = this.handleModifyButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
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

    handleModifyButton(props) {
        const findData = (arr, id, data) => {
            return arr.find(el => el.genre_id == id)[`${data}`]
        }

        props.setValues({
            genreName: findData(this.state.genres, props.values.genreId, 'genre_name'), 
            genreId: props.values.genreId
        })
            this.setState(state => ({...state, phase: 2}));
    }

    handleDeleteButton() {
        this.setState(state => ({...state, phase: 3}))
    }

    handleCreateButton(props) {

        props.setValues({
            genreName: '', 
            genreId: props.values.genreId
        })
        this.setState(state => ({...state, phase: 4}))
    }

    render() {
        return (
            <div>
                {this.state.done && (
                    <Formik
                        enableReinitialize
                        initialValues={{
                            genreId: this.state.genres[0].genre_id,
                            genreName: ""
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
                                            
                                        <ButtonGroup>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() =>
                                                this.handleModifyButton(
                                                    props
                                                )
                                            }
                                        >
                                            Modify
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={
                                                this.handleDeleteButton
                                            }
                                        >
                                            Delete
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() =>
                                                this.handleCreateButton(
                                                    props
                                                )
                                            }
                                        >
                                            Create
                                        </Button>

                                        </ButtonGroup>
                                    </>
                                )}
                                {this.state.phase === 2 && (
                                    <>

                                        <TextField
                                            type="text"
                                            error={
                                                props.errors
                                                    .genreName &&
                                                props.touched.genreName
                                            }
                                            helperText={
                                                props.errors
                                                    .genreName &&
                                                props.touched.genreName
                                                    ? props.errors
                                                          .genreName
                                                    : null
                                            }
                                            id="genreName"
                                            label="Genre name"
                                            variant="outlined"
                                            onChange={
                                                props.handleChange
                                            }
                                            onBlur={props.handleBlur}
                                            value={
                                                props.values.genreName
                                            }
                                            name="genreName"
                                        />
                                        <ButtonGroup>

                                            <Button type="submit">
                                                Submit
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    this.setState(
                                                        state => ({
                                                            ...state,
                                                            phase: 1
                                                        })
                                                    )
                                                }
                                            >
                                                Back
                                            </Button>

                                        </ButtonGroup>

                                    </>
                                )}

                                {this.state.phase === 3 && (
                                    // CONFIRM DELETE PHASE
                                    <>
                                            <Typography>
                                                Are you sure?
                                            </Typography>

                                        <ButtonGroup>

                                            <Button 

                                            onClick={() =>
                                                this.handleDelete(
                                                    props.values.genreId
                                                )
                                            }>
                                                Yes
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    this.setState(
                                                        state => ({
                                                            ...state,
                                                            phase: 1
                                                        })
                                                    )
                                                }
                                            >
                                                No
                                            </Button>
                                        </ButtonGroup>
                                        
                                    </>
                                )}

                                {this.state.phase === 4 && (
                                    <>

                                       

                                            <TextField
                                            label="Create genre"
                                            variant="outlined"
                                                type="text"
                                                id="genreName"
                                                error={props.errors.genreName &&
                                                    props.touched.genreName}
                                                helperText={
                                                    props.errors.genreName &&
                                            props.touched.genreName ? (
                                                    props.errors.genreName
                                            ) : null
                                                }
                                                onChange={
                                                    props.handleChange
                                                }
                                                onBlur={props.handleBlur}
                                                value={
                                                    props.values.genreName
                                                }
                                                name="genreName"
                                            /> 
                                        <ButtonGroup variant='outlined'>
                                            <Button
                                                type="submit"
                                                variant='outlined'
                                            >
                                                Submit
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outlined"
                                                onClick={() =>
                                                    this.setState(
                                                        state => ({
                                                            ...state,
                                                            phase: 1
                                                        })
                                                    )
                                                }
                                            >
                                                Back
                                            </Button>
                                        </ButtonGroup>

                                    </>
                                )}
                                <ShowMessageAndError
                                    state={this.state}
                                />
                                
                            </form>
                        )}
                    />
                )}
            </div>
        );
    }
}

export default GenresControl;