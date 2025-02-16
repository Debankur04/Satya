"use client";
import React from 'react';
import { useState, useRef } from 'react';
import { Link, Image, Video, Send, AlertCircle, Clock } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import "./style.css";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Page = () => {
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState({ image: null, video: null });
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  const fileRefs = { image: useRef(null), video: useRef(null) };

  const uploadToFirebase = async (file, type) => {
    const filename = `${type}s/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const checkFact = async (query) => {
    const response = await axios.get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search`,
      {
        params: {
          query,
          key: process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_FACT_CHECK_API_KEY,
        },
      }
    );
    return response.data;
  };

  const analyzeTextWithDistilBERT = async (text) => {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      { inputs: text },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_HUGGINGFACE_API_KEY}`,
        },
      }
    );
    return response.data;
  };

  const analyzeImageWithReplicate = async (imageUrl) => {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "your-model-version",
        input: { image: imageUrl },
      },
      {
        headers: {
          'Authorization': `Token ${process.env.NEXT_PUBLIC_FIREBASE_REPLICATE_API_KEY}`,
        },
      }
    );
    return response.data;
  };

  const analyzeSightEngine = async (imageUrl) => {
    const response = await axios.get('https://api.sightengine.com/1.0/check.json', {
      params: {
        url: imageUrl,
        api_user: process.env.NEXT_PUBLIC_FIREBASE_SIGHTENGINE_USER,
        api_secret: process.env.NEXT_PUBLIC_FIREBASE_SIGHTENGINE_SECRET,
        models: 'manipulations',
      },
    });
    return response.data;
  };

  const detectDeepfake = async (videoUrl) => {
    const response = await axios.post(
      'https://api-us.faceplusplus.com/facepp/v3/detect',
      {
        api_key: process.env.NEXT_PUBLIC_FIREBASE_FACEPP_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_FIREBASE_FACEPP_API_SECRET,
        image_url: videoUrl,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);
    const results = { text: null, image: null, video: null };

    try {
      if (url) {
        const [factCheckResult, distilBERTResult] = await Promise.all([
          checkFact(url),
          analyzeTextWithDistilBERT(url)
        ]);
        results.text = {
          factCheck: factCheckResult,
          aiAnalysis: distilBERTResult
        };
      }

      if (files.image) {
        const imageUrl = await uploadToFirebase(files.image, 'image');
        const [replicateResult, sightEngineResult] = await Promise.all([
          analyzeImageWithReplicate(imageUrl),
          analyzeSightEngine(imageUrl)
        ]);
        results.image = {
          replicate: replicateResult,
          sightEngine: sightEngineResult
        };
      }

      if (files.video) {
        const videoUrl = await uploadToFirebase(files.video, 'video');
        const deepfakeResult = await detectDeepfake(videoUrl);
        results.video = deepfakeResult;
      }

      setAnalysisResults(results);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Analysis Error:', error);
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#B3B3B3]'>
      <div className="container">
        <h2>News Analysis Detection</h2>
        
        <form onSubmit={handleSubmit}>
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
              <input 
                type="file" 
                ref={fileRefs.image} 
                onChange={(e) => handleFileChange('image', e)} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            <div className="file-group">
              <button type="button" onClick={() => fileRefs.video.current?.click()} className="file-button">
                <Video size={20} />
                {files.video ? files.video.name : 'Upload Video'}
              </button>
              <input 
                type="file" 
                ref={fileRefs.video} 
                onChange={(e) => handleFileChange('video', e)} 
                accept="video/*" 
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isAnalyzing}>
            <Send size={20} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className={`analysis-status ${isAnalyzing || showAnalysis ? 'expanded' : ''}`}>
          {isAnalyzing ? (
            <div className="analyzing">
              <Clock size={20} className="spinning" />
              Analysis in progress...
            </div>
          ) : showAnalysis && analysisResults ? (
            <div className="results">
              {analysisResults.text && (
                <div className="analysis-details">
                  <h3>Text Analysis Results:</h3>
                  <div className="result-item">
                    <strong>Fact Check:</strong>
                    {analysisResults.text.factCheck?.claims?.[0]?.claimReview?.[0]?.textualRating || 'Not available'}
                  </div>
                  <div className="result-item">
                    <strong>AI Analysis:</strong>
                    {analysisResults.text.aiAnalysis?.[0]?.label || 'Not available'}
                  </div>
                </div>
              )}

              {analysisResults.image && (
                <div className="analysis-details">
                  <h3>Image Analysis Results:</h3>
                  <div className="result-item">
                    <strong>Manipulation:</strong>
                    {analysisResults.image.sightEngine?.manipulated ? 'Manipulated' : 'Original'}
                  </div>
                  <div className="result-item">
                    <strong>AI Generated:</strong>
                    {analysisResults.image.replicate?.output || 'Unknown'}
                  </div>
                </div>
              )}

              {analysisResults.video && (
                <div className="analysis-details">
                  <h3>Video Analysis Results:</h3>
                  <div className="result-item">
                    <strong>Deepfake Detection:</strong>
                    {analysisResults.video.faces?.[0]?.attributes?.fake ? 'Deepfake Detected' : 'No Deepfake Detected'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="idle">
              <AlertCircle size={16} />
              Submit content for analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;