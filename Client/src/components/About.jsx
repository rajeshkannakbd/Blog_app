import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 text-center mb-6">
          About Our Blog App
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 text-center">
          Welcome to our <span className="font-semibold">Blog Application</span>, 
          a simple and user-friendly platform where you can create, share, and explore blogs.  
          Whether you want to express your thoughts, share knowledge, or read inspiring stories, 
          our app provides everything you need.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              ✍️ Create Blogs
            </h2>
            <p className="text-gray-600">
              Write and publish your blogs with Markdown support. Add images, tags, and set visibility options.
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              📖 Manage History
            </h2>
            <p className="text-gray-600">
              Access all your past blogs in the History section. Edit or delete them anytime with ease.
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              🔐 Secure Authentication
            </h2>
            <p className="text-gray-600">
              Register and log in securely. Your account and blogs are safely stored in our system.
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              📢 Google AdSense
            </h2>
            <p className="text-gray-600">
              The platform integrates ads to support free usage and ensure smooth performance for all users.
            </p>
          </div>
        </div>

        {/* Closing */}
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-8 text-center">
          Our mission is to build a space where ideas can be freely shared and creativity can thrive.  
          Start your blogging journey with us today 🚀
        </p>
      </div>
    </div>
  );
};

export default About;
