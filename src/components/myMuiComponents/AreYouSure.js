
import React from "react";

import {Typography, ButtonGroup, Button} from "@material-ui/core";



export default ({that, id}) => (
    <>
        <Typography>Are you sure?</Typography>

        <ButtonGroup>
            <Button onClick={() => that.handleDelete(props.values[`${id}`])}>
                Yes
            </Button>
            <Button
                onClick={() =>
                    that.setState(state => ({
                        ...state,
                        phase: 1
                    }))
                }
            >
                No
            </Button>
        </ButtonGroup>
    </>
)