import React, { useState } from "react";
import axios from "axios";

import Search from "../components/Search";
import Results from "../components/Results";

const MainPage = () => {
    const [results, setResults] = useState();

    const handleSubmit = (values) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: values.query,
              col: values.searchBy,
              value: values.value
          }
      
        })
          .then((res) => {
            setResults(res.data);
            //   alert(JSON.stringify(res, null ,2 ));
             
          })
          .catch(err => {
              alert(JSON.stringify(err, null ,2 ))
          
          }
          )
        console.log('heya!');
        console.log('vals:', values)
  }
return (
    <>
        <h2>Clio LIbrary App</h2>

        <Search handleSubmit={handleSubmit} />
        <Results results={results}/>
        {/* {results &&
            results.map((result, idx) => (
                <p key={idx}>
                    {idx + 1}, {result.title}, {result.author}
                </p>
            ))} */}
    </>
);
}

export default MainPage;