import { Calendar, FileText, PieChart } from 'lucide-react';
import React from 'react'

const Applications = () => {

    const applications = [
        { id: 1, title: 'Software Engineer', company: 'TechGiant', status: 'Interview', date: 'Mar 15, 2025', logo: '/api/placeholder/50/50' },
        { id: 2, title: 'Frontend Developer', company: 'WebSolutions', status: 'Application Sent', date: 'Mar 10, 2025', logo: '/api/placeholder/50/50' },
        { id: 3, title: 'Product Designer', company: 'CreativeInc', status: 'Assessment', date: 'Mar 8, 2025', logo: '/api/placeholder/50/50' }
    ];



    return (
        <div className="space-y-6">
            {/* Welcome Card with Stats */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
                    <h2 className="text-2xl font-bold">Your Applications</h2>
                    <p className="mt-1 text-blue-100">Track your job application journey</p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Applications</p>
                                    <p className="text-2xl font-bold text-gray-900">6</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Interviews</p>
                                    <p className="text-2xl font-bold text-gray-900">2</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Calendar className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Response Rate</p>
                                    <p className="text-2xl font-bold text-gray-900">33%</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <PieChart className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Application History</h3>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        + Add New
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Next Steps
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.concat(applications).map((app, index) => (
                                <tr key={`${app.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md" src={app.logo} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{app.title}</div>
                                                <div className="text-sm text-gray-500">{app.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{app.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Assessment' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.status === 'Interview' ? 'Prepare for interview' :
                                            app.status === 'Assessment' ? 'Complete assessment' :
                                                'Wait for recruiter response'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                                        <a href="#" className="text-gray-600 hover:text-gray-900">Withdraw</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Applications