// components/FormSections/AbandonmentBehavior.js
import React from 'react';

function AbandonmentBehavior({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">5. Abandonment Behavior</h2>

      {/* Question 1: Give up time */}
      <div className="form-group">
        <p className="question-title">
          If you can't find the information you need, how long do you spend before giving up?
        </p>
        {['Give up immediately', 'After 2-3 minutes', 'After 5-10 minutes', 'After 10+ minutes', 'Never give up, must find it'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="giveUpTime"
                value={option}
                checked={formData.giveUpTime === option}
                onChange={(e) => handleInputChange('giveUpTime', e.target.value)}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* Question 2: Abandoned service */}
      <div className="form-group">
        <p className="question-title">
          Have you ever abandoned a service because you couldn't find the information you needed?
        </p>
        {['Never', '1-2 times', '3-5 times', '5+ times'].map(option => (
          <div key={option} className="radio-option">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="abandonedService"
                value={option}
                checked={formData.abandonedService === option}
                onChange={(e) => handleInputChange('abandonedService', e.target.value)}
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

export default AbandonmentBehavior;