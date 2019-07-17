import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import {
	Grid,
	Box
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {
  MyTextField,
  AreYouSure,
  ModifySubmitBackBtnGroup,
  SubmitBackBtnGroup
} from '../myMuiComponents';
import Select from '../Select';
import utils from '../../utils/utils';
import ShowMessageAndError from '../ShowMessageAndError';

const GenreSchema = Yup.object().shape({
  genreName: Yup.string().required('Required field')
});

const styles = theme => ({
  toTheRight: {
		display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
	},
	toTheLeft: {
		display: 'flex',
		justifyContent: 'flex-start'
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

class GenresControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleModifyButton = this.handleModifyButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      phase: 1,
      done: false,
      genres: [],
      message: '',
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
      url: 'http://localhost:3000/getAllGenres'
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          genres: res.data,
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
      url: 'http://localhost:3000/admin/updateGenre',
      data: {
        genreId: values.genreId,
        genreNewName: values.genreName
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
      url: 'http://localhost:3000/admin/addGenre',
      data: {
        genreName: values.genreName
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

  handleDelete(value) {
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/admin/removeGenre',
      data: {
        genreId: value
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
      return arr.find(el => el.genre_id == id)[`${data}`];
    };

    props.setValues({
      genreName: findData(
        this.state.genres,
        props.values.genreId,
        'genre_name'
      ),
      genreId: props.values.genreId
    });
    this.setState(state => ({ ...state, phase: 2 }));
  }

  handleDeleteButton() {
    this.setState(state => ({ ...state, phase: 3 }));
  }

  handleCreateButton(props) {
    props.setValues({
      genreName: '',
      genreId: props.values.genreId
    });
    this.setState(state => ({ ...state, phase: 4 }));
  }

  render() {
		const classes = this.props.classes;
    return (
      <Box className={classes.boxWrapper}>
        {this.state.done && (
          <Formik
            enableReinitialize
            initialValues={{
              genreId: this.state.genres[0].genre_id,
              genreName: ''
            }}
            validationSchema={GenreSchema}
            onSubmit={(values, actions) => {
              this.handleSubmit(values);
              actions.setSubmitting(false);
            }}
            render={props => (
              <form onSubmit={props.handleSubmit} classes={classes.form}>
                {this.state.phase === 1 && (
                  <>
										<Grid 
											container 
											className={classes.gridContainer}
											>
											<Grid 
												item 
												xs={12} 
												sm={6}
												className={classes.toTheLeft}
												>
                        <Select
													margin="dense"
                          label="Genre:"
                          name="genreId"
                          value={props.values.genreId}
                          options={utils.convertToSelectOptions.genres(
                            this.state.genres
                          )}
                          formikProps={props}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.toTheRight}>
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
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <MyTextField
                          id="genreName"
                          label="Genre name"
													props={props}
													margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.toTheRight}>
                        <SubmitBackBtnGroup that={this} props={props} />
                      </Grid>
                    </Grid>
                  </>
                )}

                {this.state.phase === 3 && (
                  // CONFIRM DELETE PHASE
									<AreYouSure 
										that={this} 
										props={props} 
										id="genreId" 
										toTheRight={classes.toTheRight}
									/>
                )}

                {this.state.phase === 4 && (
                  <>
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <MyTextField
                          id="genreName"
                          label="Genre name"
													props={props}
													margin="dense"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.toTheRight} >
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

export default withStyles(styles)(GenresControl);
