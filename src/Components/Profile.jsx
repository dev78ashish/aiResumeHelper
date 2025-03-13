import { ArrowUp, Award, FileText } from 'lucide-react';
import React from 'react';
import image from '../assets/avatar/avatar (1).gif';

const Profile = () => {
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
                            src={image}
                            alt="Profile"
                            className="h-20 w-20 rounded-full border-2 border-black-500 p-2"
                        />
                        <div>
                            <h3 className="text-xl font-medium text-gray-900">Alex Johnson</h3>
                            <p className="text-gray-500">UI/UX Designer & Frontend Developer</p>
                            <p className="text-gray-500 mt-1">San Francisco, CA</p>
                            <div className="mt-2 flex space-x-2">
                                <button className="text-sm text-blue-600 hover:text-blue-500 border border-blue-600 rounded-md px-3 py-1">
                                    Edit Profile
                                </button>
                                <button className="text-sm text-gray-600 hover:text-gray-500 border border-gray-300 rounded-md px-3 py-1">
                                    View Public Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <p className="mt-1 text-gray-900">Alex Johnson</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-gray-900">alex.johnson@example.com</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <p className="mt-1 text-gray-900">(555) 123-4567</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <p className="mt-1 text-gray-900">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Role</label>
                                    <p className="mt-1 text-gray-900">UI/UX Designer & Frontend Developer</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                                    <p className="mt-1 text-gray-900">5 years</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Education</label>
                                    <p className="mt-1 text-gray-900">Bachelor's in Computer Science, Stanford University</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                                    <p className="mt-1 text-gray-900">Available for full-time opportunities</p>
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

            {/* Work Experience Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                        Add Experience
                    </button>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        <div className="relative border-l-2 border-gray-200 pl-5 ml-2.5">
                            <div className="absolute w-6 h-6 bg-blue-500 rounded-full -left-3 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-900">Senior UI Designer</h4>
                                <p className="text-gray-700">DesignCraft</p>
                                <p className="text-sm text-gray-500">June 2022 - Present</p>
                                <p className="mt-2 text-gray-700">Led the redesign of the company's flagship product, improving user engagement by 35%. Collaborated with product managers and engineers to develop and implement a design system.</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        UI/UX Design
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        Figma
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        Design Systems
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative border-l-2 border-gray-200 pl-5 ml-2.5">
                            <div className="absolute w-6 h-6 bg-gray-300 rounded-full -left-3 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-900">Frontend Developer</h4>
                                <p className="text-gray-700">WebTech Solutions</p>
                                <p className="text-sm text-gray-500">August 2019 - May 2022</p>
                                <p className="mt-2 text-gray-700">Developed and maintained client websites using React, Next.js, and Tailwind CSS. Implemented responsive designs and optimized site performance.</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        React
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        JavaScript
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                        Responsive Design
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Education</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                        Add Education
                    </button>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <img src="/api/placeholder/60/60" alt="Stanford University" className="h-14 w-14 rounded-md" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-gray-900">Bachelor of Science in Computer Science</h4>
                                <p className="text-gray-700">Stanford University</p>
                                <p className="text-sm text-gray-500">2015 - 2019</p>
                                <p className="mt-2 text-gray-700">Graduated with honors. Specialized in Human-Computer Interaction and Visual Computing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-md font-medium text-gray-900 mb-3">Notifications</h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="job-alerts" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                        <label htmlFor="job-alerts" className="ml-2 text-gray-700">Job Alerts</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Receive notifications about new job matches</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="application-updates" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                        <label htmlFor="application-updates" className="ml-2 text-gray-700">Application Updates</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Receive updates about your job applications</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="profile-views" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                        <label htmlFor="profile-views" className="ml-2 text-gray-700">Profile Views</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Get notified when recruiters view your profile</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-md font-medium text-gray-900 mb-3">Privacy</h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="profile-visibility" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                        <label htmlFor="profile-visibility" className="ml-2 text-gray-700">Public Profile</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Make your profile visible to employers</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="resume-sharing" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                        <label htmlFor="resume-sharing" className="ml-2 text-gray-700">Resume Sharing</label>
                                    </div>
                                    <p className="text-sm text-gray-500">Allow recruiters to download your resume</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile