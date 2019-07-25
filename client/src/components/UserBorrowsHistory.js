import React from 'react';
// import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import makeStyles from "@material-ui/styles/makeStyles";


import Book from "@material-ui/icons/LibraryBooksOutlined"
import ExpandMore from "@material-ui/icons/ExpandMore"



// moment.locale('en-gb');

// const formatDate = date => {
//   return moment(date).format('L');
// };

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
    display: 'flex',
    flexDirection: 'column'
  },
  boxWrapper: {
    alignItems: 'baseline'
  },
  boxWrapperText: {
    display: 'flex'
  },
  mainBoxWrapper: {
    alignItems: 'center',
    width: '100%'
  },
  typoElement: {
    marginRight: theme.spacing(2),
    fontSize: '.8rem'
  },
  typoElementTitle: {
    marginRight: theme.spacing(2),
    fontSize: '1rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: ".85rem"
    }
  },
  typoElementRight: {
    marginLeft: 'auto'
  },
  span: {
    fontSize: '.8rem',
    marginRight: theme.spacing(1),
    height: 'min-content'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing(2)
    }
  },
  number: {
    fontSize: '.8rem'
  },
  expansionPanelSummary: {
    alignItems: 'center'
  },
  expansionPanelSummaryRoot: {
    padding: '0 15px 0 15px'
  },
  expansionPanelRoot: {
    backgroundColor: '#fbfbfb'
  },
  currentlyMessage: {
    margin: '3.2rem auto 3.2rem auto',
    textAlign: "center",
    color: "#7c7c7c"
  },
  broughtDateSummary: {
    marginLeft: "auto",
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginRight: 65,
      marginLeft: 'auto',
      alignItems: "center"
    }
  },
  textSummaryBox: {
    display: 'flex',
    width: "100%",
    [theme.breakpoints.only('xs')]: {
      flexDirection: "column"
    }
  }
}));

const UserBorrows = ({ borrowsHistory }) => {
  const classes = useStyles();
  return (
    <Box mt={4}>
      <Typography variant="overline"> Borrows history: </Typography>
      <Divider />
      { Object.keys(borrowsHistory).length > 0 ? 
      
      <List>
        {borrowsHistory.map((borrow, idx) => {
          return (
            <ExpansionPanel
              classes={{
                root: classes.expansionPanelRoot
              }}
            >
              <ExpansionPanelSummary
                classes={{
                  content: classes.expansionPanelSummary,
                  root: classes.expansionPanelSummaryRoot
                }}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  variant="body1"
                  className={classes.typoElement}
                  classes={{
                    body1: classes.number
                  }}
                >
                  {idx + 1}.
                </Typography>
                <Box className={classes.textSummaryBox}>
                  <Box>
                    <Link
                      component={RouterLink}
                      to={`/result/${borrow.book_id}`}
                      variant="h6"
                      className={classes.typoElementTitle}
                    >
                      {borrow.title}
                    </Link>
                    <Typography variant="body1" className={classes.typoElement}>
                      <span className={classes.span}>by</span>
                      {borrow.author}
                    </Typography>
                  </Box>
                  <Box className={classes.broughtDateSummary}>
                    <Typography className={classes.span}>
                      Brought date:
                    </Typography>
                    <Typography variant="body1" className={classes.typoElement}>
                      {/* {formatDate(borrow.brought_date)} */}
                    </Typography>
                  </Box>

                </Box>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box key={idx} width={1}>
                  <ListItem
                    classes={{
                      root: classes.listItemRoot
                    }}
                    key={idx}
                  >
                    <Grid
                      container
                      display="flex"
                      className={classes.mainBoxWrapper}
                    >
                      <Grid item sm={2}>
                        <Book />
                      </Grid>

                      <Grid
                        item
                        container
                        display="flex"
                        className={classes.boxWrapper}
                        sm={10}
                      >
                        <Grid
                          item
                          container
                          className={classes.boxWrapperText}
                          sm={10}
                          xs={12}
                        >
                          <Grid item className={classes.boxText} sm={6} xs={12}>
                            <Link
                              component={RouterLink}
                              to={`/result/${borrow.book_id}`}
                              variant="h6"
                              className={classes.typoElement}
                            >
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
                              {/* {formatDate(borrow.taken_date)} */}
                            </Typography>
                            <Typography
                              variant="body1"
                              className={classes.typoElement}
                            >
                              <span className={classes.span}>
                                Brought date:
                              </span>
                              {/* {formatDate(borrow.brought_date)} */}
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
                      </Grid>
                    </Grid>
                  </ListItem>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </List> 
      :
      <Typography variant="overline" component="p" className={classes.currentlyMessage}>
        Currently no past borrows
      </Typography>
    }
    </Box>
  );
};

export default UserBorrows;
