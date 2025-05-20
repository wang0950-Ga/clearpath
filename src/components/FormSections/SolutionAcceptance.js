// components/FormSections/SolutionAcceptance.js
import React from 'react';

function SolutionAcceptance({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">10. Solution Acceptance</h2>
      <div className="form-group">
        <p>If there was a platform that integrates Ottawa local service information with optimized interface, how likely would you use it?</p>
        
        {/* 修复：使用handleInputChange而不是handleCheckboxChange */}
        {[
          'Definitely would not',
          'Unlikely',
          'Possible',
          'Very likely',
          'Definitely will'
        ].map(option => (
          <div key={option} className="radio-option">
            <input
              type="radio"
              id={`usePlatform-${option}`}
              name="usePlatform"
              value={option}
              checked={formData.usePlatform === option}
              onChange={(e) => handleInputChange('usePlatform', e.target.value)}
            />
            <label htmlFor={`usePlatform-${option}`} style={{ marginLeft: '8px' }}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionAcceptance;