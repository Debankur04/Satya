"use client";
import React from 'react'
import { useState, useRef } from 'react';
import { Link, Image, Video, Send, AlertCircle, Clock } from 'lucide-react';
import "./style.css";

const page = () => {

  const [url, setUrl] = useState('');
  const [files, setFiles] = useState({ image: null, video: null });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileRefs = { image: useRef(null), video: useRef(null) };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  // Placeholder fake score (0-100)
  const fakeScore = 75;


  // async function checkFact(query) {
  //   const response = await fetch(`/api/fact-check?query=${encodeURIComponent(query)}`);
  //   const data = await response.json();
  //   console.log("Fact Check Result:", data);
  // }
  // async function analyzeText(text) {
  //   const response = await fetch("/api/analyze-text", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ text }),
  //   });
  
  //   const result = await response.json();
  //   console.log("AI Analysis Result:", result);
  // }
  // function searchImage(imageURL) {
  //   window.open(`/api/reverse-image?imageUrl=${encodeURIComponent(imageURL)}`, "_blank");
  // }
    
  

  return (
    <div className="container">
      <h2>News Analysis Detection</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Previous form inputs remain same */}
        <div className="input-group">
          <Link size={20} />
          <input
            type="url"
            placeholder="Enter URL to analyze"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="file-inputs">
          <div className="file-group">
            <button type="button" onClick={() => fileRefs.image.current?.click()} className="file-button">
              <Image size={20} />
              {files.image ? files.image.name : 'Upload Image'}
            </button>
            <input type="file" ref={fileRefs.image} onChange={(e) => handleFileChange('image', e)} accept="image/*" style={{ display: 'none' }} />
          </div>

          <div className="file-group">
            <button type="button" onClick={() => fileRefs.video.current?.click()} className="file-button">
              <Video size={20} />
              {files.video ? files.video.name : 'Upload Video'}
            </button>
            <input type="file" ref={fileRefs.video} onChange={(e) => handleFileChange('video', e)} accept="video/*" style={{ display: 'none' }} />
          </div>
        </div>

        <button type="submit" className="submit-button">
          <Send size={20} />
          Analyze Content
        </button>
      </form>

      <div className={`analysis-status ${isAnalyzing || showAnalysis ? 'expanded' : ''}`}>
        {isAnalyzing ? (
          <div className="analyzing">
            <Clock size={20} className="spinning" />
            Analysis in progress...
          </div>
        ) : showAnalysis ? (
          <div className="results">
            <div className="meter-container">
              <div className="meter-label">
                <AlertCircle size={20} />
                Likelihood of Misinformation
              </div>
              <div className="meter">
                <div 
                  className="meter-fill" 
                  style={{ 
                    width: `${fakeScore}%`,
                    background: `linear-gradient(to right, #4CAF50, #FFC107, #FF5252)`
                  }}
                />
                <span className="meter-value">{fakeScore}%</span>
              </div>
            </div>
            <div className="analysis-details">
              <h3>Why this might be misleading:</h3>
              <ul>
                <li>Inconsistent source attribution</li>
                <li>Manipulated visual elements detected</li>
                <li>Claims contradict verified databases</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="idle">
            <AlertCircle size={16} />
            Submit content for analysis
          </div>
        )}
      </div>

      
    </div>
  )
}

export default page