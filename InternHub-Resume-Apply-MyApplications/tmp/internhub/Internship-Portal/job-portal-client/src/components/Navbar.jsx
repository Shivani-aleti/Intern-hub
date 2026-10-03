import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBarsStaggered,
  FaXmark,
  FaBell,
  FaBriefcase,
} from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/?type=job", title: "Jobs" },
    { path: "/?type=internship", title: "Internships" },
    { path: "/salary", title: "Salary" },
    { path: "/my-applications", title: "My Applications" },
    { path: "/resume", title: "Resume" },
  ];

  return (
    <header className="site-header">
      <nav className="navbar">

        <Link to="/" className="brand">
          <span className="brand-icon">
            <FaBriefcase />
          </span>

          <span className="brand-text">
            <strong>InternHub</strong>
            <small>Jobs & Internships</small>
          </span>
        </Link>

        <div className="desktop-nav">
          {navItems.map(({ path, title }) => (
            <NavLink
              key={title}
              to={path}
              className={({ isActive }) =>
                isActive && title === "Home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {title}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">

          <button className="notification-btn" type="button">
            <FaBell />
            <span></span>
          </button>

          <Link to="/login" className="login-btn">
            Log in
          </Link>

          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>

        </div>

        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaXmark /> : <FaBarsStaggered />}
        </button>

      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">

          {navItems.map(({ path, title }) => (
            <NavLink
              key={title}
              to={path}
              onClick={() => setIsMenuOpen(false)}
            >
              {title}
            </NavLink>
          ))}

          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>

        </div>
      )}

    </header>
  );
};

export default Navbar;