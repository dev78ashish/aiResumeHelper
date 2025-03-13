import React, { useState, useEffect } from 'react';
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
  SettingsIcon,
  Menu,
  X,
  Home,
  ChevronRight
} from 'lucide-react';
import Overview from '../Components/Overview';
import Settings from '../Components/Settings';
import Profile from '../Components/Profile';
import Jobs from '../Components/Jobs';
import Applications from '../Components/Applications';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('Alex');
  const [timeOfDay, setTimeOfDay] = useState('');


  const navItems = [
    { id: 'overview', name: 'Overview', icon: <BarChart className="h-5 w-5" /> },
    { id: 'jobs', name: 'Jobs', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'applications', name: 'Applications', icon: <FileText className="h-5 w-5" /> },
    { id: 'profile', name: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> }
  ];

  useEffect(() => {
    // Set time of day greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('Good afternoon');
    } else {
      setTimeOfDay('Good evening');
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'jobs':
        return <Jobs />;
      case 'applications':
        return (
          <Applications />
        );
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <div>
            
            {/* Navigation */}
            <nav className="px-4 py-6 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.id === 'applications' && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                      6
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
          
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                className="p-2 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-3 lg:ml-0 text-xl font-semibold text-gray-800">
              {timeOfDay}, {userName}!
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="hidden md:block h-8 w-px bg-gray-200"></div>

              <div className="hidden md:flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/api/placeholder/50/50"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Search bar for mobile */}
        <div className="md:hidden p-4 bg-white border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Main content area with welcome banner */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto space-y-6">
           
            
            {/* Tab Content */}
            {renderTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;