import React from "react";
import { Link } from "react-router-dom";
import { history } from "../routers/AppRouter"

import {Divider, List, ListItem, ListItemText } from '@material-ui/core';


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
    const isAvailable = () => {
        if(isBorrowed == 'true' || isReserved == 'true') {
            return 'Unavailable to borrow'
        }
        return 'Available to borrow'
    }
    return (
        <>

        <List component="nav" aria-label="Main mailbox folders">
                <ListItem >
                    <ListItemText primary="Title:" />
                    <ListItemText primary={title} />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary='Series:'/>
                    <ListItemText primary={series}/>
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary='Edition:' />
                    <ListItemText primary={edition} />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary='Author:'  onClick={() => history.push(`/author/${authorId}`)}/>
                    <ListItemText primary={author} onClick={() => history.push(`/author/${authorId}`)}/>
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Publisher:" />
                    <ListItemText primary={publisher} />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Translator:"/>
                    <ListItemText primary={translator}/>
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Genre:"/>
                    <ListItemText primary={genre} />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Year:"/>
                    <ListItemText primary={year}/>
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Ukd:"/>
                    <ListItemText primary={ukd} />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Isbn:"/>
                    <ListItemText primary={isbn}/>
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary={isAvailable()}/>
                </ListItem>
            </List>

        </>
    );

};


export default ResultDetail;