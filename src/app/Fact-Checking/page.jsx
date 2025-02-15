"use client";
import "./style.css";

// pages/partnerships.js
import { useState } from 'react';
import { Shield, Database, FileCheck, Send } from 'lucide-react';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    website: '',
    description: ''
  });

  const partners = [
    { name: 'Snopes', logo: '/api/placeholder/100/100', apiStatus: 'Active' },
    { name: 'PolitiFact', logo: '/api/placeholder/100/100', apiStatus: 'Active' },
    { name: 'Google Fact Check', logo: '/api/placeholder/100/100', apiStatus: 'Active' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="container">
      <header>
        <h1>Fact-Checking Partnerships</h1>
        <p>Powering AI with verified truth</p>
      </header>

      <section className="partners-section">
        <h2><Shield size={24} /> Trusted Partners</h2>
        <div className="partners-grid">
          {partners.map(partner => (
            <div key={partner.name} className="partner-card">
              <img src={partner.logo} alt={partner.name} />
              <h3>{partner.name}</h3>
              <span className="api-status">API Status: {partner.apiStatus}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ai-integration">
        <h2><Database size={24} /> How AI Uses This Data</h2>
        <div className="integration-cards">
          <div className="integration-card">
            <FileCheck size={32} />
            <h3>Verified Sources</h3>
            <p>AI models trained on fact-checked data from trusted partners</p>
          </div>
          <div className="integration-card">
            <Shield size={32} />
            <h3>Real-time Verification</h3>
            <p>Direct API integration for live fact-checking</p>
          </div>
        </div>
      </section>

      <section className="partnership-form">
        <h2><Send size={24} /> Submit Partnership Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              value={formData.organization}
              onChange={e => setFormData({...formData, organization: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={e => setFormData({...formData, website: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>About Your Organization</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </section>
    </div>
  );
}