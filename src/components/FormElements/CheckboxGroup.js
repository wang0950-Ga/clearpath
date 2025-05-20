// src/components/FormElements/CheckboxGroup.js
import React from 'react';

function CheckboxGroup({ title, options, name, values, onChange }) {
  return (
    <div className="form-group">
      {title && <p className="form-question">{title}</p>}
      <div className="checkbox-options">
        {options.map(option => (
          <div key={option} className="checkbox-option">
            <input
              type="checkbox"
              id={`${name}-${option}`}
              checked={values.includes(option)}
              onChange={(e) => onChange(name, option, e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor={`${name}-${option}`} className="checkbox-label">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;