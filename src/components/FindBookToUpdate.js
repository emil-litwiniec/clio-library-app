import React from "react";
import { history } from "../routers/AppRouter";

import SearchBookId from "./SearchBookId";



const FindBookToUpdate = () => {

  const handleRedirect = (value) => {
    history.push(`/updateBook/${value}`);
  }
  return (
    <>
      <SearchBookId handleSubmit={handleRedirect} searchForUpdate={true}/>
    </>
  ) 
};


export default FindBookToUpdate;