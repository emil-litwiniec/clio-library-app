import React from 'react';

import { history } from '../routers/AppRouter';
import clsx from "clsx";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'

import makeStyles from '@material-ui/styles/makeStyles';


import Book from "@material-ui/icons/LibraryBooksOutlined";
import Person from "@material-ui/icons/PersonOutlineOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemRoot: {
    paddingTop: 15,
    paddingBottom: 15
  },
  boxWrapper: {
    marginLeft: theme.spacing(2),
    alignItems: 'baseline',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0
    }
  },
  mainBoxWrapper: {
    alignItems: 'center'
  },
  typoElement: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      fontSize: ".8rem"

    }
  },
  typoElementRight: {
    marginLeft: 'auto',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'right'
    }
  },
  span: {
    fontSize: '.8rem',
    marginRight: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      fontSize: '0.7rem',
      marginRight: 3
    }
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      fontSize: "1.05rem"

    }
  },
  typoIdx: {
    [theme.breakpoints.only('xs')]: {
      marginRight: 15
    }
  },
  authorWrapper: {
    marginLeft: 10
  },
  authorIdx: {
    marginRight: 7
  },
  authorOrigin: {
    marginLeft: 'auto',
    marginRight: 0
  }

}));

const Results = ({ results } = props) => {
  const renderResults = () => {
    const classes = useStyles();

    if (results && results.message) {
      return <Typography variant="body2">{results.message}</Typography>;
    } else if (results && !results.error) {
      return results.map((result, idx) => {
        const isAvailable = (isBorrowed, isReserved) => {
          if (isBorrowed == 'true' || isReserved == 'true') {
            return 'Not available';
          } else if (isBorrowed == 'false' && isReserved == 'false') {
            return 'Available';
          }
        };

        const bookResult = (
          <>
            <ListItem
              button
              onClick={() => history.push(`/result/${result.book_id}`)}
              classes={{
                root: classes.listItemRoot
              }}
              key={idx}
            >
              <Box
                display="flex"
                flexGrow={1}
                className={classes.mainBoxWrapper}
              >
                <Hidden only="xs">
                  <Book />
                </Hidden>
                <Box display="flex" className={classes.boxWrapper} flexGrow={1}>
                  <Typography
                    variant="subtitle2"
                    className={clsx(classes.typoIdx, classes.typoElement)}
                  >
                    {idx + 1}.
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={6} >
                      <Typography variant="h6" className={clsx(classes.typoElement, classes.title)}>
                        {result.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className={classes.typoElement}
                      >
                        <span className={classes.span}>by</span> {result.author}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.gridItem}>
                      <Typography
                        variant="subtitle1"
                        className={classes.typoElement}
                      >
                        <span className={classes.span}>year: </span>{' '}
                        {result.year}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.gridItem}>
                      <Typography
                        variant="subtitle1"
                        className={classes.typoElement}
                        classes={{
                          root: classes.typoElementRight
                        }}
                      >
                        {isAvailable(result.is_borrowed, result.is_reserved)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </>
        );

        const authorResult = (
          <>
            <ListItem
              button
              onClick={() => history.push(`/author/${result.author_id}`)}
              classes={{
                root: classes.listItemRoot
              }}
              key={idx}
            >
              <Box
                display="flex"
                flexGrow={1}
                className={classes.mainBoxWrapper}
              >
                <Person />
                <Box display="flex" className={clsx(classes.boxWrapper, classes.authorWrapper)} flexGrow={1}>
                  <Typography
                    variant="subtitle2"
                    className={clsx(classes.authorIdx, classes.typoElement)}
                  >
                    {idx + 1}.
                  </Typography>
                  <Typography variant="h6" className={classes.typoElement}>
                    {result.author}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={clsx(classes.typoElement, classes.authorOrigin)}
                  >
                    <span className={classes.span}>origin:</span>{' '}
                    {result.origin}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </>
        );

        const isSearchInBooks = results[0].book_id ? true : false;
        const isSearchInAuthors =
          Object.keys(results[0]).includes('origin') &&
          Object.keys(results[0]).includes('author')
            ? true
            : false;

        return (
          <List
            component="nav"
            aria-label="Search results"
            classes={{
              root: classes.listRoot
            }}
          >
            {isSearchInBooks && bookResult}
            {isSearchInAuthors && authorResult}
          </List>
        );
      });
    }
  };
  return <>{renderResults()}</>;
};

export default Results;
