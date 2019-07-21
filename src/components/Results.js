import React from 'react';

import { history } from '../routers/AppRouter';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, Typography, Box } from '@material-ui/core';
import {
  LibraryBooksOutlined as Book,
  PersonOutlineOutlined as Person
} from '@material-ui/icons';

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
    alignItems: 'baseline'
  },
  mainBoxWrapper: {
    alignItems: 'center'
  },
  typoElement: {
    marginRight: theme.spacing(2)
  },
  typoElementRight: {
    marginLeft: 'auto'
  },
  span: {
    fontSize: '.8rem',
    marginRight: theme.spacing(1)
  }
}));

const Results = ({ results } = props) => {
  const renderResults = () => {
    const classes = useStyles();

    if (results && results.message) {
      return <p>{results.message}</p>;
    } else if (results && !results.error) {
      return results.map((result, idx) => {
        const isAvailable = (isBorrowed, isReserved) => {
          if(isBorrowed == 'true' || isReserved == 'true') {
            return 'Not available';
          } else if(isBorrowed == 'false' && isReserved == 'false'){
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
                <Book />
                <Box display="flex" className={classes.boxWrapper} flexGrow={1}>
                  <Typography
                    variant="subtitle2"
                    className={classes.typoElement}
                  >
                    {idx + 1}.
                  </Typography>
                  <Typography variant="h6" className={classes.typoElement}>
                    {result.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.typoElement}
                  >
                    <span className={classes.span}>by</span> {result.author}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.typoElement}
                  >
                    <span className={classes.span}>year: </span> {result.year}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.typoElement}
                    classes={{
                      root: classes.typoElementRight
                    }}
                  >
                    {isAvailable(result.is_borrowed, result.is_reserved)}
                  </Typography>
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
                <Box display="flex" className={classes.boxWrapper} flexGrow={1}>
                  <Typography
                    variant="subtitle2"
                    className={classes.typoElement}
                  >
                    {idx + 1}.
                  </Typography>
                  <Typography variant="h6" className={classes.typoElement}>
                    {result.author}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.typoElement}
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