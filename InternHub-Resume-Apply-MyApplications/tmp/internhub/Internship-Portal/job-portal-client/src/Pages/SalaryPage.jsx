import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then(res => res.json())
      .then(data => setSalary(data));
  }, [searchText]);

  const handleSearch = () => {
    const filter = salary.filter(
      (job) => job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setSalary(filter);
  };

  return (
    <div className='text-ly max-w-screen-2x1 container mx-auto x1:px-24 px-4'>
      <PageHeader title={"Estimate Salary"} path={"Salary"} />

      <div className='mt-5 '>
      <div className='search-box p-2 text-center mb-2 flex justify-center items-center md:flex-row flex-col md:gap-4 gap-4'>
      <input
            type="text"
            name="search"
            id="search"
            placeholder='what is your expected salary?'
            className='placeholder:text-ly blur-box py-2 pl-3 border bg-transparent focus:outline-none lg:w-6/12 mb-4 w-full '
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className='bg-green text-dk font-semibold px-8 py-2 rounded-sm mb-4'
          >
            Search
          </button>
        </div>
      </div>

      {/* Salary display card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
        {salary.map((data) => (
          <div key={data.id} className='relative'>
            {/* Blur box */}
            <div className='absolute inset-0 bg-dk opacity-50 backdrop-filter backdrop-blur-md'></div>
            {/* Salary card content */}
            <div className='shadow px-9 py-8 relative z-10'>
              <h4 className='font-semibold text-xl text-ly'>{data.title}</h4>
              <p className='my-2 font-medium text-green text-lg'>{data.salary}</p>
              <div className='flex flex-wrap gap-4'>
                <a href="/" className='underline text-ly'>{data.status}</a>
                <a href="/" className='underline text-ly'>{data.skills}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalaryPage;
