// components/FormSections/TimeConsumption.js
import React from 'react';

function TimeConsumption({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">4. Time Consumption (Quantifying Pain Points)</h2>

      {/* Question 1: General time */}
      <div className="form-group">
        <p className="question-title">
          Generally, how long does it take you to find the information you need?
        </p>
        {['1-2 minutes', '3-5 minutes', '6-10 minutes', '11-20 minutes', 'Over 20 minutes'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="generalFindTime"
                value={option}
                checked={formData.generalFindTime === option}
                onChange={(e) => handleInputChange('generalFindTime', e.target.value)}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* Question 2: Longest time */}
      <div className="form-group">
        <p className="question-title">
          Do you remember the longest time you spent looking for information?
        </p>
        {['Under 5 minutes', '5-15 minutes', '15-30 minutes', '30 minutes-1 hour', 'Over 1 hour', 'Never found it'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="longestFindTime"
                value={option}
                checked={formData.longestFindTime === option}
                onChange={(e) => handleInputChange('longestFindTime', e.target.value)}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* Question 3: Ideal time */}
      <div className="form-group">
        <p className="question-title">
          Ideally, how long should it take to find needed information on a website?
        </p>
        {['Under 30 seconds', '1-2 minutes', '3-5 minutes', 'Over 5 minutes'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="idealFindTime"
                value={option}
                checked={formData.idealFindTime === option}
                onChange={(e) => handleInputChange('idealFindTime', e.target.value)}
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

export default TimeConsumption;