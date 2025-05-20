// components/FormSections/ServiceTypes.js
import React from 'react';

function ServiceTypes({ formData, handleCheckboxChange }) {
  const serviceOptions = [
    'Gyms/Sports clubs',
    'Restaurants/Entertainment venues',
    'Resorts/Hotels',
    'Government services',
    'Public utilities',
    'Healthcare services'
  ];

  return (
    <div className="form-section">
      <h2 className="section-title">2. Service Types Used</h2>
      <div className="form-group">
        <p>Which types of websites have you used in Ottawa/surrounding areas? (Check all that apply)</p>
        
        {serviceOptions.map(service => (
          <div key={service} className="checkbox-option">
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
    </div>
  );
}

export default ServiceTypes;