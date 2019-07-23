import React from "react";
import { history } from "../routers/AppRouter";

import SearchBookId from "./SearchBookId";
import { Typography } from "@material-ui/core";



const FindBookToUpdate = () => {

  const handleRedirect = (value) => {
    history.push(`/updateBook/${value}`);
  }
  return (
    <>
    <Typography variant="overline">
      Modify book:
    </Typography>
      <SearchBookId handleSubmit={handleRedirect} searchForUpdate={true}/>
    </>
  ) 
};


export default FindBookToUpdate;