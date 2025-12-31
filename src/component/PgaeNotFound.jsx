// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <AlertCircle className="w-20 h-20 text-red-500" />
          </div>
          <div className="absolute -top-4 -right-4">
            <span className="text-6xl font-bold text-gray-800 opacity-10">404</span>
          </div>
        </div>

        {/* Error Code & Message */}
        <div className="space-y-3">
          <div className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-2">
            ERROR CODE: 404
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Return to Login
          </Link>
          {/* <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
          >
            Go Back
          </button> */}
        </div>

      
      </div>
    </div>
  );
}