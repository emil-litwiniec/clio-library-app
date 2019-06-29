import React from "react";
import { Link } from "react-router-dom";


const Results = ({ results} = props) => {

    

    const renderResults = () => {
        if(results && results.message) {
            return <p>{results.message}</p>
        } else if (results && !results.error) {
            return results.map((result, idx) => {
                const bookResult = (
                   <>
                        <p >
                            {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                            borrowed: {result.isborrowed}
                        </p>
                        <Link to={`/result/${result.book_id}`}>See details</Link>
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
                    <div key={idx} >
                    {isSearchInBooks && bookResult}
                    {isSearchInAuthors && authorResult}

                </div>
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