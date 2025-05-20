// components/FormSections/IndustryProblems.js
import React from 'react';

function IndustryProblems({ formData, handleInputChange }) {
  const industries = [
    'Government services',
    'Fitness/Sports',
    'Restaurants/Entertainment',
    'Healthcare',
    'Public utilities',
    'Resorts/Hotels',
    'Education/Universities',
    'Transportation/Travel'
  ];

  return (
    <div className="form-section">
      <h2 className="section-title">9. Industry Problem Distribution</h2>
      <div className="form-group">
        <p className="question-title">
          Which industry websites do you encounter the most problems with? (Rank by problem severity 1-6, 6 being most severe)
        </p>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          Drag to reorder, or use the dropdown to assign ranks to each industry
        </p>

        {industries.map((industry, index) => (
          <div key={industry} style={{
            marginBottom: '15px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '500' }}>{industry}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px' }}>Rank:</label>
                <select
                  value={formData.industryRanking?.[industry] || ''}
                  onChange={(e) => {
                    const newRanking = { ...formData.industryRanking };

                    // Remove the old ranking if it exists
                    Object.keys(newRanking).forEach(key => {
                      if (newRanking[key] === e.target.value) {
                        delete newRanking[key];
                      }
                    });

                    // Set the new ranking
                    if (e.target.value) {
                      newRanking[industry] = e.target.value;
                    } else {
                      delete newRanking[industry];
                    }

                    handleInputChange('industryRanking', newRanking);
                  }}
                  style={{ padding: '5px', width: '80px' }}
                >
                  <option value="">--</option>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option
                      key={num}
                      value={num}
                      disabled={formData.industryRanking &&
                        Object.values(formData.industryRanking).includes(num.toString()) &&
                        formData.industryRanking[industry] !== num.toString()}
                    >
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustryProblems;