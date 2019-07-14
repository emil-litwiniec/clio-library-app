import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils";

const PublisherSchema = Yup.object().shape({
    name: Yup.string().required(),
    estYear: Yup.string().matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.' ).notRequired(),
    address: Yup.string().notRequired(),
    origin: Yup.string().matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter country code.').required()

})

class PublishersControl extends React.Component {
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

                                    <button type="button" onClick={() => {

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
                                                name: '',
                                                estYear: '',
                                                address: '',
                                                origin: '',
                                                pubId: props.values.pubId
                                            })

                                            this.setState(state => ({...state, phase: 4}))
                                            
                                            
                                            }}>
                                            Create
                                    </button>
                                </>
                            )}
                            {this.state.phase === 2 && 
                            <>
                            <label>Name:</label>
                            <input
                                type="text"
                                id="name"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.name}
                                name="name"
                            />
                            {props.errors.name && props.touched.name ?(
                                <div id="feedback">
                                    {props.errors.name}
                                </div>
                            ) : null} 

                            <label>Est year:</label>
                            <input
                                type="text"
                                id="estYear"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.estYear}
                                name="estYear"
                            />
                            {props.errors.estYear && props.touched.estYear ?(
                                <div id="feedback">
                                    {props.errors.estYear}
                                </div>
                            ) : null} 

                            <label>Address:</label>
                            <input
                                type="text"
                                id="address"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.address}
                                name="address"
                            />
                            {props.errors.address && props.touched.address ?(
                                <div id="feedback">
                                    {props.errors.address}
                                </div>
                            ) : null} 


                            <label>origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
                            />
                            {props.errors.origin && props.touched.origin ?(
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
                            <button onClick={() => this.handleDelete(props.values.pubId)}>Yes</button>
                            <button onClick={() => this.setState(state => ({...state, phase: 1}))}>No</button>
                            </>}

                            {this.state.phase === 4 && 
                            <>
                            <label>Name:</label>
                            <input
                                type="text"
                                id="name"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.name}
                                name="name"
                            />
                            {props.errors.name && props.touched.name ?(
                                <div id="feedback">
                                    {props.errors.name}
                                </div>
                            ) : null} 

                            <label>Est year:</label>
                            <input
                                type="text"
                                id="estYear"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.estYear}
                                name="estYear"
                            />
                            {props.errors.estYear && props.touched.estYear ?(
                                <div id="feedback">
                                    {props.errors.estYear}
                                </div>
                            ) : null} 

                            <label>Address:</label>
                            <input
                                type="text"
                                id="address"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.address}
                                name="address"
                            />
                            {props.errors.address && props.touched.address ?(
                                <div id="feedback">
                                    {props.errors.address}
                                </div>
                            ) : null} 


                            <label>origin:</label>
                            <input
                                type="text"
                                id="origin"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.origin}
                                name="origin"
                            />
                            {props.errors.origin && props.touched.origin ?(
                                <div id="feedback">
                                    {props.errors.origin}
                                </div>
                            ) : null} 
                            
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => this.setState(state => ({ ...state, phase: 1}))}>Back</button>
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

export default PublishersControl;