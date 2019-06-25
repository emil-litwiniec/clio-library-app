import React, { useState } from "react";
import axios from "axios";

import Search from "../components/Search";
import Results from "../components/Results";

const MainPage = () => {
    const [results, setResults] = useState();

    const handleSubmit = (values) => {
        let searchBy = values.searchIn === 'a' ? 'author' : values.searchBy
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: values.searchIn,
              col: searchBy,
              value: values.value
          }
      
        })
          .then((res) => {
            setResults(res.data);
          })
          .catch(err => {
              alert(JSON.stringify(err, null ,2 ))
          
          }
          )
  }
return (
    <>
        <h2>Clio LIbrary App</h2>

        <Search handleSubmit={handleSubmit} />
        <Results results={results}/>
    </>
);
}

export default MainPage;