// components/FormSections/ContactInfo.js
import React from 'react';

function ContactInfo({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <h2 className="section-title">12. Follow-up Contact (Optional)</h2>
      <div className="form-group">
        <p className="question-title">
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
    </div>
  );
}

export default ContactInfo;