import React from "react";


const ResultDetail = (props) => {
    const {
        title,
        series,
        edition,
        isbn,
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
            <p>author: {author}</p>
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