// components/FormSections/CopingStrategies.js
import React from 'react';

function CopingStrategies({ formData, handleCheckboxChange }) {
  const strategies = [
    'Call to inquire',
    'Visit the location in person',
    'Search on Google/social media',
    'Look for other service providers',
    'Give up directly',
    'Ask friends for help'
  ];

  return (
    <div className="form-section">
      <h2 className="section-title">7. Coping Strategies</h2>
      <div className="form-group">
        <p>When encountering website problems, what do you usually do? (Check all that apply)</p>
        
        {strategies.map(strategy => (
          <div key={strategy} className="checkbox-option">
            <input
              type="checkbox"
              id={strategy}
              checked={formData.copingStrategies.includes(strategy)}
              onChange={(e) => handleCheckboxChange('copingStrategies', strategy, e.target.checked)}
            />
            <label htmlFor={strategy} style={{ marginLeft: '8px' }}>{strategy}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CopingStrategies;