import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, AlertTriangle, Save, Trash2, Loader, Info, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const AccountSettings = ({ showAlert }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [newEmail, setNewEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { logout } = useAuth();


  const [userData, setUserData] = useState();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchUserInfo = async () => {
    const url = `${import.meta.env.VITE_APP_URL}/user`;
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setUserData(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Handle email update
  const handleEmailUpdate = async () => {
    setIsUpdatingEmail(true);
    try {
      const url = `${import.meta.env.VITE_APP_URL}/user/updateemail`;
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        url,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showAlert("Email updated successfully.", "success");
      fetchUserInfo();
      setNewEmail('');

    } catch (error) {
      showAlert("Can't update email address.", "danger");
    } finally {
      setIsUpdatingEmail(false);
    }
  };



  // Handle password update
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordError('');

    try {
      const url = `${import.meta.env.VITE_APP_URL}/user/update`;
      const token = sessionStorage.getItem("token");

      await axios.put(
        url,
        {
          email: userData.email,
          password: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      showAlert("Password updated successfully.", "warning");
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showAlert("Failed to update password.", "danger");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    try {
      const url = `${import.meta.env.VITE_APP_URL}/user/delete`;
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Unauthorized: No token found.");
        setIsDeletingAccount(false);
        return;
      }

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        showAlert("Account deleted successfully!", "error");
        logout();
      }
    } catch (error) {
      alert("Error deleting account: " + (error.response?.data || error.message));
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Profile Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-200">Profile Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={userData?.username || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 cursor-not-allowed"
                />
                <p className="mt-2 items-center flex text-sm text-gray-400">
                  <Info size={12} className="mr-1 text-blue-400" />
                  Username cannot be changed
                </p>
              </div>
            </div>

            {/* Current Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={userData?.email || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 cursor-not-allowed"
                />
                <p className="mt-2 items-center flex text-sm text-gray-400">
                  <ShieldCheck size={12} className="mr-1 text-blue-400" />
                  Used for account recovery and notifications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Update */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Mail className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-200">Update Email</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Enter new email address"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-200"
                  value={newEmail || ""}
                  onChange={(e) => {
                    const email = e.target.value;
                    setNewEmail(email);
                    setIsValidEmail(validateEmail(email));
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleEmailUpdate}
              disabled={!isValidEmail || isUpdatingEmail}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-green-900 disabled:text-gray-400"
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
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Lock className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-gray-200">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
            </div>

            <button
              onClick={handlePasswordUpdate}
              disabled={newPassword !== confirmPassword || isUpdatingPassword || !newPassword}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:bg-blue-900 disabled:text-gray-400"
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
        <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Trash2 className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-200">Delete Account</h2>
          </div>

          {!showDeleteConfirm ? (
            <div>
              <p className="text-gray-400 mb-4">This action cannot be undone. All account information will be permanently deleted.</p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Account
              </button>
            </div>
          ) : (
            <div className="border border-red-900 bg-gray-700 p-4 rounded-lg">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-400">Warning: This cannot be undone</h3>
                  <p className="text-red-300 text-sm">All your data, posts, and account information will be permanently deleted.</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-red-900 disabled:text-gray-400"
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
                  className="bg-gray-600 hover:bg-gray-500 text-gray-200 px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500"
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