import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import Select from "./Select";
import ShowMessageAndError from "./ShowMessageAndError";
import utils from "../utils/utils";


const TranslatorSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required()
})

class TranslatorsControl extends React.Component {
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
            translators: [],
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
            url: "http://localhost:3000/getAllTranslators"
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                translators: res.data, 
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
            url: "http://localhost:3000/admin/updateTranslator",
            data: {
                translatorId: values.translatorId,
                ...(values.firstName && {
                    firstName: values.firstName
                }),
                ...(values.lastName && { lastName: values.lastName })
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
            url: "http://localhost:3000/admin/addTranslator",
            data: {
                ...(values.firstName && {firstName: values.firstName}),
                ...(values.lastName && {lastName: values.lastName})
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
            url: "http://localhost:3000/admin/removeTranslator",
            data: {
                translatorId: value
            }
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                 phase: 1,
                 ...(res.data.message && {message: res.data.message})
                }));
            this.updateState()

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
                        translatorId: this.state.translators[0].translator_id,
                        firstName: '',
                        lastName: ''
                    }}
                    validationSchema={TranslatorSchema}
                    onSubmit={(values, actions) => {
                        this.handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            {this.state.phase === 1 && (
                                <>
                                    <Select
                                        label="Translators:"
                                        name="translatorId"
                                        
                                        value={props.values.translatorId}

                                        options={utils.convertToSelectOptions.translators(
                                            this.state.translators
                                        )}
                                        formikProps={props}
                                    />

                                    <button type="button" onClick={() => {
                                       

                                        const findData = (arr, id, data) => {
                                            return arr.find(el => el.translator_id == id)[`${data}`]
                                        }

                                        props.setValues({
                                            firstName: findData(this.state.translators, props.values.translatorId, 'first_name') || '', 
                                            lastName: findData(this.state.translators, props.values.translatorId, 'last_name') || '', 
                                            translatorId: props.values.translatorId
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
                                                translatorId: props.values.translatorId
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

                            {props.errors.lastName && props.touched.lastName ?(
                                <div id="feedback">
                                    {props.errors.lastName}
                                </div>
                            ) : null} 

                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => this.setState(state => ({ ...state, phase: 1}))}>Back</button>
                            </>}

                            {this.state.phase === 3 &&
                            // CONFIRM DELETE PHASE
                            <>
                            <p>Are you sure?</p>
                            <button onClick={() => this.handleDelete(props.values.translatorId)}>Yes</button>
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
                            {props.errors.firstName && props.touched.firstName ?(
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
                            {props.errors.lastName && props.touched.lastName ?(
                                <div id="feedback">
                                    {props.errors.lastName}
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



export default TranslatorsControl;