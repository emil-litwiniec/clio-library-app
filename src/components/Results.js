import React from "react";


const Results = ({ results } = props) => {
    return (
        <>
        {results &&
            results.map((result, idx) => (
                <p key={idx}>
                    {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                </p>
            ))}
            </>
    )
}


export default Results;