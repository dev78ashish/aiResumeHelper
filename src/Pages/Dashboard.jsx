import React, { useState } from 'react';
import {
  Briefcase,
  LineChart,
  CheckCircle,
  Bell,
  User,
  Search,
  FileText,
  BarChart,
  Star,
  Award,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  PieChart,
  Settings
} from 'lucide-react';
import Overview from '../Components/Overview';
import Profile from '../Components/Profile';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts and metrics
  const jobMatches = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', matchScore: 92, location: 'New York, NY', salary: '$120K - $150K', posted: '2 days ago', logo: '/api/placeholder/50/50' },
    { id: 2, title: 'UX/UI Designer', company: 'DesignHub', matchScore: 88, location: 'Remote', salary: '$90K - $110K', posted: '1 day ago', logo: '/api/placeholder/50/50' },
    { id: 3, title: 'Full Stack Engineer', company: 'InnovateSoft', matchScore: 85, location: 'San Francisco, CA', salary: '$130K - $160K', posted: '3 days ago', logo: '/api/placeholder/50/50' },
    { id: 4, title: 'Product Manager', company: 'GrowthStart', matchScore: 79, location: 'Boston, MA', salary: '$110K - $140K', posted: '5 days ago', logo: '/api/placeholder/50/50' }
  ];

  const applications = [
    { id: 1, title: 'Software Engineer', company: 'TechGiant', status: 'Interview', date: 'Mar 15, 2025', logo: '/api/placeholder/50/50' },
    { id: 2, title: 'Frontend Developer', company: 'WebSolutions', status: 'Application Sent', date: 'Mar 10, 2025', logo: '/api/placeholder/50/50' },
    { id: 3, title: 'Product Designer', company: 'CreativeInc', status: 'Assessment', date: 'Mar 8, 2025', logo: '/api/placeholder/50/50' }
  ];

 

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return(
          <Overview />
        );
      case 'jobs':
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
        );
      case 'applications':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Your Applications</h3>
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
                    <tr key={`${app.id}-${index}`} className="hover:bg-gray-50">
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
        );
      case 'profile':
        return (
          <Profile />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Search Dashboard</h1>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  <span>Jobs</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Applications</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  <span>Profile</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTab()}
      </div>
    </div>
  );
};

export default Dashboard;
