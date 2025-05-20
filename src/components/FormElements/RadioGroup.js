// src/components/FormElements/RadioGroup.js
import React from 'react';

function RadioGroup({ title, options, name, value, onChange }) {
  return (
    <div className="form-group">
      {title && <p className="form-question">{title}</p>}
      <div className="radio-options">
        {options.map(option => (
          <label key={option} className="radio-label">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(name, e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;