import React, { useState } from 'react';
import { Save, Lock, Mail, User, Eye, EyeOff, Bell, Shield, ChevronRight, CheckCircle } from 'lucide-react';

const Settings = ({ allDetails }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [saveStatus, setSaveStatus] = useState(null);
    const [hoveredTab, setHoveredTab] = useState(null);
    const [newDetails, setNewDetails] = useState(allDetails);

    const handleSave = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(null), 2000);
        }, 1000);
    };

    return (
        <div className="">
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
                            { id: 'security', label: 'Security', icon: <Lock className="h-4 w-4 mr-2" /> },
                            { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4 mr-2" /> },
                            { id: 'privacy', label: 'Privacy', icon: <Shield className="h-4 w-4 mr-2" /> }
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
                        value={newDetails.fullName}
                        onChange={(e) => setNewDetails({ ...newDetails, fullName: e.target.value })}
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
                    value={newDetails.number}
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
                    value={newDetails.location}
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
                    value={newDetails.title}
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
                    value={newDetails.experience}
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
                    value={newDetails.education}
                    onChange={(e) => setNewDetails({ ...newDetails, education: e.target.value })}
                    placeholder="e.g., B.Tech, MCA, MBA"
                />
            </div>

            {/* Availability Dropdown (Internship, Full-Time, Part-Time) */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${
                            newDetails.availability === 'Internship'
                                ? 'bg-blue-600 text-white'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setNewDetails({ ...newDetails, availability: 'Internship' })}
                    >
                        Internship
                    </button>
                    <button
                        type="button"
                        className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${
                            newDetails.availability === 'Full-Time'
                                ? 'bg-blue-600 text-white'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setNewDetails({ ...newDetails, availability: 'Full-Time' })}
                    >
                        Full-Time
                    </button>
                    <button
                        type="button"
                        className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 ${
                            newDetails.availability === 'Part-Time'
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
                <label htmlFor="photoUpload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                    Change Photo
                </label>
                <input id="photoUpload" name="photoUpload" type="file" className="sr-only" />
            </div>
        </div>

        {/* Buttons */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button type="button" className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                Cancel
            </button>
            <button type="button" onClick={handleSave} className="py-2 px-4 border rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                Save Changes
            </button>
        </div>
    </div>
)}


                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="p-6 sm:p-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-blue-50 p-4 rounded-lg mb-8">
                                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                                    <Lock className="h-5 w-5 text-blue-500 mr-2" />
                                    Change Password
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="currentPassword"
                                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="newPassword"
                                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex mt-2 space-x-1">
                                            <div className="h-1 w-1/4 rounded-full bg-green-400"></div>
                                            <div className="h-1 w-1/4 rounded-full bg-green-400"></div>
                                            <div className="h-1 w-1/4 rounded-full bg-green-400"></div>
                                            <div className="h-1 w-1/4 rounded-full bg-gray-200"></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters and include a number and symbol</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="p-6 sm:p-8">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <Bell className="h-5 w-5 text-blue-500 mr-2" />
                                    <h4 className="text-md font-medium text-gray-900">Email Notifications</h4>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {[
                                        { id: 'job-alerts', label: 'Job Alerts', description: 'Receive notifications about new job matches', checked: true },
                                        { id: 'application-updates', label: 'Application Updates', description: 'Receive updates about your job applications', checked: true },
                                        { id: 'profile-views', label: 'Profile Views', description: 'Get notified when recruiters view your profile', checked: true },
                                        { id: 'newsletter', label: 'Newsletter', description: 'Receive our weekly newsletter with career tips', checked: false }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <input
                                                        id={item.id}
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
                                                        defaultChecked={item.checked}
                                                    />
                                                </div>
                                                <label htmlFor={item.id} className="ml-2 text-gray-700 font-medium">{item.label}</label>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <Bell className="h-5 w-5 text-blue-500 mr-2" />
                                    <h4 className="text-md font-medium text-gray-900">SMS Notifications</h4>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {[
                                        { id: 'interview-reminders', label: 'Interview Reminders', description: 'Receive SMS reminders before scheduled interviews', checked: true },
                                        { id: 'urgent-messages', label: 'Urgent Messages', description: 'Receive SMS for urgent messages from employers', checked: false }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <input
                                                        id={item.id}
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
                                                        defaultChecked={item.checked}
                                                    />
                                                </div>
                                                <label htmlFor={item.id} className="ml-2 text-gray-700 font-medium">{item.label}</label>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="p-6 sm:p-8">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                                    <h4 className="text-md font-medium text-gray-900">Profile Visibility</h4>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {[
                                        { id: 'profile-visibility', label: 'Public Profile', description: 'Make your profile visible to employers', checked: true },
                                        { id: 'resume-sharing', label: 'Resume Sharing', description: 'Allow recruiters to download your resume', checked: true },
                                        { id: 'contact-info', label: 'Contact Information', description: 'Show email and phone number on public profile', checked: false }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <input
                                                        id={item.id}
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
                                                        defaultChecked={item.checked}
                                                    />
                                                </div>
                                                <label htmlFor={item.id} className="ml-2 text-gray-700 font-medium">{item.label}</label>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center">
                                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                                    <h4 className="text-md font-medium text-gray-900">Data Usage</h4>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {[
                                        { id: 'analytics', label: 'Usage Analytics', description: 'Allow us to collect anonymous usage data to improve our services', checked: true },
                                        { id: 'personalized-content', label: 'Personalized Content', description: 'Receive personalized job recommendations based on your activity', checked: true }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <input
                                                        id={item.id}
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
                                                        defaultChecked={item.checked}
                                                    />
                                                </div>
                                                <label htmlFor={item.id} className="ml-2 text-gray-700 font-medium">{item.label}</label>
                                            </div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                                    <Shield className="h-5 w-5 text-red-500 mr-2" />
                                    Account Management
                                </h4>
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                        <button className="text-sm text-red-600 hover:text-red-500 font-medium flex items-center">
                                            Deactivate Account
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                    <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                        <button className="text-sm text-red-600 hover:text-red-500 font-medium flex items-center">
                                            Delete Account
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </button>
                                        <p className="mt-1 text-xs text-gray-500">
                                            This will permanently delete your account and all associated data. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button Section */}
                
            </div>
        </div>
    );
};

export default Settings;