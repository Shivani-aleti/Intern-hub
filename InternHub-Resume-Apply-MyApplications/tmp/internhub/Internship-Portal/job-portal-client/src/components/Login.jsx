import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth
} from "firebase/auth";
import app from "../firebase/firebase.config";

const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to log in. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/");
    } catch (err) {
      setError(err.message || "Google login failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">InternHub</Link>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue to your InternHub account.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />

          {error && <div className="auth-error">{error}</div>}
          <button className="auth-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-divider"><span>OR</span></div>
        <button className="google-btn" type="button" onClick={handleGoogleLogin}>Continue with Google</button>

        <p className="auth-switch">Don't have an account? <Link to="/signup">Create an account</Link></p>
        <Link to="/" className="back-home">← Back to InternHub</Link>
      </div>
    </div>
  );
};

export default Login;
