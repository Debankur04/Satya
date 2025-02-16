"use client";
import { useState } from 'react';
import { Timer, Award, Crown, Star } from 'lucide-react';
import "./style.css";

export default function QuizApp() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "Which social media platform has the strongest fact-checking policy?",
      options: ["TweetBook", "InstaTok", "FactCheck+", "SocialMedia Pro"],
      correct: 2,
      explanation: "FactCheck+ implements AI-powered real-time verification."
    },
    // Add more questions as needed
  ];

  const leaderboard = [
    { username: "TruthSeeker", points: 980, rank: 1 },
    { username: "FactMaster", points: 850, rank: 2 },
    { username: "InfoHunter", points: 720, rank: 3 },
    { username: "NewsGuru", points: 650, rank: 4 },
    { username: "MediaPro", points: 580, rank: 5 },
    { username: "DataSleuth", points: 490, rank: 6 },
    { username: "InfoSage", points: 420, rank: 7 }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 10);
    }
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#b3b3b3]'>
    <div className="container">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 'quiz' ? (
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="timer">
              <Timer size={20} />
              Time: 2:30
            </div>
            <div className="score">
              <Award size={20} />
              Score: {score}
            </div>
          </div>

          <div className="question-container">
            <h2>Question {currentQuestion + 1}/10</h2>
            <p>{questions[currentQuestion].question}</p>

            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`option ${
                    selectedAnswer !== null && index === questions[currentQuestion].correct ? 'correct' : ''
                  } ${
                    selectedAnswer === index && index !== questions[currentQuestion].correct ? 'wrong' : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="explanation">
                <p>{questions[currentQuestion].explanation}</p>
              </div>
            )}

            <button className="reset-button" onClick={resetQuiz}>
              Restart Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="leaderboard-container">
          <h2><Crown size={24} /> Top Performers</h2>
          <div className="podium">
        {/* Top 3 Podium */}
        <div className="top-three">
          <div className="podium-place second">
            <Crown size={20} className="medal silver" />
            <div className="player-info">
              <span className="username">{leaderboard[1].username}</span>
              <span className="points">{leaderboard[1].points} pts</span>
            </div>
            <div className="platform silver">2</div>
          </div>
          <div className="podium-place first">
            <Crown size={24} className="medal gold" />
            <div className="player-info">
              <span className="username">{leaderboard[0].username}</span>
              <span className="points">{leaderboard[0].points} pts</span>
            </div>
            <div className="platform gold">1</div>
          </div>
          <div className="podium-place third">
            <Crown size={20} className="medal bronze" />
            <div className="player-info">
              <span className="username">{leaderboard[2].username}</span>
              <span className="points">{leaderboard[2].points} pts</span>
            </div>
            <div className="platform bronze">3</div>
          </div>
        </div>
        
        {/* Rest of leaderboard */}
        <div className="other-ranks">
          {leaderboard.slice(3).map((player, index) => (
            <div key={player.rank} className="rank-item">
              <span className="rank-number">{player.rank}</span>
              <span className="username">{player.username}</span>
              <span className="points">{player.points} pts</span>
            </div>
          ))}
        </div>
      </div>
        </div>
      )}

      
    </div>
    </div>
  );
}