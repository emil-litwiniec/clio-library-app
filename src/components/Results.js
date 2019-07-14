import React from "react";
import { Link } from "react-router-dom";

import {history} from "../routers/AppRouter";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  }));

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const Results = ({ results, ...rest} = props) => {

    

    const renderResults = () => {
        // console.log(history)
        const classes = useStyles();

        if(results && results.message) {
            return <p>{results.message}</p>
        } else if (results && !results.error) {
            return results.map((result, idx) => {
                const bookResult = (
                   <>

        <ListItem button onClick={() => history.push(`/result/${result.book_id}`) }>
                <p >
                    {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                    borrowed: {result.isborrowed}
                </p>
            <Link to={`/result/${result.book_id}`}>See details</Link>
        </ListItem>
        
                    </>
                );

                const authorResult = (
                    <>
                        <p>
                        {idx + 1}, author: {result.author}{/* , origin: {result.origin ? result.origin : ''} */}

                        </p>
                        <Link to={`/author/${result.author_id}`}>See details</Link>
                    </>
                )

                const isSearchInBooks = results[0].book_id ? true : false;
                const isSearchInAuthors = Object.keys(results[0]).includes('origin') &&  Object.keys(results[0]).includes('author')? true : false;

                return (
                    <List component="nav" aria-label="Main mailbox folders">

                    {/* <div key={idx} > */}
                    {isSearchInBooks && bookResult}
                    {isSearchInAuthors && authorResult}

                {/* </div> */}
                    </List>
            )})
        }
    }
    return (
        <>
            {renderResults()}
            </>
    )
}

export default Results;