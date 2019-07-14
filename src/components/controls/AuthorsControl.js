import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";


import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils"

const AuthorSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    origin: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter country code.').required()
})


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


    handleDelete(value) {
        axios({
            method: "DELETE",
            url: "http://localhost:3000/admin/removeAuthor",
            data: {
                authorId: value
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
                        authorId: this.state.authors[0].author_id,
                        firstName: '',
                        lastName: '',
                        origin: ''
                    }}
                    validationSchema={AuthorSchema}
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

                                        const findData = (arr, id, data) => {
                                            return arr.find(el => el.author_id == id)[`${data}`]
                                        }

                                        props.setValues({
                                            firstName: findData(this.state.authors, props.values.authorId, 'first_name') || '', 
                                            lastName: findData(this.state.authors, props.values.authorId, 'last_name') || '', 
                                            origin: findData(this.state.authors, props.values.authorId, 'origin') || '', 
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
                            {props.errors.firstName && props.touched.firstName ? (
                                <div id="feedback">
                                    {props.errors.firstName}
                                </div>
                            ) : null} 

                            <label>Last name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                                name="lastName"
                            />
                            {props.errors.lastName && props.touched.lastName ? (
                                <div id="feedback">
                                    {props.errors.lastName}
                                </div>
                            ) : null} 

                            <label>Origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
                            />
                            {props.errors.origin && props.touched.origin ? (
                                <div id="feedback">
                                    {props.errors.origin}
                                </div>
                            ) : null} 

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
                            {props.errors.firstName && props.touched.firstName ? (
                                <div id="feedback">
                                    {props.errors.firstName}
                                </div>
                            ) : null} 

                            <label>Last name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                                name="lastName"
                            />
                            {props.errors.lastName && props.touched.lastName ? (
                                <div id="feedback">
                                    {props.errors.lastName}
                                </div>
                            ) : null} 

                            <label>Origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
                            />
                            {props.errors.origin && props.touched.origin ? (
                                <div id="feedback">
                                    {props.errors.origin}
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

export default AuthorControl;