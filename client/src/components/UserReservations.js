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

const UserReservations = ({ reservations, handleRemoveReservation }) => {
  const classes = useStyles();
  return (
    <Box mt={4}>
      <Typography variant="overline"> Reservations: </Typography>
      <Divider />

      {
        Object.keys(reservations).length > 0 ? 
        

      <List>
        {reservations.map((reservation, idx) => {
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
                          to={`/result/${reservation.book_id}`}
                          variant="h6"
                          className={classes.typoElement}>
                            {reservation.title}
                        </Link>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>by</span>
                          {reservation.author}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>isbn: </span>
                          {reservation.isbn}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.boxText} sm={6} xs={12}>
                        <Typography
                          variant="body1"
                          className={classes.typoElement}
                        >
                          <span className={classes.span}>Reservation date: </span>
                          {formatDate(reservation.res_date)}
                        </Typography>
                        
                      </Grid>
                    </Grid>

                    <Grid item className={classes.buttonWrapper} sm={2} xs={12}>
                      {handleRemoveReservation && (
                        <TwoPhaseButton
                          handleSubmit={handleRemoveReservation}
                          id={reservation.res_id}
                          btnName="Cancel"
                          confirmMessage="Are you sure?"
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
      </List> :
      <Typography component="p" variant="overline" className={classes.currentlyMessage}>
        Currently no reservations
      </Typography>
      }
    </Box>
  );
};

export default UserReservations;