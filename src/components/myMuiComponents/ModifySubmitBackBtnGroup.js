
import React from "react";

import { ButtonGroup, Button } from "@material-ui/core";



export default ({
    handleModifyButton,
     handleDeleteButton,
      handleCreateButton,
       props}) => (
    <ButtonGroup size="small">
    <Button 
            type="button" 
            variant="outlined"

            onClick={() => handleModifyButton(props)}
    >
        Modify
    </Button>

    <Button 
        type="button" 
        variant="outlined"
        onClick={
            () => handleDeleteButton()
            }
    >
        Delete
    </Button>

    <Button
        type="button"
        variant="outlined"
        onClick={() => handleCreateButton(props)}>
            Create
    </Button>
    </ButtonGroup>
)