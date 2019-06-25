import React, { useState } from "react";
import axios from "axios";

import Search from "../components/Search";
import Results from "../components/Results";

const MainPage = () => {
    const [results, setResults] = useState();

    const handleSubmit = (values) => {
        let searchBy = values.searchIn === 'a' ? 'author' : values.searchBy;
        // let yearStart = values.searchIn === 'a' ? 
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: values.searchIn,
              col: searchBy,
              value: values.value,
              yearStart: values.yearStart,
              yearEnd: values.yearEnd
          }
      
        })
          .then((res) => {
              console.log(res);
            if(res.config.params.query === 'a') {
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
        <h2>Clio LIbrary App</h2>

        <Search handleSubmit={handleSubmit} />
        <Results results={results}/>
    </>
)
}

export default MainPage;