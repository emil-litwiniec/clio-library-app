import React from "react";


const Results = ({ results } = props) => {

    const renderResults = () => {
        // if(results.error) {
        //     console.log(results.error)
        // }
        console.log('message, resluts: ', results);
        if(results && results.message) {
            console.log(results.message);
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
        {/* {if(results && results.error){ return (s)}}
        {{results &&
            results.map((result, idx) => (
                <p key={idx}>
                    {idx + 1}, title: {result.title}, author: {result.author}, year: {result.year}
                </p>
            ))}} */}

            {renderResults()}
            </>
    )
}


export default Results;