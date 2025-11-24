import { useState, useRef, useEffect } from 'react';
import Stepper, { Step } from './components/Stepper';
import './App.css';

const countryCodes = [
  { code: '+971', country: 'UAE', iso: 'ae' },
  { code: '+966', country: 'Saudi Arabia', iso: 'sa' },
  { code: '+974', country: 'Qatar', iso: 'qa' },
  { code: '+973', country: 'Bahrain', iso: 'bh' },
  { code: '+968', country: 'Oman', iso: 'om' },
  { code: '+965', country: 'Kuwait', iso: 'kw' },
  { code: '+962', country: 'Jordan', iso: 'jo' },
  { code: '+961', country: 'Lebanon', iso: 'lb' },
  { code: '+20', country: 'Egypt', iso: 'eg' },
  { code: '+212', country: 'Morocco', iso: 'ma' },
  { code: '+216', country: 'Tunisia', iso: 'tn' },
  { code: '+1', country: 'USA', iso: 'us' },
  { code: '+1', country: 'Canada', iso: 'ca' },
  { code: '+44', country: 'UK', iso: 'gb' },
  { code: '+353', country: 'Ireland', iso: 'ie' },
  { code: '+33', country: 'France', iso: 'fr' },
  { code: '+49', country: 'Germany', iso: 'de' },
  { code: '+39', country: 'Italy', iso: 'it' },
  { code: '+34', country: 'Spain', iso: 'es' },
  { code: '+351', country: 'Portugal', iso: 'pt' },
  { code: '+31', country: 'Netherlands', iso: 'nl' },
  { code: '+32', country: 'Belgium', iso: 'be' },
  { code: '+41', country: 'Switzerland', iso: 'ch' },
  { code: '+43', country: 'Austria', iso: 'at' },
  { code: '+46', country: 'Sweden', iso: 'se' },
  { code: '+47', country: 'Norway', iso: 'no' },
  { code: '+45', country: 'Denmark', iso: 'dk' },
  { code: '+358', country: 'Finland', iso: 'fi' },
  { code: '+48', country: 'Poland', iso: 'pl' },
  { code: '+420', country: 'Czech Republic', iso: 'cz' },
  { code: '+30', country: 'Greece', iso: 'gr' },
  { code: '+90', country: 'Turkey', iso: 'tr' },
  { code: '+7', country: 'Russia', iso: 'ru' },
  { code: '+380', country: 'Ukraine', iso: 'ua' },
  { code: '+91', country: 'India', iso: 'in' },
  { code: '+92', country: 'Pakistan', iso: 'pk' },
  { code: '+880', country: 'Bangladesh', iso: 'bd' },
  { code: '+94', country: 'Sri Lanka', iso: 'lk' },
  { code: '+977', country: 'Nepal', iso: 'np' },
  { code: '+86', country: 'China', iso: 'cn' },
  { code: '+852', country: 'Hong Kong', iso: 'hk' },
  { code: '+81', country: 'Japan', iso: 'jp' },
  { code: '+82', country: 'South Korea', iso: 'kr' },
  { code: '+65', country: 'Singapore', iso: 'sg' },
  { code: '+60', country: 'Malaysia', iso: 'my' },
  { code: '+66', country: 'Thailand', iso: 'th' },
  { code: '+84', country: 'Vietnam', iso: 'vn' },
  { code: '+62', country: 'Indonesia', iso: 'id' },
  { code: '+63', country: 'Philippines', iso: 'ph' },
  { code: '+61', country: 'Australia', iso: 'au' },
  { code: '+64', country: 'New Zealand', iso: 'nz' },
  { code: '+27', country: 'South Africa', iso: 'za' },
  { code: '+234', country: 'Nigeria', iso: 'ng' },
  { code: '+254', country: 'Kenya', iso: 'ke' },
  { code: '+55', country: 'Brazil', iso: 'br' },
  { code: '+52', country: 'Mexico', iso: 'mx' },
  { code: '+54', country: 'Argentina', iso: 'ar' },
  { code: '+57', country: 'Colombia', iso: 'co' },
  { code: '+56', country: 'Chile', iso: 'cl' },
];

const getFlagUrl = (iso) => `https://flagcdn.com/24x18/${iso}.png`;

function CountryCodeSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const selected = countryCodes.find(c => c.code === value) || countryCodes[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="country-dropdown" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className="country-dropdown-trigger"
        onClick={handleToggle}
      >
        <img
          src={getFlagUrl(selected.iso)}
          alt={selected.country}
          className="flag-icon"
        />
        <span className="country-code">{selected.code}</span>
        <svg
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="country-dropdown-menu"
          style={{
            position: 'fixed',
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          {countryCodes.map((country, index) => (
            <button
              key={`${country.iso}-${index}`}
              type="button"
              className={`country-option ${country.code === value && country.iso === selected.iso ? 'selected' : ''}`}
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
            >
              <img
                src={getFlagUrl(country.iso)}
                alt={country.country}
                className="flag-icon"
              />
              <span className="country-name">{country.country}</span>
              <span className="country-code">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);

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
                      <CountryCodeSelect
                        value={formData.countryCode}
                        onChange={(code) => setFormData({ ...formData, countryCode: code })}
                      />
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
                      <span className="summary-value phone-summary">
                        {formData.phone ? (
                          <>
                            {selectedCountry && (
                              <img
                                src={getFlagUrl(selectedCountry.iso)}
                                alt={selectedCountry.country}
                                className="flag-icon-small"
                              />
                            )}
                            {formData.countryCode} {formData.phone}
                          </>
                        ) : 'Not provided'}
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
