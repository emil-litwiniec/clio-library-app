import React, { useState } from "react";
import axios from "axios";

import Search from "../components/Search";
import Results from "../components/Results";

const MainPage = () => {
    const [results, setResults] = useState();

    const handleSubmit = (values) => {
        const isSearchInAuthors = values.searchIn === 'a' ? true : false;
        const searchBy = isSearchInAuthors ? 'author' : values.searchBy;
        const order = isSearchInAuthors ? values.authorsOrderBy : values.titlesOrderBy ;
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: values.searchIn,
              col: searchBy,
              value: values.value,
              yearStart: values.yearStart,
              yearEnd: values.yearEnd,
              order: order
      
        }})
          .then((res) => {
            if(res.config.params.query === 'a' && res.data.message) {
                setResults({message: 'Author not found'});
            } else {
                setResults(res.data);

            }
          })
          .catch(err => {
              setResults({error: 'Book not found'})
          
          })
  }

return (
    <>
        <h2>Clio Library App</h2>

        <Search handleSubmit={handleSubmit} />
        <Results results={results}/>
    </>
)
}

export default MainPage;