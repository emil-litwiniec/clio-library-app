import React from 'react';

import { TextField } from "@material-ui/core";


export default ({ id, label, props }) => (
    <TextField
        type="text"
        label={label}
        variant="outlined"
        id={id}
        error={
            props.errors
                [`${id}`] &&
            props.touched[`${id}`]
        }
        helperText={
            props.errors
                [`${id}`] &&
            props.touched[`${id}`]
                ? props.errors
                        [`${id}`]
                : null
        }
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values[`${id}`]}
        name={id}
    />
);