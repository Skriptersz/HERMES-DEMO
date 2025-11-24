import { useState } from 'react';
import Stepper, { Step } from './components/Stepper';
import './App.css';

const countryCodes = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
];

const units = [
  { id: 1, name: 'Dubai Marina 2BR', price: 'AED 2.5M', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Downtown Dubai 3BR Penthouse', price: 'AED 5.8M', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Palm Jumeirah Villa', price: 'AED 12M', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Jumeirah Beach Residence 1BR', price: 'AED 1.8M', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Business Bay 2BR', price: 'AED 2.2M', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Burj Khalifa View 4BR', price: 'AED 8.5M', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80' },
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+971',
    phone: '',
    selectedUnit: null,
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const salesforceData = {
        FirstName: formData.name.split(' ')[0],
        LastName: formData.name.split(' ').slice(1).join(' ') || 'N/A',
        Email: formData.email,
        Phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : '',
        Property_Interest__c: formData.selectedUnit?.name || 'Not specified',
        Budget__c: formData.budget,
        Description: formData.message,
        LeadSource: 'Website',
      };

      console.log('Submitting to Salesforce:', salesforceData);

      const response = await fetch('/.netlify/functions/salesforce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salesforceData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit to Salesforce');
      }

      console.log('Lead created successfully:', result.leadId);

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting to Salesforce:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <div className="background-overlay"></div>

      <div className="content-wrapper">
        <div className="header-section">
          <div className="logo-container">
            <img
              src="https://d3ub3p1ffv8f0a.cloudfront.net/wp-content/uploads/2023/01/hermes-logo-original.webp"
              alt="Hermes Real Estate"
              className="logo"
            />
          </div>
          <h1 className="main-title">Discover Your Dream Property</h1>
          <p className="subtitle">Luxury Real Estate in Dubai's Most Prestigious Locations</p>
        </div>

        <div className="stepper-container">
          <Stepper
            initialStep={1}
            onFinalStepCompleted={handleSubmit}
            backButtonText="Previous"
            nextButtonText="Next Step"
          >
            <Step>
              <div className="step-content">
                <h2 className="step-title">Welcome to Hermes Real Estate</h2>
                <p className="step-description">
                  Let us help you find the perfect property in Dubai. Our exclusive portfolio features
                  premium properties in the most sought-after locations.
                </p>
                <div className="welcome-features">
                  <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <h3>Premium Properties</h3>
                    <p>Handpicked luxury residences in Dubai's most exclusive locations</p>
                  </div>
                  <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3>Expert Service</h3>
                    <p>Dedicated property consultants with deep market knowledge</p>
                  </div>
                  <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <h3>Prime Locations</h3>
                    <p>Properties in Marina, Downtown, Palm Jumeirah and beyond</p>
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="step-content">
                <h2 className="step-title">Your Information</h2>
                <p className="step-description">Please provide your contact details</p>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.smith@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-wrapper">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="country-code-select"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="50 123 4567"
                        className="phone-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select budget range</option>
                      <option value="1-2M">AED 1-2 Million</option>
                      <option value="2-5M">AED 2-5 Million</option>
                      <option value="5-10M">AED 5-10 Million</option>
                      <option value="10M+">AED 10+ Million</option>
                    </select>
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="step-content">
                <h2 className="step-title">Select Your Property</h2>
                <p className="step-description">Choose from our exclusive collection</p>
                <div className="units-grid">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      className={`unit-card ${formData.selectedUnit?.id === unit.id ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, selectedUnit: unit })}
                    >
                      <div className="unit-image-wrapper">
                        <img src={unit.image} alt={unit.name} className="unit-image" />
                        {formData.selectedUnit?.id === unit.id && (
                          <div className="unit-overlay">
                            <div className="selected-badge">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Selected
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="unit-info">
                        <h3 className="unit-name">{unit.name}</h3>
                        <p className="unit-price">{unit.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Step>

            <Step>
              <div className="step-content">
                <h2 className="step-title">Review & Submit</h2>
                <p className="step-description">Please review your information before submitting</p>

                <div className="summary-card">
                  <h3>Contact Information</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Name</span>
                      <span className="summary-value">{formData.name || 'Not provided'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Email</span>
                      <span className="summary-value">{formData.email || 'Not provided'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Phone</span>
                      <span className="summary-value">
                        {formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided'}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Budget</span>
                      <span className="summary-value">{formData.budget || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {formData.selectedUnit && (
                  <div className="summary-card">
                    <h3>Property Interest</h3>
                    <div className="selected-property">
                      <img src={formData.selectedUnit.image} alt={formData.selectedUnit.name} />
                      <div>
                        <h4>{formData.selectedUnit.name}</h4>
                        <p>{formData.selectedUnit.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="message">Additional Notes (Optional)</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any specific requirements, preferred viewing times, or questions..."
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </div>
            </Step>
          </Stepper>
        </div>

        {submitSuccess && (
          <div className="success-overlay">
            <div className="success-card">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 24L20 30L34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Thank You</h2>
              <p>Your inquiry has been submitted successfully.</p>
              <p>Our team will contact you within 24 hours.</p>
              <button
                className="success-button"
                onClick={() => window.location.reload()}
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        )}

        {isSubmitting && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Submitting to Salesforce...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
