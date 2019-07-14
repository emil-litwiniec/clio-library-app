import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { withStyles} from "@material-ui/styles";

import { MyTextField, AreYouSure, ModifySubmitBackBtnGroup, SubmitBackBtnGroup } from "../myMuiComponents"
import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils";

const required = "Required field"



const PublisherSchema = Yup.object().shape({
    name: Yup.string().required(required),
    estYear: Yup.string().matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.' ).notRequired(),
    address: Yup.string().notRequired(),
    origin: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter country code.').required(required)

})

const styles = {

}









class PublishersControl extends React.Component {
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
            publishers: [],
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
            url: "http://localhost:3000/getAllPubs"
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                publishers: res.data, 
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
            url: "http://localhost:3000/admin/updatePublisher",
            data: {
                pubId: values.pubId,
                ...(values.name && {
                    name: values.name
                }),
                ...(values.estYear && { estYear: values.estYear }),
                ...(values.address && { address: values.address }),
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
            url: "http://localhost:3000/admin/addPublisher",
            data: {
                ...(values.name && {
                    name: values.name
                }),
                ...(values.estYear && { estYear: values.estYear }),
                ...(values.address && { address: values.address }),
                ...(values.origin && { origin: values.origin })
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
            url: "http://localhost:3000/admin/removePublisher",
            data: {
                pubId: value
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
    

    render() {
        return (

            <div>
                {this.state.done &&
                
                <Formik
                    enableReinitialize
                    initialValues={{
                        pubId: this.state.publishers[0].pub_id,
                        name: '',
                        estYear: '',
                        address: '',
                        origin: ''
                    }}
                    validationSchema={PublisherSchema}
                    onSubmit={(values, actions) => {
                        this.handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            {this.state.phase === 1 && (
                                <>
                                    <Select
                                        label="Publishers:"
                                        name="pubId"
                                        
                                        value={props.values.pubId}

                                        options={utils.convertToSelectOptions.publishers(
                                            this.state.publishers
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
                                id="name"
                                label="Name"
                                props={props}
                            />
                            <MyTextField 
                                id="estYear"
                                label="Est year"
                                props={props}
                            />
                            <MyTextField 
                                id="address"
                                label="Address"
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
                            </>}

                            {this.state.phase === 3 &&
                            // CONFIRM DELETE PHASE
                            <AreYouSure 
                                that={this}
                                id="pubId"
                                props={props}
                            />
                        }

                            {this.state.phase === 4 && 
                            <>
                             <MyTextField 
                                id="name"
                                label="Name"
                                props={props}
                            />
                            <MyTextField 
                                id="estYear"
                                label="Est year"
                                props={props}
                            />
                            <MyTextField 
                                id="address"
                                label="Address"
                                props={props}
                            />
                            <MyTextField 
                                id="origin"
                                label="Origin"
                                props={props}
                            />
                            <SubmitBackBtnGroup that={this} props={props} />

                            
                            </>}

                            <ShowMessageAndError state={this.state} />

                        </form>
                    )}
                />
                }
            </div>
        );
    }
}

export default withStyles(styles)(PublishersControl);