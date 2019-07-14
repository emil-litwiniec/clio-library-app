
import React from "react";

import {ButtonGroup, Button} from "@material-ui/core";



export default ({that, props}) => (
    <ButtonGroup>
        <Button variant="outlined" type="submit">
            Submit
        </Button>
        <Button
            variant="outlined"
            type="button"
            onClick={() => that.setState(state => ({ ...state, phase: 1 }))}
        >
            Back
        </Button>
    </ButtonGroup>
)