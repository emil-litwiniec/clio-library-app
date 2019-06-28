import React from "react";
import axios from "axios";

import AddBookForm from "./AddBookForm";


const AdminPanelPage = () => {

    const handleSubmit = (data) => {
        console.log(data.pubYear);
        axios({
            method: "PUT",
            url: "http://localhost:3000/admin/addBook",
            data: {
                title: data.title,
                authorFirst: data.authorFirst,
                authorLast: data.authorLast,
                lang: data.lang,
                isbn: data.isbn,
                pubYear: data.pubYear,
                edition: data.edition,
                series: data.series,
                ukd: data.ukd
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
        <h1>This is admin page!</h1>

        <AddBookForm handleSubmit={handleSubmit}/>

        </>

    ) 
};

export default AdminPanelPage;