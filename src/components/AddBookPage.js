import React from "react";
import axios from "axios";

import BookForm from "./BookForm";




const AddBookPage = () => {

    const handleSubmit = (values) => {
        console.log(values.pubYear);
        axios({
            method: "PUT",
            url: "http://localhost:3000/admin/addBook",
            data: {
                title: values.title,
                authorFirst: values.authorFirst,
                authorLast: values.authorLast,
                lang: values.lang,
                isbn: values.isbn,
                pubYear: values.pubYear,
                edition: values.edition,
                series: values.series,
                ukd: values.ukd
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (

        <>
        <h1>This is add book page!</h1>

        <BookForm handleSubmit={handleSubmit}/>

        </>

    ) 
};

export default AddBookPage;