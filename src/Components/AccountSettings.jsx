import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, AlertTriangle, Save, Trash2, Loader } from 'lucide-react';

const AccountSettings = () => {
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  // Sample user data (in a real app, this would come from props or context)
  const [userData, setUserData] = useState({
    username: "JohnDoe123",
    email: "john.doe@example.com"
  });
  
  // Handle email update
  const handleEmailUpdate = () => {
    setIsUpdatingEmail(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdatingEmail(false);
    }, 2000);
  };
  
  // Handle password update
  const handlePasswordUpdate = () => {
    setIsUpdatingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdatingPassword(false);
    }, 2000);
  };
  
  // Handle account deletion
  const handleDeleteAccount = () => {
    setIsDeletingAccount(true);
    // Simulate API call
    setTimeout(() => {
      setIsDeletingAccount(false);
      // In a real app, you would redirect to logout page or home page
    }, 2000);
  };
  
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={userData.username}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 cursor-not-allowed"
                />
                <p className="mt-2 text-sm text-gray-500">Username cannot be changed</p>
              </div>
            </div>
            
            {/* Current Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 cursor-not-allowed"
                />
                <p className="mt-2 text-sm text-gray-500">Used for account recovery and notifications</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Email Update */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Mail className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">Update Email</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter new email address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <button 
              onClick={handleEmailUpdate}
              disabled={isUpdatingEmail}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-green-300"
            >
              {isUpdatingEmail ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Update Email
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Password Update */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Lock className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">Change Password</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex mt-2 space-x-1">
                <div className="h-1 w-1/4 rounded-full bg-blue-400"></div>
                <div className="h-1 w-1/4 rounded-full bg-blue-400"></div>
                <div className="h-1 w-1/4 rounded-full bg-blue-400"></div>
                <div className="h-1 w-1/4 rounded-full bg-gray-200"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters with a number and symbol</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handlePasswordUpdate}
              disabled={isUpdatingPassword}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-blue-300"
            >
              {isUpdatingPassword ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Delete Account */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Trash2 className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">Delete Account</h2>
          </div>
          
          {!showDeleteConfirm ? (
            <div>
              <p className="text-gray-600 mb-4">This action cannot be undone. All account information will be permanently deleted.</p>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Account
              </button>
            </div>
          ) : (
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-700">Warning: This cannot be undone</h3>
                  <p className="text-red-600 text-sm">All your data, posts, and account information will be permanently deleted.</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-red-400"
                >
                  {isDeletingAccount ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 inline animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Permanently Delete Account"
                  )}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeletingAccount}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;