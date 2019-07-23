import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { object, string } from 'yup';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/styles/withStyles";
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

const AuthorSchema = object().shape({
  firstName: string().required(required),
  lastName: string().required(required),
  origin: string()
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
		justifyContent: 'center',
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

class AuthorControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleModifyButton = this.handleModifyButton.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getAllAuthors`
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          authors: res.data,
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
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/updateAuthor`,
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
        }));
      });
  }

  handleCreate(values) {
    axios({
      method: 'PUT',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/addAuthor`,
      data: {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.lastName && { lastName: values.lastName }),
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
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/removeAuthor`,
      data: {
        authorId: value
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
      return arr.find(el => el.author_id == id)[`${data}`];
    };

    props.setValues({
      firstName:
        findData(this.state.authors, props.values.authorId, 'first_name') || '',
      lastName:
        findData(this.state.authors, props.values.authorId, 'last_name') || '',
      origin:
        findData(this.state.authors, props.values.authorId, 'origin') || '',
      authorId: props.values.authorId
    });
    this.setState(state => ({ ...state, phase: 2 }));
  }

  handleCreateButton(props) {
    props.setValues({
      firstName: '',
      lastName: '',
      origin: '',
      authorId: props.values.authorId
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
              <form onSubmit={props.handleSubmit} classes={classes.form} >
                {this.state.phase === 1 && (
                  <>
                    <Grid container className={classes.gridContainer}>
                      <Grid item xs={12} sm={8} className={classes.toTheLeft}>
                        <Select
                          label="Author:"
                          name="authorId"
                          value={props.values.authorId}
                          options={utils.convertToSelectOptions.authors(
                            this.state.authors
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
                          id="firstName"
                          label="First name"
													props={props}
													margin="dense"
                          cls={classes.form}
                        />
                        <MyTextField
                          id="lastName"
                          label="Last name"
													props={props}
													margin="dense"
                          cls={classes.form}
                        />
                        </Grid>
                        <Grid item xs={12}>
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
                  <>
                    <AreYouSure
                      that={this}
                      id="authorId"
                      props={props}
                      toTheRight={classes.toTheRight}
                    />
                  </>
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
                          id="firstName"
                          label="First name"
													props={props}
													margin="dense"
                          cls={classes.form}
                        />
                        <MyTextField
                          id="lastName"
                          label="Last name"
													props={props}
													margin="dense"
                          cls={classes.form}
                        />
                        </Grid>
                        <Grid item xs={12}>
												<MyTextField 
													id="origin" 
													label="Origin" 
													props={props} 
													margin="dense"
                          cls={classes.form}
												/>
                      </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4} className={classes.toTheRight}
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

export default withStyles(styles)(AuthorControl);
