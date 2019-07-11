import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMaterial from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Select = (props) => {

    const classes = useStyles();
    const { name , label, value ,options, formikProps, disabled = false } = props;

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
                >

                {options.map((option, idx) => {
                    return (

                    <MenuItem key={idx} value={option.value} >{option.name}</MenuItem>
                )})}
                </SelectMaterial>
            </FormControl>
        </>
    );
};

export default Select;