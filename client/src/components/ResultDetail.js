import React from 'react';
import { history } from '../routers/AppRouter';


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
  list: {
    width: '18rem',
    [theme.breakpoints.only('xs')]: {
      marginTop: '2rem'
    }
  },
  title: {
    textAlign: 'left'
  },
  value: {
    textAlign: 'right'
  }
}));

const ResultDetail = props => {
  const {
    title,
    series,
    edition,
    isbn,
    author_id: authorId,
    keywords,
    ukd,
    year,
    author,
    publisher,
    genre,
    translator,
    is_borrowed: isBorrowed,
    is_reserved: isReserved,
    handleReservation,
    isUser
  } = props;

  const classes = useStyles();
  const isAvailable = () => {
    if (isBorrowed == 'true' || isReserved == 'true') {
      return 'Not available';
    }
    return 'Available';
  };
  const canReserve = () => {
    console.log('is user: ', isUser)
    if(isUser) {
      if(isBorrowed == 'true' || isReserved == 'true') {
        return false
      } 
        return true
    } else {
      return false
    }
  }


  return (
    <>
      <List aria-label="Result details" className={classes.list}>
        <ListItem dense divider>
          <ListItemText primary="Title:" className={classes.title} />
          <ListItemText primary={title} className={classes.value} />
        </ListItem>
        <ListItem divider dense>
          <ListItemText primary="Series:" className={classes.title} />
          <ListItemText primary={series} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Edition:" className={classes.title} />
          <ListItemText primary={edition} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText
            primary="Author:"
            onClick={() => history.push(`/author/${authorId}`)}
            className={classes.title}
          />
          <ListItemText
            primary={author}
            onClick={() => history.push(`/author/${authorId}`)}
            className={classes.value}
          />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Publisher:" className={classes.title} />
          <ListItemText primary={publisher} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Translator:" className={classes.title} />
          <ListItemText primary={translator} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Genre:" className={classes.title} />
          <ListItemText primary={genre} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Year:" className={classes.title} />
          <ListItemText primary={year} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Ukd:" className={classes.title} />
          <ListItemText primary={ukd} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary="Isbn:" className={classes.title} />
          <ListItemText primary={isbn} className={classes.value} />
        </ListItem>
        <ListItem dense divider>
          <ListItemText primary={isAvailable()} />
        </ListItem>
      </List>
      {console.log(canReserve())}
      {canReserve() &&
        <Button 
          onClick={handleReservation}
          variant="outlined"
          margin="dense">
          Reserve
        </Button>
      }
    </>
  );
};

export default ResultDetail;
