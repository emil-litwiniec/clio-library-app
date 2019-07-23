import React from 'react';

import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    fullWidth: {
        width: '100%'
    }

}))

export default ({ id, label, props, margin = 'dense', cls = '',  ...rest }) => {
    const classes = useStyles();
    return (
    <TextField
        type="text"
        label={label}
        variant="outlined"
        margin={margin}
        id={id}
        className={clsx(cls)}
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
        inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              }}
            }
        {...rest}
    />
)};