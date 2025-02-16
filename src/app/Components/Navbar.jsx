import { AlertCircle } from 'lucide-react'
import React from 'react'
import "./style.css"


const navbar = () => {
  return (
    <header>
        <div className="logo">
        <AlertCircle size={24} />
        <span>TruthSeeker</span>
        </div>
        <nav>
            <a href="/" className="active">Home</a>
            <a href="/main_page">Analyze</a>
            <a href="/quiz">Quiz</a>
            <a href="/profile">Dashboard</a>
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
        </nav>
  </header>
  )
}

export default navbar