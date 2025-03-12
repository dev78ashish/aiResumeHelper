import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
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

    const url = `${import.meta.env.VITE_APP_URL}/public/signup`;

    try {
        const response = await axios.post(url, formData);
        console.log("Response:", response.data);
        navigate("/login");
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Error Response:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response:", error.request);
        } else {
            // Something else happened while setting up the request
            console.error("Error Message:", error.message);
        }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
            <p className="text-gray-600 mt-2">Start your journey with SkillSync</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    isUsernameAvailable === true
                      ? 'border-green-500 focus:ring-green-500'
                      : isUsernameAvailable === false
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-600'
                  } rounded-lg focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleUsernameChange}
                  minLength={3}
                />
                {isCheckingUsername ? (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
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
                    ? 'text-green-600'
                    : isUsernameAvailable === false
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}>
                  {usernameMessage}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  minLength={5}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <p className={`text-sm ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordValidation.hasMinLength ? '✓' : '○'} Must be at least 5 characters long
                </p>
                <p className={`text-sm ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordValidation.hasNumber ? '✓' : '○'} Must contain at least 1 number
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Create account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500" >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;