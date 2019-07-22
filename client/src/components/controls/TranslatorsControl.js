import React from 'react';
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/styles/withStyles";

import { MyTextField, AreYouSure, ModifySubmitBackBtnGroup, SubmitBackBtnGroup } from "../myMuiComponents"
import Select from "../Select";
import ShowMessageAndError from "../ShowMessageAndError";
import utils from "../../utils/utils";

const required = 'Required field'
const TranslatorSchema = Yup.object().shape({
    firstName: Yup.string().required(required),
    lastName: Yup.string().required(required)
})

const styles = theme => ({
    toTheRight: {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
      },
      toTheLeft: {
          display: 'flex',
          justifyContent: 'flex-start',
      },
      boxWrapper: {
          marginTop: 40,
          marginBottom: 40
      },
      gridContainer: {
          display: "flex",
          alignItems: "center"
      },
      form: {
          width: '100%'
      }
  });

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
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getAllTranslators`
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
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/admin/updateTranslator`,
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
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/admin/addTranslator`,
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
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/admin/removeTranslator`,
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
        const classes = this.props.classes;
        return (
          <Box className={classes.boxWrapper}>
            {this.state.done && (
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
                        <Grid
                          container
                          className={classes.gridContainer}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            className={classes.toTheLeft}
                          >
                            <Select
                              label="Translators:"
                              name="translatorId"
                              value={props.values.translatorId}
                              options={utils.convertToSelectOptions.translators(
                                this.state.translators
                              )}
                              formikProps={props}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.toTheRight}
                          >
                            <ModifySubmitBackBtnGroup
                              handleCreateButton={
                                this.handleCreateButton
                              }
                              handleDeleteButton={
                                this.handleDeleteButton
                              }
                              handleModifyButton={
                                this.handleModifyButton
                              }
                              props={props}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}
                    {this.state.phase === 2 && (
                      <>
                        <Grid
                          container
                          className={classes.gridContainer}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            className={classes.toTheLeft}
                          >
                            <MyTextField
                              id="firstName"
                              label="First name"
                              props={props}
                              margin="dense"
                            />

                            <MyTextField
                              id="lastName"
                              label="Last name"
                              props={props}
                              margin="dense"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.toTheRight}
                          >
                            <SubmitBackBtnGroup
                              that={this}
                              props={props}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}

                    {this.state.phase === 3 && (
                      // CONFIRM DELETE PHASE
                      <AreYouSure
                        that={this}
                        id="translatorId"
                        props={props}
                        toTheRight={classes.toTheRight}
                      />
                    )}

                    {this.state.phase === 4 && (
                      <>
                        <Grid
                          container
                          className={classes.gridContainer}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            className={classes.toTheLeft}
                          >
                            <MyTextField
                              id="firstName"
                              label="First name"
                              props={props}
                              margin="dense"
                            />

                            <MyTextField
                              id="lastName"
                              label="Last name"
                              props={props}
                              margin="dense"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.toTheRight}
                          >
                            <SubmitBackBtnGroup
                              that={this}
                              props={props}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}
                    <ShowMessageAndError state={this.state} />
                  </form>
                )}
              />
            )}
          </Box>
        );
    }
}



export default withStyles(styles)(TranslatorsControl);