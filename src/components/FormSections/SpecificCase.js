// components/FormSections/SpecificCase.js
import React from 'react';

function SpecificCase({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">11. Specific Case (Optional)</h2>
      <div className="form-group">
        <p className="question-title">
          Please briefly describe a recent difficulty you encountered on an Ottawa/surrounding area website (website name/type + specific problem):
        </p>
        <textarea
          value={formData.specificCase}
          onChange={(e) => handleInputChange('specificCase', e.target.value)}
          placeholder="Example: GoodLife Fitness website - couldn't find class schedules for the Kanata location, had to call to get information..."
          className="textarea-control"
        />
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '5px',
          textAlign: 'right'
        }}>
          {formData.specificCase.length}/2000 characters
        </div>
      </div>
    </div>
  );
}

export default SpecificCase;