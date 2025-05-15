import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    // Basic Information
    age: '',
    location: '',
    frequency: '',

    // Service Types (array for checkboxes)
    serviceTypes: [],

    // Problem Frequency
    cannotFindInfo: '',
    timeToFindInfo: '',
    outdatedInfo: '',
    slowLoading: '',
    mobileExperience: '',
    complexBooking: '',
    difficultContact: '',
    confusingNavigation: '',

    // Time Consumption
    generalFindTime: '',
    longestFindTime: '',
    idealFindTime: '',

    // Abandonment Behavior
    giveUpTime: '',
    abandonedService: '',

    // Problem Impact
    problemImpact: '',

    // Coping Strategies (array)
    copingStrategies: [],

    // Decision Impact
    usabilityInfluence: '',
    preferUsableWebsites: '',

    // Industry Problems
    industryRanking: {},

    // Solution Acceptance
    usePlatform: '',

    // Specific Case
    specificCase: '',

    // Email
    wantUpdates: false,
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const validateForm = () => {
    const requiredFields = [
      'age', 'location', 'frequency',
      'cannotFindInfo', 'timeToFindInfo', 'outdatedInfo', 'slowLoading',
      'mobileExperience', 'complexBooking', 'difficultContact', 'confusingNavigation',
      'generalFindTime', 'longestFindTime', 'idealFindTime',
      'giveUpTime', 'abandonedService', 'problemImpact',
      'usabilityInfluence', 'preferUsableWebsites', 'usePlatform'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return { valid: false, message: `Please complete: ${field}` };
      }
    }

    if (formData.serviceTypes.length === 0) {
      return { valid: false, message: 'Please select at least one service type' };
    }

    if (formData.copingStrategies.length === 0) {
      return { valid: false, message: 'Please select at least one coping strategy' };
    }

    return { valid: true };
  };

  const submitFormData = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      setSubmitStatus('error');
      alert(validation.message);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // timestamp
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        submittedAtLocal: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
      };

      // Replace with your Google Apps Script URL
      const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        alert('Survey submitted successfully! Thank you for your participation.');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      alert('Submission failed. Please try again later or contact the administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportToJson = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-data-${Date.now()}.json`;
    link.click();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Ottawa Area User Experience Survey</h1>

      <form>
        {/* 1. Basic Information */}
        <h2>1. Basic Information</h2>

        {/* Age Group */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="age">Age Group:(Your group will be invisible after select)</label>
          <select
            id="age"
            value={formData.age ? "selected" : ""}
            onChange={(e) => {
              if (e.target.value !== "selected" && e.target.value !== "") {
                handleInputChange('age', e.target.value);
              }
            }}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">Select age group</option>
            {formData.age ? (
              <option value="selected">✓ Selected</option>
            ) : (
              <>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="55+">55+</option>
              </>
            )}
          </select>

          {/* Reset button - only show when age is selected */}
          {formData.age && (
            <button
              type="button"
              onClick={() => handleInputChange('age', '')}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Primary Activity Area */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="location">Primary Activity Area:</label>
          <select
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">Select area</option>
            <option value="Ottawa downtown">Ottawa downtown</option>
            <option value="Gatineau">Gatineau (Quebec side)</option>
            <option value="Kanata/Stittsville">Kanata/Stittsville</option>
            <option value="Orleans">Orleans</option>
            <option value="Barrhaven/Nepean">Barrhaven/Nepean</option>
            <option value="Surrounding areas">Ottawa surroundings</option>
          </select>
        </div>

        {/* Frequency */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="frequency">Frequency of using local service websites:</label>
          <select
            id="frequency"
            value={formData.frequency}
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">Select frequency</option>
            <option value="Rarely">Rarely</option>
            <option value="1-2 times/week">1-2 times/week</option>
            <option value="3-5 times/week">3-5 times/week</option>
            <option value="Daily">Daily</option>
          </select>
        </div>

        {/* 2. Service Types */}
        <h2>2. Service Types Used</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>Which types of websites have you used in Ottawa/surrounding areas? (Check all that apply)</p>
          {[
            'Gyms/Sports clubs',
            'Restaurants/Entertainment venues',
            'Resorts/Hotels',
            'Government services',
            'Public utilities',
            'Healthcare services'
          ].map(service => (
            <div key={service} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                id={service}
                checked={formData.serviceTypes.includes(service)}
                onChange={(e) => handleCheckboxChange('serviceTypes', service, e.target.checked)}
              />
              <label htmlFor={service} style={{ marginLeft: '8px' }}>{service}</label>
            </div>
          ))}
        </div>

        {/* 3. Problem Frequency */}
        <h2>3. Problem Frequency</h2>
        <p>How often do the following problems occur when using these websites?</p>

        {/* Each problem gets its own radio button group */}
        {[
          { key: 'cannotFindInfo', label: 'Cannot find pricing/package information' },
          { key: 'timeToFindInfo', label: 'Takes a long time to find pricing/package information' },
          { key: 'outdatedInfo', label: 'Information is outdated/inaccurate' },
          { key: 'slowLoading', label: 'Website loads slowly/frequently freezes' },
          { key: 'mobileExperience', label: 'Poor mobile experience' },
          { key: 'complexBooking', label: 'Complex booking/registration systems' },
          { key: 'difficultContact', label: 'Difficult to find contact information' },
          { key: 'confusingNavigation', label: 'Confusing information categorization, too many layers' }
        ].map(problem => (
          <div key={problem.key} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee' }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{problem.label}</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].map(frequency => (
                <label key={frequency} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name={problem.key}
                    value={frequency}
                    checked={formData[problem.key] === frequency}
                    onChange={(e) => handleInputChange(problem.key, e.target.value)}
                    style={{ marginRight: '5px' }}
                  />
                  {frequency}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* 4. Time Consumption */}
        <h2>4. Time Consumption (Quantifying Pain Points)</h2>

        {/* Question 1: General time */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Generally, how long does it take you to find the information you need?
          </p>
          {['1-2 minutes', '3-5 minutes', '6-10 minutes', '11-20 minutes', 'Over 20 minutes'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Do you remember the longest time you spent looking for information?
          </p>
          {['Under 5 minutes', '5-15 minutes', '15-30 minutes', '30 minutes-1 hour', 'Over 1 hour', 'Never found it'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Ideally, how long should it take to find needed information on a website?
          </p>
          {['Under 30 seconds', '1-2 minutes', '3-5 minutes', 'Over 5 minutes'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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

        {/* 5. Abandonment Behavior */}
        <h2>5. Abandonment Behavior</h2>

        {/* Question 1: Give up time */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            If you can't find the information you need, how long do you spend before giving up?
          </p>
          {['Give up immediately', 'After 2-3 minutes', 'After 5-10 minutes', 'After 10+ minutes', 'Never give up, must find it'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Have you ever abandoned a service because you couldn't find the information you needed?
          </p>
          {['Never', '1-2 times', '3-5 times', '5+ times'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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

        {/* 6. Problem Impact */}
        <h2>6. Problem Impact</h2>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            How do these problems affect your experience with local service websites?
          </p>
          {['Not bothered at all ', 'Slightly bothered', 'Moderately', 'Very', 'Extremely'].map(option => (
            <div key={option} style={{ marginBottom: '8px' }}>
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

        {/* 7. Coping Strategies  */}
        <h2>7. Coping Strategies</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>When encountering website problems, what do you usually do? (Check all that apply)</p>
          {[
            'Call to inquire',
            'Visit the location in person',
            'Search on Google/social media',
            'Look for other service providers',
            'Give up directly',
            'Ask friends for help'
          ].map(strategy => (
            <div key={strategy} style={{ marginBottom: '10px' }}>
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

        {/* 8. Decision Impact  */}
        <h2>8. Decision Impact</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>Does website usability affect your choice of service providers? </p>
          {[
            'Does not affect at all only care about service quality',
            'Slightly affects, but not a main factor',
            'Somewhat affects, consider website experience',
            'Greatly affects, poor website reduces choice likelihood',
            'Decisive factor, would not consider if website is poor'
          ].map(service => (
            <div key={service} style={{ marginBottom: '10px' }}>
              <input
                type="radio"
                id={service}
                checked={formData.serviceTypes.includes(service)}
                onChange={(e) => handleCheckboxChange('serviceTypes', service, e.target.checked)}
              />
              <label htmlFor={service} style={{ marginLeft: '8px' }}>{service}</label>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p>Do you prefer to choose local service providers with user-friendly websites?</p>
          {[
            'Do not consider at all',
            'Consider slightly ',
            'Consider moderately ',
            'Very important',
            'Decisive factor'
          ].map(service => (
            <div key={service} style={{ marginBottom: '10px' }}>
              <input
                type="radio"
                id={service}
                checked={formData.serviceTypes.includes(service)}
                onChange={(e) => handleCheckboxChange('serviceTypes', service, e.target.checked)}
              />
              <label htmlFor={service} style={{ marginLeft: '8px' }}>{service}</label>
            </div>
          ))}
        </div>

        {/* 9. Industry Problem Distribution */}
        <h2>9. Industry Problem Distribution</h2>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Which industry websites do you encounter the most problems with? (Rank by problem severity 1-6, 6 being most severe)
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Drag to reorder, or use the dropdown to assign ranks to each industry
          </p>

          {[
            'Government services',
            'Fitness/Sports',
            'Restaurants/Entertainment',
            'Healthcare',
            'Public utilities',
            'Resorts/Hotels',
            'Education/Universities',
            'Transportation/Travel'
          ].map((industry, index) => (
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

        {/* 10.Solution Acceptance  */}
        <h2>10.Solution Acceptance</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>If there was a platform that integrates Ottawa local service information with optimized interface, how likely would you use it?  </p>
          {[
            'Do	Definitely would not ',
            'Unlikely ',
            'Possible',
            'Very likely ',
            'Definitely will'
          ].map(service => (
            <div key={service} style={{ marginBottom: '10px' }}>
              <input
                type="radio"
                id={service}
                checked={formData.serviceTypes.includes(service)}
                onChange={(e) => handleCheckboxChange('serviceTypes', service, e.target.checked)}
              />
              <label htmlFor={service} style={{ marginLeft: '8px' }}>{service}</label>
            </div>
          ))}
        </div>

        {/* 11. Specific Case */}
        <h2>11. Specific Case (Optional)</h2>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Please briefly describe a recent difficulty you encountered on an Ottawa/surrounding area website (website name/type + specific problem):
          </p>
          <textarea
            value={formData.specificCase}
            onChange={(e) => handleInputChange('specificCase', e.target.value)}
            placeholder="Example: GoodLife Fitness website - couldn't find class schedules for the Kanata location, had to call to get information..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
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

        {/* 12. Follow-up Contact (Optional) */}
        <h2>12. Follow-up Contact (Optional)</h2>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
            If you would like to:
          </p>
          <ul style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            <li>Receive research results report</li>
            <li>Learn about solutions developed based on this research</li>
            <li>Participate in follow-up in-depth interviews</li>
            <li><strong>Become one of the first users with lifetime free access</strong></li>
          </ul>

          {/* Email checkbox and input */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={formData.wantUpdates}
                onChange={(e) => handleInputChange('wantUpdates', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <span style={{ fontWeight: 'bold' }}>Yes, I would like to be contacted</span>
            </label>

            {formData.wantUpdates && (
              <div style={{ marginLeft: '25px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                  Please provide email: <span style={{ color: '#666' }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{
            fontSize: '12px',
            color: '#666',
            fontStyle: 'italic',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            border: '1px solid #e9e9e9'
          }}>
            We promise to use this only for research-related contact, not for marketing or sharing with third parties.
            Users who provide email will have priority access to the product and lifetime free usage.
          </div>
        </div>
        
        {/* Submit Section */}
        <h2>Submit Survey</h2>
        <div style={{
          marginTop: '30px',
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Before submitting, please make sure you have completed all required sections.
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              Your responses are valuable to our research and will help improve local service websites in Ottawa.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={submitFormData}
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </button>

            {/* Optional: JSON export button */}
  
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;