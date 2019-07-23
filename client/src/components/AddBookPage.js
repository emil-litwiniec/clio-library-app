import React, { useState } from "react";
import axios from "axios";

import BookForm from "./BookForm";
import Typography from "@material-ui/core/Typography";




const AddBookPage = () => {

    const [message, setMessage] = useState();

    const handleSubmit = (values) => {
        axios({
            method: "PUT",
            url: `${process.env.API_URL ? process.env.API_URL : ''}/api/addBook`,
            data: {
                ...(values.title && {title: values.title}),
                ...(values.authorFirst && {authorFirst: values.authorFirst}),
                ...(values.authorLast && {authorLast: values.authorLast}),
                ...(values.lang && {lang: values.lang}),
                ...(values.isbn && {isbn: values.isbn}),
                ...(values.pubYear && {pubYear: values.pubYear}),
                ...(values.edition && {edition: values.edition}),
                ...(values.series && {series: values.series}),
                ...(values.ukd && {ukd: values.ukd}),
                ...(values.genreId && {genreId: values.genreId}),
                ...(values.pubId && {pubId: values.pubId})

            }
        })
        .then((res) => {
            if(res.status === 201) {
                setMessage('Book has been successfully created.')
            }
        })
        .catch(err => {
            setMessage('Something went wrong...')
        })
    }

    return (

        <>
        <Typography variant="overline">Add book:</Typography>
        <BookForm handleSubmit={handleSubmit}/>
        {message &&
        <div>
            {message}
        </div>}

        </>

    ) 
};

export default AddBookPage;