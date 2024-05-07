
import React from 'react';


function AboutView() {
  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Computer Science 319</h1>
        <h3 className="text-xl text-gray-700">Construction of User Interfaces</h3>
        <h4 className="text-lg mt-2 text-gray-600">
          Instructed by <strong>Ali Jannesari</strong>
        </h4>
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Authors</h1>
          <h4 className="text-lg text-gray-600">April 19th, 2024</h4>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Noah J. Hall</h2>
          <a
            href="https://redfang110.github.io/personal/index.html"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            about
          </a>
          <p className="text-gray-700">hall0928@iastate.edu</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Esha Gadgil</h2>
          <a
            href="https://egadgil.github.io/personal/Activity4/index.html"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            about
          </a>
          <p className="text-yellow-700">eagadgil@iastate.edu</p>
        </div>
      </div>

      <div>
        <p className="text-gray-700">This project is a website developed using React, MongoDB, Express, and Nodejs.</p>
        <p className="text-gray-700">The purpose of this project is to showcase a functioning CRUD API with a good user experience.</p>
      </div>
    </div>
  );
}

export default AboutView;
