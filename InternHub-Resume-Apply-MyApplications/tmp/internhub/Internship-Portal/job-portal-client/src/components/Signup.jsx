import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config";

const Signup = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/");
    } catch (err) {
      setError(err.message || "Google signup failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card signup-card">
        <Link to="/" className="auth-logo">InternHub</Link>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join InternHub and discover jobs and internships.</p>

        <form onSubmit={handleSignup} className="auth-form">
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required />

          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required />

          {error && <div className="auth-error">{error}</div>}
          <button className="auth-primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-divider"><span>OR</span></div>
        <button className="google-btn" type="button" onClick={handleGoogleSignup}>Sign up with Google</button>

        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        <Link to="/" className="back-home">← Back to InternHub</Link>
      </div>
    </div>
  );
};

export default Signup;
