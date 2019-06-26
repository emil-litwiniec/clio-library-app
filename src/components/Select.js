import React from "react";


const Select = (props) => {
    const { name , label, value ,options, formikProps, disabled = false } = props;

    return (
        <>
            <label>{label}</label>
            <select
                name={name}
                value={formikProps.values[`${value}`]}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                style={{ display: "block" }}
                disabled={disabled}
            >
                {options.map((option, idx) => {
                    return (
                    <option key={idx} value={option.value} label={option.label}>
                        {option.name}
                    </option>
                )})}
            </select>
        </>
    );
};

export default Select;