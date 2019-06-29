import React from "react";
import { Link } from "react-router-dom";


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
            return 'no'
        }
        return 'yes'
    }
    return (
        <>
            <p>title: {title}</p>
            <p>series: {series}</p>
            <p>edition: {edition}</p>
            <p>author: <Link to={`/author/${authorId}`}>{author}</Link></p>
            <p>publisher: {publisher}</p>
            <p>translator: {translator}</p>
            <p>genre: {genre}</p>
            <p>year: {year}</p>
            <p>ukd: {ukd}</p>
            <p>isbn: {isbn}</p>

            <p>available: {isAvailable()}</p>

        </>
    );

};


export default ResultDetail;