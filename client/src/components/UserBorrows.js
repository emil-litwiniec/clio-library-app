import React from 'react';
import moment from "moment";
import { Link as RouterLink} from "react-router-dom";

import TwoPhaseButton from './TwoPhaseButton';

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import makeStyles from "@material-ui/styles/makeStyles";

import { LibraryBooksOutlined as Book } from '@material-ui/icons';


moment.locale('en-gb');

const formatDate = (date) => {
  return moment(date).format('L');
}

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
  boxText: {
    display: "flex",
    flexDirection: "column",
  },
  boxWrapper: {
    alignItems: 'baseline',
   
  },
  boxWrapperText: {
    display: 'flex',
  },
  mainBoxWrapper: {
    alignItems: 'center',
    width: '100%',
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
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'row',
      justifyContent: "space-between",
      marginTop: theme.spacing(2)
    }
  },
  prolongButton: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      marginTop: 0
    }
  },
  currentlyMessage: {
    margin: '3.2rem auto 3.2rem auto',
    textAlign: "center",
    color: "#7c7c7c"
  }
}));

const UserBorrows = ({ borrows, handleProlong, handleReturn }) => {
  const classes = useStyles();
  return (
    <Box mt={2}>
      <Typography variant="overline"> User borrows: </Typography>
      <Divider />

      { Object.keys(borrows).length > 0 ? 
      
      <List>
        {borrows.map((borrow, idx) => {
          return (
            <Box key={idx}>

              <ListItem
                classes={{
                  root: classes.listItemRoot
                }}
                key={idx}
              >
                <Grid container
                  display="flex"
                  className={classes.mainBoxWrapper}
                >

                  <Grid item sm={2}> 
                    <Typography
                      variant="body1"
                      className={classes.typoElement}
                    >
                      {idx + 1}.
                    </Typography>
                    <Book />
                  </Grid>

                  <Grid item container
                    display="flex"
                    className={classes.boxWrapper}
                    sm={10}
                  >
                    <Grid item container  className={classes.boxWrapperText} sm={10} xs={12}>
                      <Grid item className={classes.boxText} sm={6} xs={12}>
                        <Link 
                          component={RouterLink} 
                          to={`/result/${borrow.book_id}`}
                          variant="h6"
                          className={classes.typoElement}>
                            {borrow.title}
                        </Link>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>by</span>
                          {borrow.author}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>isbn: </span>
                          {borrow.isbn}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.boxText} sm={6} xs={12}>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>Taken date: </span>
                          {formatDate(borrow.taken_date)}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>
                            Expected brought date:
                          </span>
                          {formatDate(borrow.exp_brought_date)}
                        </Typography>

                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>Prolongs: </span>
                          {borrow.prolongs}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item className={classes.buttonWrapper} sm={2} xs={12}>
                      {handleReturn && (
                        <TwoPhaseButton
                          handleSubmit={handleReturn}
                          id={borrow.borrow_id}
                          btnName="Return"
                          confirmMessage="Are you sure?"
                        />
                      )}

                      {handleProlong && (
                        <TwoPhaseButton
                          handleSubmit={handleProlong}
                          id={borrow.borrow_id}
                          btnName="Prolong"
                          confirmMessage="Are you sure?"
                          className={classes.prolongButton}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </Box>
          );
        })}
      </List>
      :
      <Typography component="p" variant="overline" className={classes.currentlyMessage}>
        currently no borrows
        </Typography>
    }
    </Box>
  );
};

export default UserBorrows;
