
import React from "react";

import { ButtonGroup, Button } from "@material-ui/core";



export default ({that, props}) => (
    <ButtonGroup>

    <Button 
            type="button" 
            variant="outlined"

            onClick={() => that.handleModifyButton(props)}
    >
        Modify
    </Button>

    <Button 
        type="button" 
        variant="outlined"
        onClick={
            () => that.setState(state => (
                {...state, phase: 3}
                ))
            }
    >
        Delete
    </Button>

    <Button
        type="button"
        variant="outlined"
        onClick={() => that.handleCreateButton(props)}>
            Create
    </Button>
    </ButtonGroup>
)