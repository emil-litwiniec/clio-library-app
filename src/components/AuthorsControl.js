import React from 'react';
import { Formik } from "formik";
import axios from "axios";

import Select from "./Select";
import utils from "../utils/utils"


class AuthorControl extends React.Component {
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
            message: '',
            authors: [],
            error: ''
        };
    }

    updateState() {
        axios({
            method: "GET",
            url: "http://localhost:3000/getAllAuthors"
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                authors: res.data, 
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
            url: "http://localhost:3000/admin/updateAuthor",
            data: {
                authorId: values.authorId,
                ...(values.firstName && {
                    firstName: values.firstName
                }),
                ...(values.lastName && { lastName: values.lastName }),
                ...(values.origin && { origin: values.origin })
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
            url: "http://localhost:3000/admin/addAuthor",
            data: {
                ...(values.firstName && {firstName: values.firstName}),
                ...(values.lastName && {lastName: values.lastName}),
                ...(values.origin && {origin: values.origin})
            }

        })
        .then(res => {
            this.setState(state => ({
                ...state ,
                phase: 1,
                ...(res.data.message && {message: res.data.message})    
            }
                ));
            this.updateState();
        })
        .catch(err => {
            this.setState(state => ({
                ...state,
                error: err
            }))
        });

    }

    componentDidMount(){
        this.updateState();
    }


    handleDelete(value) {
        axios({
            method: "DELETE",
            url: "http://localhost:3000/admin/removeAuthor",
            data: {
                authorId: value
            }
        })
        .then(res => {
            this.setState(state => ({...state , phase: 1}));
            this.updateState()

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
                        authorId: '1',
                        firstName: '',
                        lastName: '',
                        origin: ''
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
                                        label="Author:"
                                        name="authorId"
                                        
                                        value={props.values.authorId}
                                        options={utils.convertToSelectOptions.authors(
                                            this.state.authors
                                        )}
                                        formikProps={props}
                                    />

                                    <button type="button" onClick={() => {
                                        console.log(props.values)
                                        console.log(this.state.authors)

                                        const findAuthorsData = (arr, id, data) => {
                                            return arr.find(el => el.author_id == id)[`${data}`]
                                        }

                                        props.setValues({
                                            firstName: findAuthorsData(this.state.authors, props.values.authorId, 'first_name') || '', 
                                            lastName: findAuthorsData(this.state.authors, props.values.authorId, 'last_name') || '', 
                                            origin: findAuthorsData(this.state.authors, props.values.authorId, 'origin') || '', 
                                            authorId: props.values.authorId
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
                                                firstName: '',
                                                lastName: '',
                                                origin: '',
                                                authorId: props.values.authorId
                                            })

                                            this.setState(state => ({...state, phase: 4}))
                                            
                                            
                                            }}>
                                            Create
                                    </button>
                                </>
                            )}
                            {this.state.phase === 2 && 
                            <>
                            <label>First name: </label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.firstName}
                                name="firstName"
                            />

                            <label>Last name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                                name="lastName"
                            />
                            <label>Origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
                            />
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => this.setState(state => ({ ...state, phase: 1}))}>Back</button>
                            </>}

                            {this.state.phase === 3 &&
                            // CONFIRM DELETE PHASE
                            <>
                            <p>Are you sure?</p>
                            <button onClick={() => this.handleDelete(props.values.authorId)}>Yes</button>
                            <button onClick={() => this.setState(state => ({...state, phase: 1}))}>No</button>
                            </>}

                            {this.state.phase === 4 && 
                            <>
                            <label>First name: </label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.firstName}
                                name="firstName"
                            />

                            <label>Last name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                                name="lastName"
                            />
                            <label>Origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
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

export default AuthorControl;