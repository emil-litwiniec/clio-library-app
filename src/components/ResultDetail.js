import React from "react";
import { history } from "../routers/AppRouter"

import { List, ListItem, ListItemText } from '@material-ui/core';

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    list: {
        width: '18rem',
        [theme.breakpoints.only('xs')]: {
            marginTop: '2rem',
        }
    },
    title: {
        textAlign: "left",
    },
    value: {
        textAlign: 'right',
    },
}))


const ResultDetail = (props) => {
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
        isborrowed: isBorrowed,
        isreserved: isReserved
    } = props;

    const classes = useStyles();
    console.log('is borrowed:', isBorrowed);
    console.log('is reserver:', isReserved);
    const isAvailable = () => {
        
        if(isBorrowed == 'true' || isReserved == 'true') {
            return 'Not available'
        }
        return 'Available'
    }
    return (
        <>

        <List aria-label="Result details" className={classes.list}>
                <ListItem 
                    dense
                    divider
                    >
                    <ListItemText primary="Title:" className={classes.title}/>
                    <ListItemText primary={title} className={classes.value}/>
                </ListItem>
                <ListItem 
                    divider
                    dense
                    >
                    <ListItemText primary='Series:' className={classes.title}/>
                    <ListItemText primary={series} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary='Edition:'  className={classes.title}/>
                    <ListItemText primary={edition} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary='Author:'  onClick={() => history.push(`/author/${authorId}`)} className={classes.title}/>
                    <ListItemText primary={author} onClick={() => history.push(`/author/${authorId}`)} className={classes.value}/>
                </ListItem>
                <ListItem
                    dense
                    divider >
                    <ListItemText primary="Publisher:" className={classes.title}/>
                    <ListItemText primary={publisher} className={classes.value}/>
                </ListItem>
                <ListItem
                    dense
                    divider >
                    <ListItemText primary="Translator:" className={classes.title}/>
                    <ListItemText primary={translator} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary="Genre:" className={classes.title}/>
                    <ListItemText primary={genre} className={classes.value} />
                </ListItem>
                <ListItem
                    dense
                    divider >
                    <ListItemText primary="Year:" className={classes.title}/>
                    <ListItemText primary={year} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary="Ukd:" className={classes.title}/>
                    <ListItemText primary={ukd} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary="Isbn:" className={classes.title}/>
                    <ListItemText primary={isbn} className={classes.value}/>
                </ListItem>
                <ListItem 
                    dense
                    divider>
                    <ListItemText primary={isAvailable()}/>
                </ListItem>
            </List>

        </>
    );

};


export default ResultDetail;