import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const Results = ({ results, actualQuery } = props) => {

    

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
                return (
                    <div key={idx} >
                    {actualQuery.query.searchIn == 'b' && bookResult}
                    {actualQuery.query.searchIn == 'a' && authorResult}

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

const mapStateToProps = state => ({
    actualQuery: state.actualQuery
})



export default connect(mapStateToProps)(Results);