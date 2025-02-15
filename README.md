
# **Satya – AI-Powered Misinformation Detector**  
🛡️ **Detect Fake News, Deepfakes, and Misinformation Using AI**  

## **📌 Overview**  
**Satya** is an AI-powered tool designed to **detect and combat misinformation** in **news articles, images, and videos**. It integrates **fact-checking APIs, deepfake detection models, and a Chrome extension** to provide real-time verification of online content.  

🔹 **Web App** – Enter news text, URLs, or upload images/videos for credibility analysis.  
🔹 **Chrome Extension** – Flags fake news while browsing by changing site colors.  
🔹 **AI-Based Analysis** – Uses NLP, OpenCV, and deep learning to detect misinformation.  
🔹 **User Reporting System** – Allows users to report suspicious content.  
🔹 **Gamified Learning** – Teaches users how to identify misinformation.  

---

## **🚀 Features**  
✅ **Real-Time Fake News Detection** (Text & URL-based verification)  
✅ **Fake Image & Deepfake Detection** 
✅ **Trust Score System** (🟥 Fake, 🟨 Likely Fake/True, 🟩 True)  
✅ **Chrome Extension** (Detects misinformation while browsing)  
✅ **User Reporting System** (Crowdsourced fact-checking)  
✅ **Gamified Learning** (Earn points & learn misinformation detection)  
✅ **Fact-Checking API Integration** (Google Fact Check, Snopes, PolitiFact)  

---

## **🔧 Tech Stack**  
### **Frontend (Web App & Chrome Extension)**  
- **Next.js** – Web framework   
- **Chrome Extension (Manifest V3 + Content Scripts)**  

### **Backend (APIs & Data Processing)**  
- **Next.js** - Used to create api

### **AI & ML Models**  
- **DistilBERT (Hugging Face)** – Fake news classification  
- **Replicate** – Fake image detection  
- **Google Reverse Image Search API** – Identify manipulated images  
- **Faceapp API** – Deepfake video detection  

---

## **🛠️ Installation & Setup**  

### **🔹 1. Clone the Repository**  
```sh  
git clone https://github.com/debankur04/satya.git  
cd satya  
```

### **🔹 2. Install Dependencies**  
```sh  
npm install  
```

### **🔹 3. Set Up Firebase**  
- Create a **Firebase project**  
- Add your **API keys** to `.env.local`  
```
NEXT_PUBLIC_FIREBASE_APIKEY: "your_api_key",
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: "your_api_key",
NEXT_PUBLIC_FIREBASE_PROJECTID: "your_api_key",
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET: "our_api_key",
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID: "your_api_key",
NEXT_PUBLIC_FIREBASE_APPID: "your_api_key",

NEXT_PUBLIC_FIREBASE_GOOGLE_FACT_CHECK_API_KEY= "your_api_key",
NEXT_PUBLIC_FIREBASE_HUGGINGFACE_API_KEY= "your_api_key",

NEXT_PUBLIC_FIREBASE_REPLICATE_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_SIGHTENGINE_USER = "your_api_key"
NEXT_PUBLIC_FIREBASE_SIGHTENGINE_SECRET = "your_api_key"
NEXT_PUBLIC_FIREBASE_FACEPP_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_FACEPP_API_SECRET = "your_api_key"  
```

### **🔹 4. Run the Development Server**  
```sh  
npm run dev  
```
The project will be available at **`http://localhost:3000`**  

---

## **🌐 API Endpoints**  
| **Endpoint** | **Method** | **Description** |  
|-------------|-----------|----------------|  
| `/api/analyze-text` | `POST` | Analyzes news text for fake content |  
| `/api/fact-check` | `GET` | Cross-checks news with fact-check databases |  
| `/api/ela` | `POST` | Detects manipulated images using ELA |  
| `/api/deepfake` | `POST` | Detects deepfake videos |  
| `/api/audio-forensics` | `POST` | Identifies AI-generated voice clips |  

---

## **🎯 How It Works**  
1️⃣ **User enters a news URL, text, or uploads an image/video**  
2️⃣ **SatyaDrishti analyzes the content using AI models**  
3️⃣ **Displays credibility score (Red/Yellow/Green)**  
4️⃣ **Users can report suspicious content for fact-checking**  
5️⃣ **Gamified learning module helps users improve misinformation detection skills**  

---

## **🛠️ Future Enhancements**  
🔹 **Multi-Language Support** – Fake news detection in Hindi, Spanish, etc.  
🔹 **Social Media Integration** – Detect misinformation in Twitter, Facebook posts.  
🔹 **Blockchain for Fact-Checking** – Immutable verification records.  
🔹 **AI Chatbot for News Verification** – Users can ask AI if news is real or fake.  

---

## **🤝 Contributing**  
We welcome contributions! 🚀  
1. Fork the repo  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added feature"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Open a Pull Request  

---

## **📜 License**  
This project is licensed under **MIT License**.  

---

## **💡 Authors & Acknowledgments**  
- **Team Ashwamedh**  
- Built for **Exabyte**  
- Team Members - > [Debankur Dutta](https://github.com/Debankur04), [Anuska Kapuria](https://github.com/Anuska1312), [Shinjan Kundu](https://github.com/Galahad19) 
---

## **🙏 Thank You!**  
If you like this project, ⭐ **star the repo** and share it! 🚀  

