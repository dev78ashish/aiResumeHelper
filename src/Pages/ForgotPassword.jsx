import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [fetchEmail, setFetchEmail] = useState('');

  const loginredirect = () => {
    navigate("/login");
  }


  const maskEmail = (email) => {
    if (!email || email.length < 4) return '';
    const firstTwoChars = email.substring(0, 2);
    const lastChar = email.substring(email.length - 1);
    const maskedPart = '*'.repeat(email.length - 3);
    return `${firstTwoChars}${maskedPart}${lastChar}`;
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
  
    try {
      setError('');
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/public/exist`, {
        params: { username }
      });
    
      if (response.data.exists === 'no') {
        setError('No user exists with this username.');
        return;
      }
      setFetchEmail(response.data.email);
      setMaskedEmail(maskEmail(response.data.email));
      setStep(2);
    } catch (err) {
      setError('Failed to find user. Please try again.');
    }
  };
  

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (!inputEmail.trim()) {
      setError('Please enter your email');
      return;
    }

    if (fetchEmail.toLowerCase() === inputEmail.toLowerCase()) {
      setError('');
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep(3);
    } else {
      setError('Email does not match our records');
    }
  };

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
              <circle cx="179.4" cy="120.2" r="30" fill="#63B3ED" />
              <path d="M168.9 79.3c-21.3 5.5-34.3 27.2-28.8 48.5 5.5 21.3 27.2 34.3 48.5 28.8 21.3-5.5 34.3-27.2 28.8-48.5-5.5-21.3-27.2-34.3-48.5-28.8z" fill="#4299E1" opacity="0.7" />
              <path d="M150 170c-8 4-12 12-9 20l10 25c3 8 12 12 20 9l25-10c8-3 12-12 9-20l-10-25c-3-8-12-12-20-9l-25 10z" fill="#2B6CB0" />
              <path d="M300.7 140.6c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6z" fill="#2B6CB0" opacity="0.6" />
              <path d="M95 108c-4-4-10-4-14 0l-15 15c-4 4-4 10 0 14l15 15c4 4 10 4 14 0l15-15c4-4 4-10 0-14l-15-15z" fill="#4299E1" opacity="0.5" />
            </svg>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-white">Recover Your Account</h2>
            <p className="text-blue-200 mt-2">We'll help you get back into SkillSync</p>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-gray-800 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
            <p className="text-gray-300 mt-2">
              {step === 1 && "Enter your username to recover your account"}
              {step === 2 && "Verify your email address"}
              {step === 3 && "Check your email for instructions"}
            </p>
          </div>

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleUsernameSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

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
                    Processing...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-md bg-blue-900 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-200">
                      We found an account associated with username <span className="font-bold">{username}</span>. The email address on file is <span className="font-bold">{maskedEmail}</span>.
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleEmailVerification}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter your full email address
                  </label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email address"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      setStep(1);
                      setError('');
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm transition
                ${loading ? "bg-blue-700 opacity-70 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"}`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      'Verify Email'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-md bg-green-900 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-200">Password reset email sent</h3>
                    <div className="mt-2 text-sm text-green-200">
                      <p>We've sent a temporary password to <span className="font-bold">{fetchEmail}</span>. Please check your inbox.</p>
                      <p className="mt-2">Use the temporary password to log in, then change your password immediately after logging in.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={loginredirect}
                  className="flex justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-gray-800">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to='/login' className="font-medium text-blue-400 hover:text-blue-300">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;