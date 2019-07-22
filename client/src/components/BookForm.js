import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Select from './Select';
import utils from '../utils/utils';
import * as Yup from 'yup';


import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import withStyles from "@material-ui/styles/withStyles";

import { MyTextField, AreYouSure } from './myMuiComponents';

const required = 'Required field';

const Schema = Yup.object().shape({
  title: Yup.string().required(required),
  authorFirst: Yup.string().required(required),
  authorLast: Yup.string().required(required),
  pubYear: Yup.string()
    .matches(/^[12][0-9]{3}$/, 'Enter year in 4-digit format.')
    .required(required),
  lang: Yup.string()
    .matches(/^[A-Z|a-z]{2}$/, 'Enter two-letter language code.')
    .required(required),
  isbn: Yup.string().required(required),
  genreId: Yup.number().required(required),
  series: Yup.string().notRequired(),
  edition: Yup.string().notRequired(),
  ukd: Yup.string().notRequired(),
  pubId: Yup.number().notRequired()
});

const styles = theme => ({
  gridContainer: {
    display: 'flex'
	},
	formControl: {
		minWidth: "100%"
	},

	box: {
		
		[theme.breakpoints.only('xs')]: {
			margin: '10px 0px'

		}
	},
	boxSubmit: {
		display: 'flex',
		width: '100%',
		justifyContent: "center",
		marginBottom: 25
	},
	button: {
		width: '88%',
	}
});

class AddBookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      publishers: [
        {
          value: '',
          name: 'none',
          label: 'none'
        }
      ],
      genres: [],
      results: {},
      phase: 1
    };
  }

  componentDidMount() {
    const { values } = this.props;
    if (!values) {
      Promise.all([
        axios({
          method: 'GET',
          url: '/api/getAllPubs'
        }),
        axios({
          method: 'GET',
          url: '/api/getAllGenres'
        })
      ]).then(([pubRes, genreRes]) => {
        this.setState(state => ({
          ...state,
          results: {
            title: '',
            first_name: '',
            last_name: '',
            year: '',
            pub_id: '',
            series: '',
            edition: '',
            genreId: '',
            lang: '',
            translatorId: '',
            isbn: '',
            keywords: '',
            ukd: ''
          },
          genres: genreRes.data,
          publishers: [...state.publishers, ...pubRes.data],
          done: true
        }));
      });
    } else {
      Promise.all([
        axios({
          method: 'GET',
          url: '/api/getAllPubs'
        }),
        axios({
          method: 'GET',
          url: '/api/getAllGenres'
        })
      ]).then(([pubRes, genreRes]) => {
        this.setState(state => ({
          ...state,
          results: values,
          genres: genreRes.data,
          publishers: [...state.publishers, ...pubRes.data],
          done: true
        }));
      });
    }
  }

  render() {
    const { classes, handleDelete } = this.props;
    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            title: this.state.results.title || '',
            authorFirst: this.state.results.first_name || '',
            authorLast: this.state.results.last_name || '',
            pubYear: this.state.results.year || '',
            pubId: this.state.results.pub_id || '',
            series: this.state.results.series || '',
            edition: this.state.results.edition || '',
            genreId: this.state.results.genre_id || '',
            lang: this.state.results.lang || '',
            // translatorId: this.state.results &&
            //     this.state.results.translatorId
            //     ,
            isbn: this.state.results.isbn || '',
            // keywords: this.state.results &&
            //     this.state.results.keywords
            //     ,
            ukd: this.state.results.ukd || ''
          }}
          validationSchema={Schema}
          onSubmit={(values, actions) => {
            this.props.handleSubmit(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Grid container className={classes.gridContainer}>
                <Grid item xs={12}>
                  <MyTextField
                    id="title"
                    label="Title"
                    props={props}
                    className={classes.textField}
                    fullWidth
                  />
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={12} sm={6} className={classes.marginRight}>
                    <Box mr={1} className={classes.box}>
                      <MyTextField
                        id="authorFirst"
                        label="Author first name"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} className={classes.marginLeft}>
                    <Box ml={1} className={classes.box}>
                      <MyTextField
                        id="authorLast"
                        label="Author last name"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12} sm={6} className={classes.marginRight}>
                    <Box mr={1} className={classes.box}>
                      <MyTextField
                        id="pubYear"
                        label="Publication year"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} className={classes.marginLeft}>
                    <Box ml={1} className={classes.box}>
                      <MyTextField
                        id="series"
                        label="Series"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={12} sm={6} className={classes.marginRight}>
                    <Box mr={1} className={classes.box}>
                      <MyTextField
                        id="edition"
                        label="Edition"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} className={classes.marginLeft}>
                    <Box ml={1} className={classes.box}>
                      <MyTextField
                        id="isbn"
                        label="Isbn"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>

                {/* <label>Keywords:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.keywords}
                                name="isbn"
                                disabled={true}
                            />

                            <label>Translator:</label>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.translatorId}
                                name="isbn"
                                disabled={true}
                            /> */}

                {/* UKD change type in SQL Database */}

                <Grid item container xs={12}>
                  <Grid item xs={12} sm={6} className={classes.marginRight}>
                    <Box mr={1} className={classes.box}>
                      <MyTextField
                        id="ukd"
                        label="UKD"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} className={classes.marginLeft}>
                    <Box ml={1} className={classes.box}>
                      <MyTextField
                        id="lang"
                        label="Language"
                        props={props}
                        className={classes.textField}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid item container xs={12} l={4}>
                  <Grid item xs={12} sm={6} className={classes.marginRight}>
                    <Box mr={1} className={classes.box}>
                      <Select
                        label="Genre:"
                        name="genreId"
                        errorMessage={
                          props.errors.genreId && props.touched.genreId
                            ? props.errors.genreId
                            : ''
                        }
                        error={
                          props.errors.genreId && props.touched.genreId
                            ? true
                            : false
                        }
                        value={props.values.genreId}
                        options={utils.convertToSelectOptions.genres(
                          this.state.genres
                        )}
                        formikProps={props}
                        fullWidth={true}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.marginLeft}>
                    <Box ml={1} className={classes.box}>
                      <Select
                        label="Publisher:"
                        name="pubId"
                        value={props.values.pubId}
                        options={
                          this.state.publishers &&
                          utils.convertToSelectOptions.publishers(
                            this.state.publishers
                          )
                        }
                        formikProps={props}
                        fullWidth={true}
                      />
                    </Box>
                  </Grid>
                </Grid>
								<Grid item xs={false} sm={6} />
                <Grid item container xs={12} sm={6}>
                  <Grid item xs={6} sm={6}>
                    <Box className={classes.boxSubmit}>
                      <Button variant="outlined" type="submit" className={classes.button}>
                        Submit
                      </Button>
                    </Box>
                  </Grid>

                  {handleDelete && (
                    <Grid item xs={6} sm={6}>
                      <Box  className={classes.boxSubmit}>
                        {this.state.phase === 1 &&
                          <Button
                          variant="outlined"
                          type="button"
                          onClick={() => this.setState(state => ({
                            ...state,
                            phase: 2
                          }))}
                          className={classes.button}
                        >
                          Delete
                        </Button>} 
                        {this.state.phase === 2 &&
                        <AreYouSure 
                        that={this}
                        handleDelete={handleDelete}/>} 
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AddBookForm);
