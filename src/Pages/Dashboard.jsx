import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Bell,
  User,
  Search,
  FileText,
  BarChart,
  SettingsIcon,
  Menu,
  LogOut
} from 'lucide-react';
import Overview from '../Components/Overview';
import Settings from '../Components/Settings';
import Profile from '../Components/Profile';
import Jobs from '../Components/Jobs';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const Dashboard = ({ showAlert }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [allDetails, setAllDetails] = useState(null);
  const { logout } = useAuth();

  const navItems = [
    { id: 'overview', name: 'Overview', icon: <BarChart className="h-5 w-5" /> },
    { id: 'jobs', name: 'Jobs', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'profile', name: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> }
  ];

  const fetchInfo = async () => {
    const url = `${import.meta.env.VITE_APP_URL}/userinfo`;
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setAllDetails(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

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
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    // Add logout functionality here
    logout();
    showAlert("Logout successful!", "success");
    // Redirect to login page or handle logout as needed
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview showAlert={showAlert} fetchInfo={fetchInfo} />;
      case 'jobs':
        return <Jobs showAlert={showAlert} />;
      case 'profile':
        return <Profile allDetails={allDetails} showAlert={showAlert} />;
      case 'settings':
        return <Settings allDetails={allDetails} fetchInfo={fetchInfo} showAlert={showAlert} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex max-h-[calc(100vh-64px)] bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="px-4 py-6 space-y-1 flex-grow">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User profile in sidebar */}
          <div className="border-t border-gray-200 p-4 text-blue-600 bg-blue-50">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={allDetails?.avatar ||  null}
                alt="User icon"
              />
              <div className="ml-3">
                <p className="text-base font-medium">{allDetails?.fullname || "Set your name"}</p>
                <p className="text-xs truncate">
                  {allDetails?.username || 'user@example.com'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </button>
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
                {timeOfDay}, {allDetails?.fullname || "user"}!
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

              {/* User menu for lg:hidden screens */}
              <div className="lg:hidden relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={allDetails?.avatar|| null}
                    alt="User avatar"
                  />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-700">{allDetails?.fullname || ""}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {allDetails?.username || 'null'}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
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

        {/* Main content area with fixed header and scrollable content */}
        <main className="flex-1 overflow-hidden bg-gray-100">
          <div className="h-full max-w-7xl mx-auto p-4 sm:p-6">
            {/* Tab Content with its own scrollable area */}
            <div className="h-full overflow-auto">
              {renderTab()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;