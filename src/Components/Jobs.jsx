import { Search } from 'lucide-react';
import React from 'react';

const Jobs = () => {

    const jobMatches = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', matchScore: 92, location: 'New York, NY', salary: '$120K - $150K', posted: '2 days ago', logo: '/api/placeholder/50/50' },
        { id: 2, title: 'UX/UI Designer', company: 'DesignHub', matchScore: 88, location: 'Remote', salary: '$90K - $110K', posted: '1 day ago', logo: '/api/placeholder/50/50' },
        { id: 3, title: 'Full Stack Engineer', company: 'InnovateSoft', matchScore: 85, location: 'San Francisco, CA', salary: '$130K - $160K', posted: '3 days ago', logo: '/api/placeholder/50/50' },
        { id: 4, title: 'Product Manager', company: 'GrowthStart', matchScore: 79, location: 'Boston, MA', salary: '$110K - $140K', posted: '5 days ago', logo: '/api/placeholder/50/50' }
    ];

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Job Matches</h3>
            </div>
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
                    <div className="relative flex-grow max-w-lg">
                        <input
                            type="text"
                            placeholder="Search job title, company, or keywords"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex space-x-2">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <option>All Locations</option>
                            <option>Remote</option>
                            <option>New York</option>
                            <option>San Francisco</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <option>All Job Types</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </select>
                        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700">
                            Filter
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Job list would be rendered here - similar to the overview job matches */}
                    {jobMatches.concat(jobMatches).map((job, index) => (
                        <div key={`${job.id}-${index}`} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                            <div className="sm:flex sm:justify-between sm:items-start">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-md" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-medium text-gray-900">{job.title}</h4>
                                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                        <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                                            <span className="mr-3">{job.salary}</span>
                                            <span>{job.posted}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {job.matchScore}% Match
                                    </div>
                                    <div className="mt-2 flex space-x-2">
                                        <button className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-3 py-1">
                                            Save
                                        </button>
                                        <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-1">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        Showing 1-8 of 24 jobs
                    </p>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs