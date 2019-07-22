
import React from "react";


import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";



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