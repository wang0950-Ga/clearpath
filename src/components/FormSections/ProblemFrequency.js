// components/FormSections/ProblemFrequency.js
import React from 'react';

function ProblemFrequency({ formData, handleInputChange }) {
  const problems = [
    { key: 'cannotFindInfo', label: 'Cannot find pricing/package information' },
    { key: 'timeToFindInfo', label: 'Takes a long time to find pricing/package information' },
    { key: 'outdatedInfo', label: 'Information is outdated/inaccurate' },
    { key: 'slowLoading', label: 'Website loads slowly/frequently freezes' },
    { key: 'mobileExperience', label: 'Poor mobile experience' },
    { key: 'complexBooking', label: 'Complex booking/registration systems' },
    { key: 'difficultContact', label: 'Difficult to find contact information' },
    { key: 'confusingNavigation', label: 'Confusing information categorization, too many layers' }
  ];

  const frequencyOptions = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

  return (
    <div className="form-section">
      <h2 className="section-title">3. Problem Frequency</h2>
      <p>How often do the following problems occur when using these websites?</p>

      {problems.map(problem => (
        <div key={problem.key} className="radio-group">
          <p className="question-title">{problem.label}</p>
          <div className="radio-options">
            {frequencyOptions.map(frequency => (
              <label key={frequency} className="radio-label">
                <input
                  type="radio"
                  name={problem.key}
                  value={frequency}
                  checked={formData[problem.key] === frequency}
                  onChange={(e) => handleInputChange(problem.key, e.target.value)}
                />
                {frequency}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProblemFrequency;