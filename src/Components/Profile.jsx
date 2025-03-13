import { ArrowUp, Award, FileText } from 'lucide-react';
import React from 'react';

const Profile = ({ allDetails }) => {
    const skillMetrics = [
        { name: 'JavaScript', level: 85, trending: true },
        { name: 'React', level: 90, trending: true },
        { name: 'UI/UX Design', level: 75, trending: false },
        { name: 'Node.js', level: 70, trending: true },
        { name: 'Tailwind CSS', level: 80, trending: true }
    ];


    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Profile Details</h3>
                </div>
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <img
                            src={allDetails.avatar}
                            alt="Profile"
                            className="h-20 w-20 p-2 rounded-full shadow-lg ring-2 ring-gray-200 transition-transform duration-300 hover:scale-105"
                        />
                        <div>
                            <h3 className="text-xl font-medium text-gray-900">{allDetails.fullname}</h3>
                            <p className="text-gray-500">{allDetails.title}</p>
                            <p className="text-gray-500 mt-1">{allDetails.location}</p>
                            {/* <div className="mt-2 flex space-x-2">
                                <button className="text-sm text-blue-600 hover:text-blue-500 border border-blue-600 rounded-md px-3 py-1">
                                    Edit Profile
                                </button>
                                <button className="text-sm text-gray-600 hover:text-gray-500 border border-gray-300 rounded-md px-3 py-1">
                                    View Public Profile
                                </button>
                            </div> */}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <p className="mt-1 text-gray-900">{allDetails.fullname}</p>
                                </div>
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-gray-900">alex.johnson@example.com</p>
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <p className="mt-1 text-gray-900">{allDetails.number}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <p className="mt-1 text-gray-900">{allDetails.location}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Role</label>
                                    <p className="mt-1 text-gray-900">{allDetails.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                                    <p className="mt-1 text-gray-900">{allDetails.experience}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Highest Education Qualification</label>
                                    <p className="mt-1 text-gray-900">{allDetails.qualification}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                                    <p className="mt-1 text-gray-900">Available for {allDetails.availability}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                        Add Skill
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {skillMetrics.map((skill, index) => (
                            <div key={index} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                                <span className="text-gray-800">{skill.name}</span>
                                {skill.trending && (
                                    <span className="ml-2 inline-flex items-center rounded text-xs font-medium text-green-800">
                                        <ArrowUp className="h-3 w-3 text-green-500" />
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <span className="text-gray-800">HTML/CSS</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <span className="text-gray-800">TypeScript</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <span className="text-gray-800">Figma</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Skill Assessments</h4>
                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                                            <Award className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">JavaScript Assessment</p>
                                            <p className="text-sm text-gray-500">Top 15% of test takers</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Passed
                                    </span>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                                            <Award className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-medium">React Assessment</p>
                                            <p className="text-sm text-gray-500">Top 10% of test takers</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Passed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="text-sm text-blue-600 hover:text-blue-500">
                                Take more skill assessments →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile