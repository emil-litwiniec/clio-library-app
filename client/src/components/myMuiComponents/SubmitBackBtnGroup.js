
import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";


export default ({that, props}) => (
    <ButtonGroup size="small">
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