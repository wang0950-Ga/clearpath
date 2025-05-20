// components/FormSections/DecisionImpact.js
import React from 'react';

function DecisionImpact({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">8. Decision Impact</h2>
      
      {/* 修复：使用handleInputChange而不是handleCheckboxChange */}
      <div className="form-group">
        <p>Does website usability affect your choice of service providers?</p>
        {[
          'Does not affect at all only care about service quality',
          'Slightly affects, but not a main factor',
          'Somewhat affects, consider website experience',
          'Greatly affects, poor website reduces choice likelihood',
          'Decisive factor, would not consider if website is poor'
        ].map(option => (
          <div key={option} className="radio-option">
            <input
              type="radio"
              id={`usability-${option}`}
              name="usabilityInfluence"
              value={option}
              checked={formData.usabilityInfluence === option}
              onChange={(e) => handleInputChange('usabilityInfluence', e.target.value)}
            />
            <label htmlFor={`usability-${option}`} style={{ marginLeft: '8px' }}>{option}</label>
          </div>
        ))}
      </div>

      <div className="form-group">
        <p>Do you prefer to choose local service providers with user-friendly websites?</p>
        {[
          'Do not consider at all',
          'Consider slightly',
          'Consider moderately',
          'Very important',
          'Decisive factor'
        ].map(option => (
          <div key={option} className="radio-option">
            <input
              type="radio"
              id={`prefer-${option}`}
              name="preferUsableWebsites"
              value={option}
              checked={formData.preferUsableWebsites === option}
              onChange={(e) => handleInputChange('preferUsableWebsites', e.target.value)}
            />
            <label htmlFor={`prefer-${option}`} style={{ marginLeft: '8px' }}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DecisionImpact;