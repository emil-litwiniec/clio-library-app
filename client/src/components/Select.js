import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import SelectMaterial from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  menuItemRoot: {
    minHeight: 20,
    fontSize: '.8rem'
  },
  formControl: {
    minWidth: 80
  },
  fullWidth: {
    minWidth: '100%'
  }
}));

const Select = props => {
  const classes = useStyles();
  const {
    name,
    error,
    errorMessage,
    label,
    value,
    options,
    formikProps,
    disabled = false,
    fullWidth = false,
    ...rest
  } = props;

  return (
    <>
      <FormControl
        className={fullWidth ? classes.fullWidth : classes.formControl}
      >
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <SelectMaterial
          name={name}
          value={value}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          disabled={disabled}
          error={error}
          {...rest}
        >
          {options.map((option, idx) => {
            return (
              <MenuItem
                classes={{
                  root: classes.menuItemRoot
                }}
                key={idx}
                value={option.value}
              >
                {option.name}
              </MenuItem>
            );
          })}
        </SelectMaterial>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export default Select;
