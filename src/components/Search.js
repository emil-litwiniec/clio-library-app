import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import clsx from 'clsx';

import Select from './Select';
import { setActualQuery } from '../actions/actualQuery';
import utils from '../utils/utils';

import { makeStyles } from '@material-ui/core/styles';

import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Container,
  TextField,
  Typography,
  InputAdornment,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    maxWidth: '70vw',
    justifyItems: 'center',
    marginTop: theme.spacing(5)
  },
  column: {
    flexBasis: '33.33%'
  },
  filterElement: {
    margin: theme.spacing(2),
    minWidth: 200
  },
  yearFilters: {
    flexBasis: 'none'
  },
  searchField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: '80vw'
  },
  input: {
    padding: '0px'
  },
  yearField: {
    fontSize: '.8rem',
    padding: '0px'
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  root: {
    width: '100%',
  },
  details: {
      flexWrap: 'wrap'
  }
}));

const Search = props => {
  const classes = useStyles();
  const [genres, setGenres] = useState({
    genres: [
      {
        genre_id: 'all',
        genre_name: 'all'
      }
    ],
    done: false
  });
  if (props.genreSelectOptions.length > 0 && !genres.done) {
    setGenres({
      genres: [...props.genreSelectOptions, ...genres.genres],
      done: true
    });
  }
  const selectOptions = {
    titles: [
      {
        value: 'authorAsc',
        label: 'authorAsc',
        name: 'authors ascending'
      },
      {
        value: 'authorDesc',
        label: 'authorDesc',
        name: 'authors descending'
      },
      {
        value: 'titleAsc',
        label: 'titleAsc',
        name: 'titles ascending'
      },
      {
        value: 'titleDesc',
        label: 'titleDesc',
        name: 'titles descending'
      }
    ],
    authors: [
      {
        value: 'authorDesc',
        label: 'authorDesc',
        name: 'authors descending'
      },
      {
        value: 'authorAsc',
        label: 'authorAsc',
        name: 'authors ascending'
      }
    ],
    searchIn: [
      {
        value: 'b',
        label: 'books',
        name: 'books'
      },
      {
        value: 'a',
        label: 'Authors',
        name: 'authors'
      }
    ],
    searchBy: [
      {
        value: 'title',
        label: 'Title',
        name: 'Title'
      },
      {
        value: 'author',
        label: 'Author',
        name: 'Author'
      }
    ]
  };
  return (
    <div>
      <Formik
        initialValues={{
          value: '',
          searchIn: 'b',
          searchBy: 'title',
          yearStart: 1920,
          yearEnd: 2019,
          titlesOrderBy: 'titleAsc',
          authorsOrderBy: 'authorDesc',
          genre: 'all'
        }}
        onSubmit={(values, actions) => {
          props.handleSubmit(values);
          props.setActualQuery(values);

          actions.setSubmitting(false);
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Grid container direction="column" className={classes.root}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Search"
                  className={classes.searchField}
                  value={props.values.value}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="value"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                  >
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        Filters
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Grid container>
                      <Grid item container xs={12} sm={8}>
                        <Grid item>
                          <Select
                            label="Search by:"
                            name="searchBy"
                            className={classes.filterElement}
                            value={props.values.searchBy}
                            options={selectOptions.searchBy}
                            formikProps={props}
                            disabled={
                              props.values.searchIn === 'a' ? true : false
                            }
                          />
                          <Select
                            label="Search in:"
                            name="searchIn"
                            value={props.values.searchIn}
                            options={selectOptions.searchIn}
                            formikProps={props}
                            className={classes.filterElement}
                          />
                        </Grid>
                        <Grid item>
                          <Select
                            label="Genre:"
                            name="genre"
                            className={classes.filterElement}
                            value={props.values.genre}
                            options={utils.convertToSelectOptions.genres(
                              genres.genres
                            )}
                            formikProps={props}
                            disabled={
                              props.values.searchIn === 'a' ? true : false
                            }
                          />

                          {props.values.searchIn !== 'a' && (
                            <Select
                              label="Order by:"
                              className={classes.filterElement}
                              name="titlesOrderBy"
                              value={props.values.titlesOrderBy}
                              options={selectOptions.titles}
                              formikProps={props}
                            />
                          )}

                          {props.values.searchIn === 'a' && (
                            <Select
                              label="Order by:"
                              className={classes.filterElement}
                              name="authorsOrderBy"
                              value={props.values.authorsOrderBy}
                              options={selectOptions.authors}
                              formikProps={props}
                            />
                          )}
                        </Grid>
                      </Grid>
                    <Grid item container direction="column" xs={12} sm={4}>
                      <TextField
                        id="outlined-name"
                        label="From year"
                        className={clsx(classes.filterElement, classes.yearFilters)}
                        value={props.values.yearStart}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="yearStart"
                        margin="dense"
                        variant="outlined"
                        disabled={props.values.searchIn === 'a' ? true : false}
                      />
                      <TextField
                        id="outlined-name"
                        label="To year"
                        className={classes.filterElement}
                        value={props.values.yearEnd}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="yearEnd"
                        margin="dense"
                        variant="outlined"
                        disabled={props.values.searchIn === 'a' ? true : false}
                      />
                    </Grid>

                    </Grid>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                    <Button size="small" type="submit">
                      Search
                    </Button>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </Grid>
            </Grid>

          </form>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setActualQuery: query => dispatch(setActualQuery(query))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Search);
