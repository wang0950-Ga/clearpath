// App.js
import React, { useState } from 'react';
import './styles.css';

// 导入所有表单部分组件
import BasicInfo from './components/FormSections/BasicInfo';
import ServiceTypes from './components/FormSections/ServiceTypes';
import ProblemFrequency from './components/FormSections/ProblemFrequency';
import TimeConsumption from './components/FormSections/TimeConsumption';
import AbandonmentBehavior from './components/FormSections/AbandonmentBehavior';
import ProblemImpact from './components/FormSections/ProblemImpact';
import CopingStrategies from './components/FormSections/CopingStrategies';
import DecisionImpact from './components/FormSections/DecisionImpact';
import IndustryProblems from './components/FormSections/IndustryProblems';
import SolutionAcceptance from './components/FormSections/SolutionAcceptance';
import SpecificCase from './components/FormSections/SpecificCase';
import ContactInfo from './components/FormSections/ContactInfo';

function App() {
  // 保持原有的状态结构，确保所有功能正常
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

  // 通用处理函数，保持原有逻辑
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

  // 表单验证，保持原有逻辑
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

  // 表单提交函数，使用实际Google Apps Script URL
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
      // 使用实际部署的脚本URL
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        submittedAtLocal: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbwmEEAMCJ1lcpYhNXGe11ACt7SZzdOvR53yA-LTuMVOBR3VHEzVPfLVIx4kB_M_oKh9nw/exec', {
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

  return (
    <div className="app-container">
      <h1 className="survey-title">Ottawa Area User Experience Survey</h1>

      <form>
        {/* 所有表单部分组件，传递必要的props */}
        <BasicInfo 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <ServiceTypes 
          formData={formData} 
          handleCheckboxChange={handleCheckboxChange} 
        />
        
        <ProblemFrequency 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <TimeConsumption 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <AbandonmentBehavior 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <ProblemImpact 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <CopingStrategies 
          formData={formData} 
          handleCheckboxChange={handleCheckboxChange} 
        />
        
        <DecisionImpact 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <IndustryProblems 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <SolutionAcceptance 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <SpecificCase 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <ContactInfo 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        {/* 提交部分 */}
        <div className="submit-section">
          <h2>Submit Survey</h2>
          <div className="submit-content">
            <p className="submit-note">
              Before submitting, please make sure you have completed all required sections.
            </p>
            <p className="submit-help">
              Your responses are valuable to our research and will help improve local service websites in Ottawa.
            </p>
          
            <button
              type="button"
              onClick={submitFormData}
              disabled={isSubmitting}
              className={`btn ${isSubmitting ? 'btn-secondary' : 'btn-primary'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;