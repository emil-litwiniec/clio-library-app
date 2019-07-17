import React from 'react';

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"


const useStyles = makeStyles(theme => ({
    marginDense: {
        marginRight: theme.spacing(1)
    }

}))

export default ({ id, label, props, margin = 'dense',  ...rest }) => {
    const classes = useStyles();
    return (
    <TextField
        type="text"
        label={label}
        variant="outlined"
        margin={margin}
        id={id}
        className={classes.marginDense}
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
        {...rest}
    />
)};