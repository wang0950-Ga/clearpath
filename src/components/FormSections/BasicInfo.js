    // components/FormSections/BasicInfo.js
import React from 'react';

function BasicInfo({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">1. Basic Information</h2>
      
      {/* Age Group */}
      <div className="form-group">
        <label htmlFor="age">Age Group:(Your group will be invisible after select)</label>
        <select
          id="age"
          value={formData.age ? "selected" : ""}
          onChange={(e) => {
            if (e.target.value !== "selected" && e.target.value !== "") {
              handleInputChange('age', e.target.value);
            }
          }}
          className="form-control"
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

        {formData.age && (
          <button
            type="button"
            onClick={() => handleInputChange('age', '')}
            className="btn-reset"
          >
            Reset
          </button>
        )}
      </div>

      {/* Primary Activity Area */}
      <div className="form-group">
        <label htmlFor="location">Primary Activity Area:</label>
        <select
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="form-control"
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
      <div className="form-group">
        <label htmlFor="frequency">Frequency of using local service websites:</label>
        <select
          id="frequency"
          value={formData.frequency}
          onChange={(e) => handleInputChange('frequency', e.target.value)}
          className="form-control"
        >
          <option value="">Select frequency</option>
          <option value="Rarely">Rarely</option>
          <option value="1-2 times/week">1-2 times/week</option>
          <option value="3-5 times/week">3-5 times/week</option>
          <option value="Daily">Daily</option>
        </select>
      </div>
    </div>
  );
}

export default BasicInfo;