import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-gray-700">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
