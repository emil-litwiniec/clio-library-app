import React from "react";


const Results = ({ results } = props) => {

    const renderResults = () => {
        if(results && results.message) {
            return <p>{results.message}</p>
        } else if (results && !results.error) {
            return results.map((result, idx) => (
                <p key={idx}>
                    {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                </p>
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