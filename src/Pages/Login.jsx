import { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = ({ showAlert }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = `${import.meta.env.VITE_APP_URL}/public/login`;

    try {
      setLoading(true);
      const response = await axios.post(url, formData);

      if (response.data) {
        sessionStorage.setItem("token", response.data);
        login();
        navigate("/");
        showAlert(`Welcome, ${formData.username}!`, "success");
      } else {
        throw new Error("Invalid response format. Token not found.");
      }
    } catch (error) {
      showAlert("Error logging into the account.", "danger");
    } finally {
      setLoading(false);
    }
  };

  // min-h-screen <---- previous class for login container

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 rounded-2xl overflow-hidden shadow-2xl">
        {/* Illustration Column */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 p-8 relative">
          {/* Abstract shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-20"></div>
          
          {/* Main illustration */}
          <div className="relative z-10 w-full max-w-md">
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <path d="M179.4 32.5c-48.5 0-87.7 39.2-87.7 87.7 0 48.5 39.2 87.7 87.7 87.7 48.5 0 87.7-39.2 87.7-87.7 0-48.5-39.2-87.7-87.7-87.7z" fill="#2A4365" />
              <path d="M179.4 47.5c-40.2 0-72.7 32.5-72.7 72.7 0 40.2 32.5 72.7 72.7 72.7 40.2 0 72.7-32.5 72.7-72.7 0-40.2-32.5-72.7-72.7-72.7z" fill="#3182CE" />
              <path d="M238.7 120.2c0 32.8-26.5 59.3-59.3 59.3s-59.3-26.5-59.3-59.3c0-32.8 26.5-59.3 59.3-59.3s59.3 26.5 59.3 59.3z" fill="#2C5282" />
              <path d="M168.9 79.3c-21.3 5.5-34.3 27.2-28.8 48.5 5.5 21.3 27.2 34.3 48.5 28.8 21.3-5.5 34.3-27.2 28.8-48.5-5.5-21.3-27.2-34.3-48.5-28.8z" fill="#63B3ED" />
              <path d="M129.5 180.3c-8.3 8.3-8.3 21.8 0 30.1l30.1 30.1c8.3 8.3 21.8 8.3 30.1 0l30.1-30.1c8.3-8.3 8.3-21.8 0-30.1l-30.1-30.1c-8.3-8.3-21.8-8.3-30.1 0l-30.1 30.1z" fill="#4299E1" />
              <path d="M300.7 140.6c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6z" fill="#2B6CB0" />
              <path d="M109.8 98.6c-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17l17 17c4.7 4.7 12.3 4.7 17 0l17-17c4.7-4.7 4.7-12.3 0-17l-17-17z" fill="#4299E1" />
              <path d="M129.5 60.6c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.3c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.1 3.1-8.2 0-11.3l-11.3-11.3z" fill="#63B3ED" />
            </svg>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-white">Welcome to SkillSync</h2>
            <p className="text-blue-200 mt-2">Find your perfect job match powered by AI</p>
          </div>
        </div>
        
        {/* Form Column */}
        <div className="bg-gray-800 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-300 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="username"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link to='/forgotpassword' className="text-sm font-medium text-blue-400 hover:text-blue-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition 
              ${loading ? "bg-blue-700 opacity-70 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;