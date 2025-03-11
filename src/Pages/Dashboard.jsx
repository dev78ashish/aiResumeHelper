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

  const skillMetrics = [
    { name: 'JavaScript', level: 85, trending: true },
    { name: 'React', level: 90, trending: true },
    { name: 'UI/UX Design', level: 75, trending: false },
    { name: 'Node.js', level: 70, trending: true },
    { name: 'Tailwind CSS', level: 80, trending: true }
  ];

  const activityData = [
    { day: 'Mon', applications: 2, views: 12 },
    { day: 'Tue', applications: 1, views: 8 },
    { day: 'Wed', applications: 3, views: 15 },
    { day: 'Thu', applications: 2, views: 10 },
    { day: 'Fri', applications: 4, views: 20 },
    { day: 'Sat', applications: 1, views: 5 },
    { day: 'Sun', applications: 0, views: 3 }
  ];

  const renderTab = () => {
    switch (activeTab) {
      // case 'overview':
      //   return (
      //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      //       {/* Left Column */}
      //       <div className="lg:col-span-2 space-y-6">
      //         {/* Stats Cards */}
      //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      //           <div className="bg-white rounded-lg shadow p-6">
      //             <div className="flex justify-between items-start">
      //               <div>
      //                 <p className="text-sm text-gray-500">Job Matches</p>
      //                 <h3 className="text-2xl font-bold text-gray-900">24</h3>
      //               </div>
      //               <div className="bg-blue-100 p-2 rounded-lg">
      //                 <Briefcase className="h-6 w-6 text-blue-600" />
      //               </div>
      //             </div>
      //             <div className="mt-2 flex items-center text-sm">
      //               <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
      //               <span className="text-green-500 font-medium">12% </span>
      //               <span className="text-gray-500 ml-1">from last week</span>
      //             </div>
      //           </div>

      //           <div className="bg-white rounded-lg shadow p-6">
      //             <div className="flex justify-between items-start">
      //               <div>
      //                 <p className="text-sm text-gray-500">Applications</p>
      //                 <h3 className="text-2xl font-bold text-gray-900">12</h3>
      //               </div>
      //               <div className="bg-purple-100 p-2 rounded-lg">
      //                 <FileText className="h-6 w-6 text-purple-600" />
      //               </div>
      //             </div>
      //             <div className="mt-2 flex items-center text-sm">
      //               <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
      //               <span className="text-green-500 font-medium">8% </span>
      //               <span className="text-gray-500 ml-1">from last week</span>
      //             </div>
      //           </div>

      //           <div className="bg-white rounded-lg shadow p-6">
      //             <div className="flex justify-between items-start">
      //               <div>
      //                 <p className="text-sm text-gray-500">Profile Views</p>
      //                 <h3 className="text-2xl font-bold text-gray-900">87</h3>
      //               </div>
      //               <div className="bg-green-100 p-2 rounded-lg">
      //                 <User className="h-6 w-6 text-green-600" />
      //               </div>
      //             </div>
      //             <div className="mt-2 flex items-center text-sm">
      //               <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
      //               <span className="text-green-500 font-medium">15% </span>
      //               <span className="text-gray-500 ml-1">from last week</span>
      //             </div>
      //           </div>
      //         </div>

      //         {/* Activity Chart */}
      //         <div className="bg-white rounded-lg shadow p-6">
      //           <div className="flex justify-between items-center mb-4">
      //             <h3 className="text-lg font-medium text-gray-900">Weekly Activity</h3>
      //             <select className="text-sm border-gray-300 rounded-md">
      //               <option>This Week</option>
      //               <option>Last Week</option>
      //               <option>Last Month</option>
      //             </select>
      //           </div>
      //           <div className="h-64 w-full">
      //             {/* Chart would be rendered here with a library like recharts */}
      //             <div className="h-full w-full flex items-end justify-between gap-2 pt-6 border-b border-gray-200">
      //               {activityData.map((day, index) => (
      //                 <div key={index} className="flex flex-col items-center w-full">
      //                   <div className="relative w-full flex justify-center space-x-1">
      //                     <div
      //                       className="w-6 bg-blue-500 rounded-t-lg"
      //                       style={{ height: `${day.applications * 20}px` }}
      //                     ></div>
      //                     <div
      //                       className="w-6 bg-blue-200 rounded-t-lg"
      //                       style={{ height: `${day.views * 2}px` }}
      //                     ></div>
      //                   </div>
      //                   <div className="mt-2 text-xs text-gray-500">{day.day}</div>
      //                 </div>
      //               ))}
      //             </div>
      //             <div className="flex justify-center mt-4 space-x-4 text-sm">
      //               <div className="flex items-center">
      //                 <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
      //                 <span>Applications</span>
      //               </div>
      //               <div className="flex items-center">
      //                 <div className="w-3 h-3 bg-blue-200 rounded mr-1"></div>
      //                 <span>Profile Views</span>
      //               </div>
      //             </div>
      //           </div>
      //         </div>

      //         {/* Top Job Matches */}
      //         <div className="bg-white rounded-lg shadow overflow-hidden">
      //           <div className="p-6 border-b border-gray-200">
      //             <h3 className="text-lg font-medium text-gray-900">Top Job Matches</h3>
      //           </div>
      //           <div className="divide-y divide-gray-200">
      //             {jobMatches.map(job => (
      //               <div key={job.id} className="p-6 hover:bg-gray-50 transition">
      //                 <div className="flex items-start justify-between">
      //                   <div className="flex items-start space-x-4">
      //                     <div className="flex-shrink-0">
      //                       <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-md" />
      //                     </div>
      //                     <div>
      //                       <h4 className="text-base font-medium text-gray-900">{job.title}</h4>
      //                       <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
      //                       <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
      //                         <span className="mr-3">{job.salary}</span>
      //                         <span>{job.posted}</span>
      //                       </div>
      //                     </div>
      //                   </div>
      //                   <div className="flex flex-col items-end">
      //                     <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      //                       {job.matchScore}% Match
      //                     </div>
      //                     <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
      //                       Apply Now
      //                     </button>
      //                   </div>
      //                 </div>
      //               </div>
      //             ))}
      //           </div>
      //           <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
      //             <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
      //               View all job matches →
      //             </a>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Right Column */}
      //       <div className="space-y-6">
      //         {/* Profile Summary */}
      //         <div className="bg-white rounded-lg shadow p-6">
      //           <div className="flex items-center space-x-4">
      //             <img
      //               src="/api/placeholder/80/80"
      //               alt="Profile"
      //               className="h-16 w-16 rounded-full border-2 border-blue-500"
      //             />
      //             <div>
      //               <h3 className="text-lg font-medium text-gray-900">Alex Johnson</h3>
      //               <p className="text-sm text-gray-500">UI/UX Designer & Frontend Developer</p>
      //             </div>
      //           </div>
      //           <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      //             <div className="flex justify-between items-center mb-1">
      //               <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
      //               <span className="text-sm font-medium text-blue-600">85%</span>
      //             </div>
      //             <div className="w-full bg-gray-200 rounded-full h-2">
      //               <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
      //             </div>
      //             <div className="mt-2">
      //               <a href="#" className="text-xs text-blue-600 hover:text-blue-500">
      //                 Complete your profile →
      //               </a>
      //             </div>
      //           </div>
      //         </div>

      //         {/* Skill Analysis */}
      //         <div className="bg-white rounded-lg shadow p-6">
      //           <h3 className="text-lg font-medium text-gray-900 mb-4">Your Skills</h3>
      //           <div className="space-y-4">
      //             {skillMetrics.map((skill, index) => (
      //               <div key={index}>
      //                 <div className="flex justify-between mb-1">
      //                   <div className="flex items-center">
      //                     <span className="text-sm font-medium text-gray-700">{skill.name}</span>
      //                     {skill.trending && (
      //                       <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
      //                         <ArrowUp className="h-3 w-3 mr-0.5" />
      //                         Trending
      //                       </span>
      //                     )}
      //                   </div>
      //                   <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
      //                 </div>
      //                 <div className="w-full bg-gray-200 rounded-full h-2">
      //                   <div
      //                     className={`h-2 rounded-full ${skill.trending ? 'bg-green-500' : 'bg-blue-500'}`}
      //                     style={{ width: `${skill.level}%` }}
      //                   ></div>
      //                 </div>
      //               </div>
      //             ))}
      //           </div>
      //           <div className="mt-4">
      //             <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
      //               View skills assessment →
      //             </a>
      //           </div>
      //         </div>

      //         {/* Application Tracker */}
      //         <div className="bg-white rounded-lg shadow overflow-hidden">
      //           <div className="p-6 border-b border-gray-200">
      //             <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
      //           </div>
      //           <div className="divide-y divide-gray-200">
      //             {applications.map(app => (
      //               <div key={app.id} className="p-4 hover:bg-gray-50 transition">
      //                 <div className="flex items-center space-x-3">
      //                   <div className="flex-shrink-0">
      //                     <img src={app.logo} alt={app.company} className="h-10 w-10 rounded-md" />
      //                   </div>
      //                   <div className="min-w-0 flex-1">
      //                     <p className="text-sm font-medium text-gray-900 truncate">{app.title}</p>
      //                     <p className="text-sm text-gray-500 truncate">{app.company}</p>
      //                   </div>
      //                   <div className="flex-shrink-0 flex flex-col items-end">
      //                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.status === 'Interview' ? 'bg-green-100 text-green-800' :
      //                         app.status === 'Assessment' ? 'bg-yellow-100 text-yellow-800' :
      //                           'bg-blue-100 text-blue-800'
      //                       }`}>
      //                       {app.status}
      //                     </span>
      //                     <span className="text-xs text-gray-500 mt-1">{app.date}</span>
      //                   </div>
      //                 </div>
      //               </div>
      //             ))}
      //           </div>
      //           <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
      //             <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
      //               View all applications →
      //             </a>
      //           </div>
      //         </div>

      //         {/* Calendar */}
      //         <div className="bg-white rounded-lg shadow p-6">
      //           <div className="flex justify-between items-center mb-4">
      //             <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
      //             <a href="#" className="text-sm text-blue-600 hover:text-blue-500">View all</a>
      //           </div>
      //           <div className="space-y-3">
      //             <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
      //               <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
      //                 <Calendar className="h-5 w-5 text-blue-600" />
      //               </div>
      //               <div>
      //                 <p className="text-sm font-medium text-gray-900">Interview with TechCorp</p>
      //                 <p className="text-xs text-gray-500">Mar 15, 2025 • 10:00 AM</p>
      //               </div>
      //             </div>
      //             <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
      //               <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
      //                 <Clock className="h-5 w-5 text-purple-600" />
      //               </div>
      //               <div>
      //                 <p className="text-sm font-medium text-gray-900">Assessment Deadline</p>
      //                 <p className="text-xs text-gray-500">Mar 17, 2025 • 11:59 PM</p>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
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
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profile Details</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src="/api/placeholder/128/128"
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-2 border-blue-500"
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

            {/* Resume Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Resume</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Alex_Johnson_Resume.pdf</p>
                      <p className="text-sm text-gray-500">Updated 2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-sm text-gray-600 hover:text-gray-500 border border-gray-300 rounded-md px-3 py-1">
                      View
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-500 border border-blue-600 rounded-md px-3 py-1">
                      Update
                    </button>
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
