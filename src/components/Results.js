import React from "react";
import { Link } from "react-router-dom";


const Results = ({ results } = props) => {

    const renderResults = () => {
        if(results && results.message) {
            return <p>{results.message}</p>
        } else if (results && !results.error) {
            return results.map((result, idx) => (
                <div key={idx}>
                    <p >
                        {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                        borrowed: {result.isborrowed}
                    </p>
                    <Link to={`/result/${result.book_id}`}>See details</Link>
                </div>
            ))
        }
    }
    return (
        <>
            {renderResults()}
            </>
    )
}


export default Results;