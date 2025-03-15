import { ArrowUp, Award, FileText, UserCircle2 } from 'lucide-react';
import React from 'react';
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

const Profile = ({ allDetails }) => {
    const skillMetrics = [
        { name: 'JavaScript', level: 85, trending: true },
        { name: 'React', level: 90, trending: true },
        { name: 'UI/UX Design', level: 75, trending: false },
        { name: 'Node.js', level: 70, trending: true },
        { name: 'Tailwind CSS', level: 80, trending: true }
    ];

    const avatarOptions = [
        male1, female1, male2, female2, male3,
        female3, male4, female4, male5, female5
    ];

    const getImage = (key) => avatarOptions[key] || null;


    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className="flex items-center p-6 border-b border-gray-700">
                    <UserCircle2 className="w-5 h-5 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">Profile Details</h3>
                </div>
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <img
                            src={getImage(allDetails.avatar)}
                            alt="Profile"
                            className="h-20 w-20 p-2 rounded-full shadow-lg ring-2 ring-gray-700 transition-transform duration-300 hover:scale-105"
                        />
                        <div>
                            <h3 className="text-xl font-medium text-white">{allDetails.fullname}</h3>
                            <p className="text-gray-400">{allDetails.title}</p>
                            <p className="text-gray-400 mt-1">{allDetails.location}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-medium text-white mb-4">Personal Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Full Name</label>
                                    <p className="mt-1 text-gray-300">{allDetails.fullname}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                                    <p className="mt-1 text-gray-300">{allDetails.number}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Location</label>
                                    <p className="mt-1 text-gray-300">{allDetails.location}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-white mb-4">Professional Information</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Current Role</label>
                                    <p className="mt-1 text-gray-300">{allDetails.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Experience</label>
                                    <p className="mt-1 text-gray-300">{allDetails.experience}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Highest Education Qualification</label>
                                    <p className="mt-1 text-gray-300">{allDetails.qualification}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Availability</label>
                                    <p className="mt-1 text-gray-300">Available for {allDetails.availability}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-md p-6 transition-all transform hover:shadow-lg border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-400 mr-2" />
                    Recommended Job Roles
                </h2>
                {allDetails.jobRoles && allDetails.jobRoles.length > 0 ? (
                    <p className="text-gray-300">These job roles were extracted from your resume with the help of AI.</p>
                ) : (
                    <p className="text-gray-300">Please upload your resume in AI Resume Helper and save your profile details to see your recommended job roles.</p>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                    {allDetails.jobRoles && allDetails.jobRoles.length > 0 ? (
                        allDetails.jobRoles.map((role, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-900 text-blue-200 border border-blue-700 transform transition-all hover:-translate-y-1 hover:shadow"
                            >
                                {role}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400">No specific roles recommended.</p>
                    )}
                </div>
            </div>


            {/* Skills Section */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">Skills</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                        Add Skill
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {skillMetrics.map((skill, index) => (
                            <div key={index} className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                                <span className="text-gray-200">{skill.name}</span>
                                {skill.trending && (
                                    <span className="ml-2 inline-flex items-center rounded text-xs font-medium text-green-400">
                                        <ArrowUp className="h-3 w-3 text-green-400" />
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                            <span className="text-gray-200">HTML/CSS</span>
                        </div>
                        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                            <span className="text-gray-200">TypeScript</span>
                        </div>
                        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                            <span className="text-gray-200">Figma</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-md font-medium text-white mb-3">Skill Assessments</h4>
                        <div className="space-y-4">
                            <div className="border border-gray-700 rounded-lg p-4 bg-gray-750">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 bg-green-900 p-2 rounded-full">
                                            <Award className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-200 font-medium">JavaScript Assessment</p>
                                            <p className="text-sm text-gray-400">Top 15% of test takers</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                                        Passed
                                    </span>
                                </div>
                            </div>
                            <div className="border border-gray-700 rounded-lg p-4 bg-gray-750">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 bg-green-900 p-2 rounded-full">
                                            <Award className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-200 font-medium">React Assessment</p>
                                            <p className="text-sm text-gray-400">Top 10% of test takers</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                                        Passed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="text-sm text-blue-400 hover:text-blue-300">
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