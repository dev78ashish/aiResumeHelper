import React, { useEffect, useState } from 'react';
import { Save, Lock, Mail, User, Eye, EyeOff, Bell, Shield, ChevronRight, CheckCircle, X } from 'lucide-react';
import male1 from '../assets/avatar/male1.gif';
import male2 from '../assets/avatar/male2.gif';
import male3 from '../assets/avatar/male3.gif';
import male4 from '../assets/avatar/male4.gif';
import male5 from '../assets/avatar/male5.gif';
import female1 from '../assets/avatar/female1.gif';
import female2 from '../assets/avatar/female2.gif';
import female3 from '../assets/avatar/female3.gif';
import female4 from '../assets/avatar/female4.gif';
import female5 from '../assets/avatar/female5.gif';
import axios from 'axios';
import AccountSettings from './AccountSettings';

const Settings = ({ allDetails, fetchInfo, showAlert }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [saveStatus, setSaveStatus] = useState(null);
    const [hoveredTab, setHoveredTab] = useState(null);
    const [newDetails, setNewDetails] = useState(allDetails);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const avatarOptions = [
        male1, female1, male2, female2, male3,
        female3, male4, female4, male5, female5
    ];

    const handleSave = async () => {
        try {
            setSaveStatus(true);
            const url = `${import.meta.env.VITE_APP_URL}/userinfo/save`;
            const token = sessionStorage.getItem("token");

            if (!token) {
                console.error("No token found. User might not be authenticated.");
                return;
            }

            const response = await axios.post(url, newDetails, {
                headers: {
                    Authorization: `Bearer ${token}` // Ensure it's prefixed correctly
                }
            });

            showAlert("Details updated successfully.", "success");
            fetchInfo();
        } catch (error) {
            alert("Failed to update profile. Please try again later.");
        } finally {
            setSaveStatus(false);
        }
    };

    const handleAvatarSelect = (avatar) => {
        console.log(avatar)
        setNewDetails({ ...newDetails, avatar });
        setShowAvatarModal(false);
    };


    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your account preferences and personal information</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'account', label: 'Account Details', icon: <User className="h-4 w-4 mr-2" /> },
                        { id: 'security', label: 'Security', icon: <Lock className="h-4 w-4 mr-2" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            onMouseEnter={() => setHoveredTab(tab.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center ${activeTab === tab.id
                                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                                : hoveredTab === tab.id
                                    ? 'text-gray-700 bg-gray-50'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Account Details Tab */}
            {activeTab === 'account' && (
                <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
                        {/* Username (Non-editable) */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username <span className="text-xs text-gray-500">(cannot be changed)</span>
                            </label>
                            <div className="relative rounded-md shadow-sm group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-gray-50 cursor-not-allowed sm:text-sm"
                                    value={newDetails.username || "username"}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative rounded-md shadow-sm group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    value={newDetails.fullname || ""}
                                    onChange={(e) => setNewDetails({ ...newDetails, fullname: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.number || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, number: e.target.value })}
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.location || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, location: e.target.value })}
                            />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-2">
                            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.title || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, title: e.target.value })}
                            />
                        </div>

                        {/* Years of Experience - Dropdown */}
                        <div className="space-y-2">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                Years of Experience
                            </label>
                            <select
                                id="experience"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.experience || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, experience: e.target.value })}
                            >
                                <option value="<1 Year">&lt;1 Year</option>
                                <option value="1-2 Years">1-2 Years</option>
                                <option value="3-5 Years">3-5 Years</option>
                                <option value="6-10 Years">6-10 Years</option>
                                <option value=">10 Years">&gt;10 Years</option>
                            </select>
                        </div>

                        {/* Education */}
                        <div className="space-y-2">
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                                Education
                            </label>
                            <input
                                type="text"
                                id="education"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.qualification || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, qualification: e.target.value })}
                                placeholder="e.g., B.Tech, MCA, MBA"
                            />
                        </div>

                        {/* Availability Dropdown (Internship, Full-Time, Part-Time) */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Availability</label>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Internship'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setNewDetails({ ...newDetails, availability: 'Internship' })}
                                >
                                    Internship
                                </button>
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Full-Time'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setNewDetails({ ...newDetails, availability: 'Full-Time' })}
                                >
                                    Full-Time
                                </button>
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Part-Time'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setNewDetails({ ...newDetails, availability: 'Part-Time' })}
                                >
                                    Part-Time
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture Section */}
                    <div className="mt-8">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Profile Picture</h4>
                        <div className="flex items-center space-x-6">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                                {newDetails.avatar ? (
                                    <img src={newDetails.avatar} alt='UserIcon' />
                                ) : (
                                    <User className="h-8 w-8 text-blue-500" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowAvatarModal(true)}
                                className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                            >
                                Choose Avatar
                            </button>
                        </div>
                    </div>

                    {/* Avatar Modal */}
                    {showAvatarModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Choose Avatar</h3>
                                    <button
                                        onClick={() => setShowAvatarModal(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    {avatarOptions.map((avatar) => (
                                        <button
                                            key={avatar}
                                            onClick={() => handleAvatarSelect(avatar)}
                                            className={`h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 ${newDetails.avatar === avatar ? 'ring-2 ring-blue-500' : ''
                                                }`}
                                        >
                                            <img src={avatar} alt={avatar} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between mt-8">
                        <button type="button" className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saveStatus}
                            className={`py-2 px-4 border rounded-lg text-white flex items-center transition ${saveStatus
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {saveStatus ? (
                                <>
                                    <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>
            )}


            {/* Security Tab */}
            {activeTab === 'security' && (
                <AccountSettings showAlert={showAlert} />
            )}

        </div>
    );
};

export default Settings;