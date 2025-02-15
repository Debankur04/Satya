"use client";
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import "./style.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/main_page"); // Redirect on success
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/main_page");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-btn">Log in</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">Log in with Google</button>
      </div>
    </div>
  );
};

export default SignInPage;
