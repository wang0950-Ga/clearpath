// components/FormSections/ProblemImpact.js
import React from 'react';

function ProblemImpact({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">6. Problem Impact</h2>
      <div className="form-group">
        <p className="question-title">
          How do these problems affect your experience with local service websites?
        </p>
        {['Not bothered at all', 'Slightly bothered', 'Moderately', 'Very', 'Extremely'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="problemImpact"
                value={option}
                checked={formData.problemImpact === option}
                onChange={(e) => handleInputChange('problemImpact', e.target.value)}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemImpact;