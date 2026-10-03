import React from "react";
import { FiSearch, FiMapPin, FiBriefcase } from "react-icons/fi";

const Banner = ({ query, handleInputChange }) => {
  return (
    <section className="hero-section">

      <div className="hero-content">

        <div className="hero-badge">
          🚀 Find opportunities that match your skills
        </div>

        <h1>
          Find Your Next <span>Opportunity</span>
        </h1>

        <p>
          Discover internships and jobs from companies looking for
          talented students and fresh graduates.
        </p>

        <div className="search-box">

          <div className="search-field">
            <FiSearch />

            <input
              type="text"
              placeholder="Job title, skill or company"
              value={query}
              onChange={handleInputChange}
            />
          </div>

          <div className="search-field">
            <FiMapPin />

            <input
              type="text"
              placeholder="Location"
            />
          </div>

          <div className="search-field">
            <FiBriefcase />

            <select defaultValue="">
              <option value="" disabled>
                Job Type
              </option>

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>
          </div>

          <button className="search-btn" type="button">
            <FiSearch />
            Search
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <strong>10K+</strong>
            <span>Jobs</span>
          </div>

          <div>
            <strong>5K+</strong>
            <span>Internships</span>
          </div>

          <div>
            <strong>2K+</strong>
            <span>Companies</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;