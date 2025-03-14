import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ showAlert }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  // Username validation states
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [usernameMessage, setUsernameMessage] = useState('');

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasNumber: false
  });

  // Form validation state
  const [isFormValid, setIsFormValid] = useState(false);

  // Debounce timer for username check
  const [usernameTimer, setUsernameTimer] = useState(null);

  // Check username availability with the updated endpoint
  const checkUsernameAvailability = async (username) => {
    if (!username || username.length < 3) {
      setIsUsernameAvailable(null);
      setUsernameMessage('Username must be at least 3 characters');
      return;
    }

    setIsCheckingUsername(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/public/exist`, {
        params: { username: username }
      });

      // API now returns "yes" if username exists, "no" if available
      const exists = response.data === "yes";
      setIsUsernameAvailable(!exists);
      setUsernameMessage(exists ? 'Username is already taken' : 'Username is available');
    } catch (error) {
      console.error("Error checking username:", error);
      setIsUsernameAvailable(null);
      setUsernameMessage('Error checking username');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Handle username input with debounce
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setFormData({ ...formData, username: newUsername });

    // Clear any existing timer
    if (usernameTimer) {
      clearTimeout(usernameTimer);
    }

    // Only check availability if username has at least 3 characters
    if (newUsername.length >= 3) {
      setIsCheckingUsername(true);
      // Set a new timer to call the API after 500ms of user stopping typing
      const timer = setTimeout(() => {
        checkUsernameAvailability(newUsername);
      }, 100);
      setUsernameTimer(timer);
    } else {
      setIsUsernameAvailable(null);
      setUsernameMessage(newUsername.length > 0 ? 'Username must be at least 3 characters' : '');
    }
  };

  // Validate password criteria
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 5;
    const hasNumber = /\d/.test(password);

    setPasswordValidation({
      hasMinLength,
      hasNumber
    });

    return hasMinLength && hasNumber;
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    validatePassword(newPassword);
  };

  // Check overall form validity
  useEffect(() => {
    const isValidUsername = isUsernameAvailable === true;
    const isValidPassword = passwordValidation.hasMinLength && passwordValidation.hasNumber;
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);

    setIsFormValid(isValidUsername && isValidPassword && isValidEmail);
  }, [isUsernameAvailable, passwordValidation, formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    const url = `${import.meta.env.VITE_APP_URL}/public/signup`;

    try {
      const response = await axios.post(url, formData);
      navigate("/login");
      showAlert(`Account created successfully with username: ${formData.username}`, "success");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        showAlert("Error creating account.", "danger");
      } else if (error.request) {
        // Request was made but no response received
        showAlert("Error creating account.", "danger");
      } else {
        // Something else happened while setting up the request
        showAlert("Error creating account.", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative illustrations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-5"></div>
      
      {/* Code illustration */}
      <div className="hidden lg:block absolute right-10 top-1/3 transform translate-y-10 opacity-80">
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10.5L7.5 12L9 13.5" stroke="#4F46E5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.5 10.5L16 12L14.5 13.5" stroke="#4F46E5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9L11 15" stroke="#4F46E5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-60"></div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3 relative">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="text-gray-400 mt-2">Start your journey with SkillSync</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className={`block w-full pl-10 pr-10 py-2 bg-gray-900 border ${
                    isUsernameAvailable === true
                      ? 'border-green-500 focus:ring-green-500'
                      : isUsernameAvailable === false
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-700 focus:ring-blue-600'
                  } rounded-lg focus:ring-2 focus:border-transparent text-white`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleUsernameChange}
                  minLength={3}
                />
                {isCheckingUsername ? (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  </div>
                ) : isUsernameAvailable === true ? (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                ) : isUsernameAvailable === false ? (
                  <X className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                ) : null}
              </div>
              {usernameMessage && (
                <p className={`mt-2 text-sm ${
                  isUsernameAvailable === true
                    ? 'text-green-500'
                    : isUsernameAvailable === false
                      ? 'text-red-500'
                      : 'text-gray-400'
                }`}>
                  {usernameMessage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  className="block w-full pl-10 pr-10 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  minLength={5}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <p className={`text-sm ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordValidation.hasMinLength ? '✓' : '○'} Must be at least 5 characters long
                </p>
                <p className={`text-sm ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                  {passwordValidation.hasNumber ? '✓' : '○'} Must contain at least 1 number
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-900"
              />
              <label className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={`relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500'
                  : 'bg-gray-600 cursor-not-allowed'
              } overflow-hidden`}
              disabled={loading || !isFormValid}
            >
              {isFormValid && !loading && (
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute -left-40 -top-40 h-96 w-96 blur-3xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-30 mix-blend-screen transform rotate-45 animate-pulse"></span>
                </span>
              )}
              {loading ? (
                <span className="flex items-center relative z-10">
                  <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="relative z-10">Create account</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy.
              We'll occasionally send you account related emails.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Signup;