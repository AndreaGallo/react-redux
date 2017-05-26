import React, { PropTypes } from 'react';

const SelectInput = ({name, label, value, onChange, defaultOption, options, error}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control"
              name={name}
              value={value}
              onChange={onChange}>
              <option value="">{defaultOption}</option>
              {
                options.map((option) => {
                  return <option key={option.value} value={option.value}>{option.text}</option>;
                })
              }
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string
};

export default SelectInput;
