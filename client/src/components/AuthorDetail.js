import React from 'react';


import clsx from "clsx";

import Results from "./Results";
import { Typography, Divider } from '@material-ui/core';
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    currentlyMessage: {
      margin: '3.2rem auto 3.2rem auto',
      textAlign: "center",
      color: "#7c7c7c"
    },
    marginTop: {
        marginTop: '1.5rem'
    },
    marginBottom: {
        marginBottom: '1.5rem'
    }
  }));

const AuthorDetail = ({author, books} = props) => {
    const classes = useStyles();
    const areBooks = () => {
        if(books) {
            if(books.length === 0 ) {
                return false
            } else {
                return true
            }
        } 
    }
    return (
        <div>
            <Typography variant="overline">Author's info:</Typography>
            <Divider />
            {author &&
                 <>  
                 <Typography variant="h3" className={classes.marginTop}>
                    {author[0].first_name} {author[0].last_name}
                 </Typography>
                 <Typography variant="subtitle2" className={clsx(classes.marginTop, classes.marginBottom)}>
                        Origin: {author[0].origin}
                </Typography>
            </>}
           

           <Typography variant="overline">Author's books in catalogue:</Typography>
           <Divider />
            {
                areBooks() ? 

                <Results results={Array.isArray(books) && books}/> 
                    
                :

                <Typography component="p" variant="overline" className={classes.currentlyMessage}>
                    No books by this author in our catalogue
                </Typography>
            }
        </div>
    )
}


export default AuthorDetail;