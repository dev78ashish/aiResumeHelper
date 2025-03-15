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

    const getImage = (key) => avatarOptions[key] || null; // Returns `null` for invalid keys


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
        setNewDetails({ ...newDetails, avatar });
        setShowAvatarModal(false);
    };


    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6 sm:p-8 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
                <h3 className="text-xl font-semibold text-gray-100">Settings</h3>
                <p className="text-sm text-gray-400 mt-1">Manage your account preferences and personal information</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 bg-gray-800">
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
                                ? 'border-b-2 border-blue-500 text-blue-400 bg-gray-700'
                                : hoveredTab === tab.id
                                    ? 'text-gray-200 bg-gray-700'
                                    : 'text-gray-400 hover:text-gray-200'
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
                <div className="p-6 sm:p-8 bg-gray-800">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
                        {/* Username (Non-editable) */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                                Username <span className="text-xs text-gray-500">(cannot be changed)</span>
                            </label>
                            <div className="relative rounded-md shadow-sm group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 bg-gray-700 cursor-not-allowed sm:text-sm"
                                    value={newDetails.username || "username"}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
                                Full Name
                            </label>
                            <div className="relative rounded-md shadow-sm group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500 group-hover:text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    value={newDetails.fullname || ""}
                                    onChange={(e) => setNewDetails({ ...newDetails, fullname: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm text-gray-200 placeholder-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.number || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, number: e.target.value })}
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-200">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm text-gray-200 placeholder-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.location || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, location: e.target.value })}
                            />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-2">
                            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-200">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                className="block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm text-gray-200 placeholder-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.title || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, title: e.target.value })}
                            />
                        </div>

                        {/* Years of Experience - Dropdown */}
                        <div className="space-y-2">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-200">
                                Years of Experience
                            </label>
                            <select
                                id="experience"
                                className="block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm text-gray-200 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
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
                            <label htmlFor="education" className="block text-sm font-medium text-gray-200">
                                Education
                            </label>
                            <input
                                type="text"
                                id="education"
                                className="block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm text-gray-200 placeholder-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                value={newDetails.qualification || ""}
                                onChange={(e) => setNewDetails({ ...newDetails, qualification: e.target.value })}
                                placeholder="e.g., B.Tech, MCA, MBA"
                            />
                        </div>

                        {/* Availability Dropdown (Internship, Full-Time, Part-Time) */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-200">Availability</label>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Internship'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    onClick={() => setNewDetails({ ...newDetails, availability: 'Internship' })}
                                >
                                    Internship
                                </button>
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Full-Time'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    onClick={() => setNewDetails({ ...newDetails, availability: 'Full-Time' })}
                                >
                                    Full-Time
                                </button>
                                <button
                                    type="button"
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${newDetails.availability === 'Part-Time'
                                        ? 'bg-blue-600 text-white'
                                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
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
                        <h4 className="text-md font-medium text-gray-200 mb-4">Profile Picture</h4>
                        <div className="flex items-center space-x-6">
                            <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                                {newDetails.avatar ? (
                                    <img src={getImage(newDetails.avatar)} alt='UserIcon' />
                                ) : (
                                    <User className="h-8 w-8 text-blue-400" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowAvatarModal(true)}
                                className="cursor-pointer bg-gray-700 py-2 px-4 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-600 transition-all duration-200"
                            >
                                Choose Avatar
                            </button>
                        </div>
                    </div>

                    {/* Avatar Modal */}
                    {showAvatarModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-200">Choose Avatar</h3>
                                    <button
                                        onClick={() => setShowAvatarModal(false)}
                                        className="text-gray-400 hover:text-gray-300"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    {avatarOptions.map((avatar, key) => (
                                        <button
                                            key={avatar}
                                            onClick={() => handleAvatarSelect(key)}
                                            className={`relative h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 hover:scale-105 transition-transform duration-200 overflow-hidden 
                                            ${newDetails.avatar === key ? 'outline outline-4 outline-blue-500' : ''}`}
                                        >
                                            {/* {console.log(key)} */}
                                            <img src={avatar} alt={key} className="w-full h-full object-cover" />

                                            {newDetails.avatar === avatar && (
                                                <span className="absolute inset-0 rounded-full border-2 border-blue-500 animate-pulse"></span>
                                            )}
                                        </button>

                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="p-6 bg-gray-900 border-t border-gray-700 flex justify-between mt-8">
                        <button type="button" className="py-2 px-4 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200">
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