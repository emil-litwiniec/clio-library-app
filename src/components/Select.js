import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  MenuItem,
  Select as SelectMaterial,
  FormControl,
  FormHelperText,
  InputLabel
} from '@material-ui/core';

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
