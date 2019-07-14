import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    MenuItem,
    Select as SelectMaterial,
    FormControl,
    FormHelperText,
    InputLabel
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
    },
  }));

const Select = (props) => {

    const classes = useStyles();
    const { name , error, errorMessage, label, value ,options, formikProps, disabled = false } = props;

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={label} >{label}</InputLabel>
                <SelectMaterial
                    name={name}
                    value={value}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    disabled={disabled}
                    error={error}
                >
                

                {options.map((option, idx) => {
                    return (

                    <MenuItem key={idx} value={option.value} >{option.name}</MenuItem>
                )})}
                </SelectMaterial>
                <FormHelperText>
                  {errorMessage}
                </FormHelperText>
            </FormControl>
        </>
    );
};

export default Select;