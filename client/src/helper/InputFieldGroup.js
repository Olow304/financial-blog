import React, { Component } from 'react';
//import classnames from 'classnames'
import propTypes from 'prop-types'

const InputFieldGroup = ({
    placeholder,
    value,
    name,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input 
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="form-control form-control-lg"
            />
        </div>
    )
}

InputFieldGroup.propTypes = {
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    error: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    disabled: propTypes.string
}

export default InputFieldGroup;