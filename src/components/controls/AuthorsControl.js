import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { withStyles} from "@material-ui/styles"
import { MyTextField,
    AreYouSure,
    ModifySubmitBackBtnGroup,
     SubmitBackBtnGroup } from "../myMuiComponents";

import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils"

const required = "Required field"

const AuthorSchema = Yup.object().shape({
    firstName: Yup.string().required(required),
    lastName: Yup.string().required(required),
    origin: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter country code.').required(required)
})

const styles = {

}


class AuthorControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this) 
        this.handleModifyButton = this.handleModifyButton.bind(this) 
        this.handleCreateButton = this.handleCreateButton.bind(this);
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

    handleModifyButton( props ) {
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
    }

    handleCreateButton( props ) {

        props.setValues({
            firstName: '',
            lastName: '',
            origin: '',
            authorId: props.values.authorId
        })

        this.setState(state => ({...state, phase: 4}))
        
        
    }
    handleDeleteButton() {
        this.setState(state => (
            {...state, phase: 3}
            ))
    }

    render() {
        return (
            <div>
                {this.state.done && (
                    <Formik
                        enableReinitialize
                        initialValues={{
                            authorId: this.state.authors[0].author_id,
                            firstName: "",
                            lastName: "",
                            origin: ""
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
                                            value={
                                                props.values.authorId
                                            }
                                            options={utils.convertToSelectOptions.authors(
                                                this.state.authors
                                            )}
                                            formikProps={props}
                                        />

                                        <ModifySubmitBackBtnGroup
                                            handleCreateButton={this.handleCreateButton}
                                            handleDeleteButton={this.handleDeleteButton}
                                            handleModifyButton={this.handleModifyButton}
                                            props={props}
                                        />
                                    </>
                                )}
                                {this.state.phase === 2 && (
                                    <>
                                        <MyTextField
                                            id="firstName"
                                            label="First name"
                                            props={props}
                                        />


                                        <MyTextField
                                            id="lastName"
                                            label="Last name"
                                            props={props}
                                        />

                                        <MyTextField
                                            id="origin"
                                            label="Origin"
                                            props={props}
                                        />

                                        <SubmitBackBtnGroup 
                                            that={this}
                                            props={props}
                                        />
                                    </>
                                )}

                                {this.state.phase === 3 && (
                                    // CONFIRM DELETE PHASE
                                    <>
                                        <AreYouSure
                                            that={this}
                                            id="authorId"
                                            props={props}
                                        />
                                    </>
                                )}

                                {this.state.phase === 4 && (
                                    <>
                                       <MyTextField
                                            id="firstName"
                                            label="First name"
                                            props={props}
                                        />

                                        <MyTextField
                                            id="lastName"
                                            label="Last name"
                                            props={props}
                                        />

                                        <MyTextField
                                            id="origin"
                                            label="Origin"
                                            props={props}
                                        />

                                        <SubmitBackBtnGroup 
                                            that={this}
                                            props={props}
                                        />
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

export default AuthorControl;