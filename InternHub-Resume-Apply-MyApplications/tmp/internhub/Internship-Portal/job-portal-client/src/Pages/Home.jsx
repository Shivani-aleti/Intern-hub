import React, { useEffect, useMemo, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import { FiSliders } from "react-icons/fi";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);

    fetch("/jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading jobs:", error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (query.trim()) {
      const search = query.toLowerCase();

      result = result.filter((job) =>
        [
          job.jobTitle,
          job.companyName,
          job.jobLocation,
          job.description,
          job.employmentType,
          job.experienceLevel,
        ]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(search)
          )
      );
    }

    if (selectedCategory) {
      result = result.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation?.toLowerCase() ===
            selectedCategory.toLowerCase() ||
          salaryType?.toLowerCase() ===
            selectedCategory.toLowerCase() ||
          experienceLevel?.toLowerCase() ===
            selectedCategory.toLowerCase() ||
          employmentType?.toLowerCase() ===
            selectedCategory.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          postingDate >= selectedCategory
      );
    }

    return result;
  }, [jobs, query, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / itemPerPage)
  );

  const visibleJobs = filteredJobs.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <main>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
      />

      <section className="jobs-section">

        <div className="mobile-filter-title">
          <FiSliders />
          <span>Filter Jobs</span>
        </div>

        <div className="filters-column">
          <div className="filter-card">
            <Sidebar
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </div>
        </div>

        <div className="jobs-column">

          <div className="jobs-header">
            <div>
              <span className="section-label">
                OPPORTUNITIES
              </span>

              <h2>Recommended Jobs</h2>

              <p>
                {filteredJobs.length} opportunities found
              </p>
            </div>

            <div className="sort-box">
              <span>Sort by</span>
              <select defaultValue="recent">
                <option value="recent">Most Recent</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-box">
              Loading opportunities...
            </div>
          ) : visibleJobs.length > 0 ? (
            <div className="job-list">
              {visibleJobs.map((job) => (
                <Card key={job.id} data={job} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>🔍</div>
              <h3>No jobs found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

          {visibleJobs.length > 0 && (
            <div className="pagination">

              <button
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

            </div>
          )}
        </div>

        <div className="sidebar-column">
          <Newsletter />
        </div>

      </section>
    </main>
  );
};

export default Home;
