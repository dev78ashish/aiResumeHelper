import React, { useState } from 'react';
import { Save, Lock, Mail, User, Eye, EyeOff, Bell, Shield, ChevronRight, CheckCircle } from 'lucide-react';

const Settings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [saveStatus, setSaveStatus] = useState(null);
    const [hoveredTab, setHoveredTab] = useState(null);

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
                                className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center ${
                                    activeTab === tab.id 
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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="relative rounded-md shadow-sm group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                        placeholder="Alex Johnson"
                                        defaultValue="Alex Johnson"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative rounded-md shadow-sm group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                        placeholder="alex.johnson@example.com"
                                        defaultValue="alex.johnson@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="(555) 123-4567"
                                    defaultValue="(555) 123-4567"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="San Francisco, CA"
                                    defaultValue="San Francisco, CA"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="UI/UX Designer & Frontend Developer"
                                    defaultValue="UI/UX Designer & Frontend Developer"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <input
                                    type="number"
                                    id="experience"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="5"
                                    defaultValue="5"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <h4 className="text-md font-medium text-gray-900 mb-4">Profile Picture</h4>
                            <div className="flex items-center space-x-6">
                                <div className="relative group">
                                    <img
                                        src="/api/placeholder/100/100"
                                        alt="Profile"
                                        className="h-24 w-24 rounded-full border-2 border-gray-200 p-1 group-hover:border-blue-300 transition-all duration-200"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
                                        <div className="text-white text-xs">Change</div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="photoUpload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:border-blue-300 hover:text-blue-600">
                                        Change Photo
                                    </label>
                                    <input id="photoUpload" name="photoUpload" type="file" className="sr-only" />
                                    <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
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
                            
                            <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                                    Two-Factor Authentication
                                </h4>
                                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-700 font-medium">Add an extra layer of security to your account</p>
                                        <p className="text-sm text-gray-500 mt-1">We'll send a verification code to your phone each time you sign in</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-3 text-sm text-gray-500">Off</span>
                                        <button
                                            type="button"
                                            className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-300"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                        </button>
                                        <span className="ml-3 text-sm text-gray-500">On</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                                    <Lock className="h-5 w-5 text-blue-500 mr-2" />
                                    Connected Accounts
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img src="/api/placeholder/24/24" alt="Google" className="h-8 w-8 rounded-full shadow-sm" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">Google</p>
                                                <p className="text-xs text-gray-500">Not connected</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200 flex items-center">
                                            Connect
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 bg-blue-50">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img src="/api/placeholder/24/24" alt="GitHub" className="h-8 w-8 rounded-full shadow-sm" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">GitHub</p>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    Connected as alexjohnson
                                                    <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-red-600 hover:text-red-500 font-medium transition-colors duration-200">Disconnect</button>
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
             <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
                    <button 
                        type="button" 
                        className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSave}
                        className="inline-flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                        {saveStatus === 'saving' ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : saveStatus === 'saved' ? (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Saved
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;