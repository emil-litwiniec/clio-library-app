import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/styles/withStyles';

import {
  MyTextField,
  AreYouSure,
  ModifySubmitBackBtnGroup,
  SubmitBackBtnGroup
} from '../myMuiComponents';
import Select from '../Select';
import ShowMessageAndError from '../ShowMessageAndError';
import utils from '../../utils/utils';

const required = 'Required field';

const PublisherSchema = Yup.object().shape({
  name: Yup.string().required(required),
  estYear: Yup.string()
    .matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.')
    .notRequired(),
  address: Yup.string().notRequired(),
  origin: Yup.string()
    .matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter country code.')
    .required(required)
});

const styles = theme => ({
  toTheRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center'
    }
  },
  toTheLeft: {
    display: 'flex',
    justifyContent: 'center'
  },
  boxWrapper: {
    marginTop: 40,
    marginBottom: 40
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  form: {
    width: '100%'
  }
});

class PublishersControl extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleModifyButton = this.handleModifyButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.message &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            message: ''
          })),
        4000
      );

    prevState.error &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            error: ''
          })),
        4000
      );
  }

  updateState() {
    axios({
      method: 'GET',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getAllPubs`
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          publishers: res.data,
          done: true
        }));
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: err
        }));
      });
  }

  handleUpdate(values) {
    axios({
      method: 'PATCH',
      url: `${
        process.env.API_URL ? process.env.API_URL : ''
      }/api/updatePublisher`,
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
        }));
      });
  }

  handleCreate(values) {
    axios({
      method: 'PUT',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/addPublisher`,
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
          ...state,
          phase: 1,
          ...(res.data.message && { message: res.data.message })
        }));
        this.updateState();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: err
        }));
      });
  }

  handleDelete(value) {
    axios({
      method: 'DELETE',
      url: `${
        process.env.API_URL ? process.env.API_URL : ''
      }/api/removePublisher`,
      data: {
        pubId: value
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          phase: 1,
          ...(res.data.message && { message: res.data.message })
        }));
        this.updateState();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: err
        }));
      });
  }

  handleSubmit(values) {
    if (this.state.phase === 4) {
      // CREATE
      this.handleCreate(values);
    } else if (this.state.phase === 2) {
      // UPDATE
      this.handleUpdate(values);
    }
  }
  handleModifyButton(props) {
    const findData = (arr, id, data) => {
      return arr.find(el => el.pub_id == id)[`${data}`];
    };

    props.setValues({
      name: findData(this.state.publishers, props.values.pubId, 'name') || '',
      estYear:
        findData(this.state.publishers, props.values.pubId, 'est_year') || '',
      address:
        findData(this.state.publishers, props.values.pubId, 'address') || '',
      origin:
        findData(this.state.publishers, props.values.pubId, 'origin') || '',
      pubId: props.values.pubId
    });
    this.setState(state => ({ ...state, phase: 2 }));
  }

  handleCreateButton(props) {
    props.setValues({
      name: '',
      estYear: '',
      address: '',
      origin: '',
      pubId: props.values.pubId
    });

    this.setState(state => ({ ...state, phase: 4 }));
  }

  handleDeleteButton() {
    this.setState(state => ({ ...state, phase: 3 }));
  }

  render() {
    const classes = this.props.classes;
    return (
      <Box className={classes.boxWrapper}>
        {this.state.done && (
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
              <form onSubmit={props.handleSubmit} classes={classes.form}>
                {this.state.phase === 1 && (
                  <>
                    <Grid container className={classes.gridContainer}>
                      <Grid item xs={12} sm={8} className={classes.toTheLeft}>
                        <Select
                          label="Publishers:"
                          name="pubId"
                          value={props.values.pubId}
                          options={utils.convertToSelectOptions.publishers(
                            this.state.publishers
                          )}
                          formikProps={props}
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} className={classes.toTheRight}>
                        <ModifySubmitBackBtnGroup
                          handleCreateButton={this.handleCreateButton}
                          handleDeleteButton={this.handleDeleteButton}
                          handleModifyButton={this.handleModifyButton}
                          props={props}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
                {this.state.phase === 2 && (
                  <>
                    <Grid container className={classes.gridContainer}>
                      <Grid
                        item
                        container
                        xs={12}
                        sm={8}
                        className={classes.toTheLeft}
                      >
                        <Grid item xs={12}>
                          <MyTextField
                            id="name"
                            label="Name"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                          <MyTextField
                            id="estYear"
                            label="Est year"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MyTextField
                            id="address"
                            label="Address"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                          <MyTextField
                            id="origin"
                            label="Origin"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4} className={classes.toTheRight}>
                        <SubmitBackBtnGroup that={this} props={props} />
                      </Grid>
                    </Grid>
                  </>
                )}

                {this.state.phase === 3 && (
                  // CONFIRM DELETE PHASE
                  <AreYouSure
                    that={this}
                    id="pubId"
                    props={props}
                    toTheRight={classes.toTheRight}
                  />
                )}

                {this.state.phase === 4 && (
                  <>
                    <Grid container className={classes.gridContainer}>
                      <Grid
                        item
                        container
                        xs={12}
                        sm={8}
                        className={classes.toTheLeft}
                      >
                        <Grid item xs={12}>
                          <MyTextField
                            id="name"
                            label="Name"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                          <MyTextField
                            id="estYear"
                            label="Est year"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MyTextField
                            id="address"
                            label="Address"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                          <MyTextField
                            id="origin"
                            label="Origin"
                            props={props}
                            margin="dense"
                            cls={classes.form}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        className={classes.toTheRight}
                        alignSelf="flex-start"
                      >
                        <SubmitBackBtnGroup that={this} props={props} />
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

export default withStyles(styles)(PublishersControl);
