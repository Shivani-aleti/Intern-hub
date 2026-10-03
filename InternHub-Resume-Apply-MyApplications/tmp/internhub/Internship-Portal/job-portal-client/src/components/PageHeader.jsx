import React from 'react';

const PageHeader = ({ title, path }) => {
  return (
    <div className='py-24 mt-3 rounded flex items-center justify-center relative'>
      {/* Blur effect overlay */}
      <div className='absolute inset-0 bg-dk opacity-50 backdrop-filter backdrop-blur-md'></div>

      <div className='relative z-10'>
        <h2 className='text-3xl text-green font-medium mb-1 text-center'>{title}</h2>
        <p className='text-green text-sm text-center'> <a href="/">Home</a> / {path}</p>
      </div>
    </div>
  );
}

export default PageHeader;