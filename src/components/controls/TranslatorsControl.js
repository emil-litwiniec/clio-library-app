import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";


import { MyTextField, AreYouSure, ModifySubmitBackBtnGroup, SubmitBackBtnGroup } from "../myMuiComponents"
import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils";

const required = 'Required field'
const TranslatorSchema = Yup.object().shape({
    firstName: Yup.string().required(required),
    lastName: Yup.string().required(required)
})

class TranslatorsControl extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteButton = this.handleDeleteButton.bind(this)
        this.handleCreateButton = this.handleCreateButton.bind(this)
        this.handleModifyButton = this.handleModifyButton.bind(this)
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

    handleModifyButton(props) {
        const findData = (arr, id, data) => {
            return arr.find(el => el.pub_id == id)[`${data}`]
        }

        props.setValues({
            name: findData(this.state.publishers, props.values.pubId, 'name') || '', 
            estYear: findData(this.state.publishers, props.values.pubId, 'est_year') || '', 
            address: findData(this.state.publishers, props.values.pubId, 'address') || '', 
            origin: findData(this.state.publishers, props.values.pubId, 'origin') || '', 
            pubId: props.values.pubId
        })
            this.setState(state => ({...state, phase: 2}));
    }


    handleCreateButton(props) { 

        props.setValues({
            name: '',
            estYear: '',
            address: '',
            origin: '',
            pubId: props.values.pubId
        })

        this.setState(state => ({...state, phase: 4}))
        
    }

    handleDeleteButton() {
        this.setState(state => ({...state, phase: 3}))
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

    handleModifyButton(props) {
        const findData = (arr, id, data) => {
            return arr.find(el => el.translator_id == id)[`${data}`]
        }

        props.setValues({
            firstName: findData(this.state.translators, props.values.translatorId, 'first_name') || '', 
            lastName: findData(this.state.translators, props.values.translatorId, 'last_name') || '', 
            translatorId: props.values.translatorId
        })
            this.setState(state => ({...state, phase: 2}));
    }


    handleCreateButton(props) { 

        props.setValues({
            firstName: '',
            lastName: '',
            translatorId: props.values.translatorId
        })

        this.setState(state => ({...state, phase: 4}))
        
    }

    handleDeleteButton() {
        this.setState(state => ({...state, phase: 3}))
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

                                    <ModifySubmitBackBtnGroup
                                        handleCreateButton={this.handleCreateButton}
                                        handleDeleteButton={this.handleDeleteButton}
                                        handleModifyButton={this.handleModifyButton}
                                        props={props}
                                    />
                                </>
                            )}
                            {this.state.phase === 2 && 
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

                            <SubmitBackBtnGroup 
                                that={this}  
                                props={props}
                            />
                            </>}

                            {this.state.phase === 3 &&
                            // CONFIRM DELETE PHASE
                            <AreYouSure 
                                that={this}
                                id="translatorId"
                                props={props}
                            />}

                            {this.state.phase === 4 && 
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

                            <SubmitBackBtnGroup 
                                that={this}  
                                props={props}
                            />
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