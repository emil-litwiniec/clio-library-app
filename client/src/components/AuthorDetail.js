import React from 'react';


import Results from "./Results";

const AuthorDetail = ({author, books} = props) => {
    return (
        <div>
            {author && <>  <h3>{author[0].first_name} {author[0].last_name}</h3>
            <p>Origin: {author[0].origin}</p></>}
           
            {books && <Results results={Array.isArray(books) && books}/>}
        </div>
    )
}


export default AuthorDetail;