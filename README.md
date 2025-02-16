# SatyaDrishti – AI-Powered Misinformation Detector

🛡️ Detect Fake News, Deepfakes, and Misinformation Using AI

## 📌 Overview
SatyaDrishti is an AI-powered tool designed to detect and combat misinformation in news articles, images, and videos. It integrates fact-checking APIs, deepfake detection models, and a Chrome extension to provide real-time verification of online content.

### 🔹 Features
- **Web App** – Enter news text, URLs, or upload images/videos for credibility analysis.
- **Chrome Extension** – Flags fake news while browsing by changing site colors.
- **AI-Based Analysis** – Uses NLP, OpenCV, and deep learning to detect misinformation.
- **User Reporting System** – Allows users to report suspicious content.
- **Gamified Learning** – Teaches users how to identify misinformation.

### 🚀 Key Functionalities
✅ Real-Time Fake News Detection (Text & URL-based verification)  
✅ Fake Image & Deepfake Detection  
✅ Trust Score System (🟥 Fake, 🟨 Likely Fake/True, 🟩 True)  
✅ Chrome Extension (Detects misinformation while browsing)  
✅ User Reporting System (Crowdsourced fact-checking)  
✅ Gamified Learning (Earn points & learn misinformation detection)  
✅ Fact-Checking API Integration (Google Fact Check, Snopes, PolitiFact)  

---
## 🔧 Tech Stack

### **Frontend (Web App & Chrome Extension)**
- **Next.js** – Web framework
- **Chrome Extension** (Manifest V3 + Content Scripts)

### **Backend (APIs & Data Processing)**
- **Next.js** – Used to create API endpoints
- **Vercel Serverless Functions** – Host API endpoints
- **Firebase Firestore** – Store user-reported misinformation cases, videos, links, and reports
- **PostgreSQL (Neon) + Prisma** – Store user information and game leaderboard

### **AI & ML Models**
- **DistilBERT (Hugging Face)** – Fake news classification
- **OpenCV + ELA** – Fake image detection
- **Google Reverse Image Search API** – Identify manipulated images
- **FaceForensics++** – Deepfake video detection
- **ResNet Audio Forensics** – AI-generated voice detection

---
## 🛠️ Installation & Setup

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/debankur04/satyadrishti.git  
cd satyadrishti  
```

### 🔹 2. Install Dependencies
```bash
npm install  
```

### 🔹 3. Set Up Environment Variables
Create a `.env.local` file and add the required API keys:
```env
NEXT_PUBLIC_FIREBASE_APIKEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN="your_api_key"
NEXT_PUBLIC_FIREBASE_PROJECTID="your_api_key"
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET="your_api_key"
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID="your_api_key"
NEXT_PUBLIC_FIREBASE_APPID="your_api_key"

NEXT_PUBLIC_GOOGLE_FACT_CHECK_API_KEY="your_api_key"
NEXT_PUBLIC_HUGGINGFACE_API_KEY="your_api_key"
NEXT_PUBLIC_REVERSE_IMAGE_API_KEY="your_api_key"
NEXT_PUBLIC_FACEFORENSICS_API_KEY="your_api_key"
NEXT_PUBLIC_RESNET_AUDIO_API_KEY="your_api_key"
```

### 🔹 4. Run the Development Server
```bash
npm run dev  
```
The project will be available at [http://localhost:3000](http://localhost:3000)

---
## 🌐 API Endpoints

| Endpoint                 | Method | Description                                        |
|--------------------------|--------|----------------------------------------------------|
| `/api/analyze_text`      | POST   | Detects fake news in text using AI                |
| `/api/fact_check`        | GET    | Cross-checks news credibility with databases      |
| `/api/deepfake`         | POST   | Detects deepfake videos using FaceForensics++    |
| `/api/image-tampering`  | POST   | Identifies manipulated images using OpenCV + ELA  |
| `/api/reverse_image`    | POST   | Performs Google Reverse Image Search             |
| `/api/ai-image`         | POST   | AI-based fake image detection                     |
| `/api/geturls`          | GET    | Retrieves stored URLs for analysis               |
| `/api/storeurl`        | POST   | Saves URLs to Firestore/PostgreSQL               |
| `/api/upload`          | POST   | Uploads images/videos for verification           |

---
## 🎯 How It Works
1️⃣ User enters a news URL, text, or uploads an image/video  
2️⃣ **SatyaDrishti** analyzes the content using AI models  
3️⃣ Displays credibility score (**Red/Yellow/Green**)  
4️⃣ Users can report suspicious content for fact-checking  
5️⃣ Gamified learning module helps users improve misinformation detection skills  

---
## 🛠️ Future Enhancements

🔹 **Multi-Language Support** – Fake news detection in Hindi, Spanish, etc.  
🔹 **Social Media Integration** – Detect misinformation in Twitter, Facebook posts.  
🔹 **Blockchain for Fact-Checking** – Immutable verification records.  
🔹 **AI Chatbot for News Verification** – Users can ask AI if news is real or fake.  

---
## 🤝 Contributing
We welcome contributions! 🚀  

1. Fork the repo  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Added feature"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request  

---
## 📜 License
This project is licensed under the **MIT License**.

---
## 💡 Authors & Acknowledgments
**Team Ashwamedh**  
Built for **Exabyte**  
**Team Members:**  
- **Debankur Dutta**  
- **Anuska Kapuria**  
- **Shinjan Kundu**  

🙏 **Thank You!**  
If you like this project, ⭐ star the repo and share it! 🚀

