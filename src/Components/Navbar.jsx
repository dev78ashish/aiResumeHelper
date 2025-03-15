import { useState, useContext } from 'react';
import { Briefcase, Home, LogIn, UserPlus, LogOut, Menu, X, Search, ChevronDown, Code, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = ({ showAlert }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    showAlert("Logout successful!", "success");
  }
  
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <Briefcase className="h-8 w-8 text-white relative z-10" />
              </div>
              <span className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">SkillSync</span>
              <Sparkles className="h-4 w-4 text-purple-400 ml-1 animate-pulse" />
            </Link>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/" className="flex items-center text-gray-300 hover:text-blue-400 transition">
                <Home className="h-5 w-5 mr-1" /> Home
              </Link>
              
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogOut}
                  className="flex items-center px-4 py-2 rounded-md border border-red-400 text-red-400 font-medium hover:bg-red-900 hover:bg-opacity-30 transition"
                >
                  <LogOut className="h-5 w-5 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="flex items-center px-4 py-2 rounded-md text-blue-400 font-medium hover:bg-blue-900 hover:bg-opacity-30 transition">
                  <LogIn className="h-5 w-5 mr-1" /> Login
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md relative group">
                  <div className="absolute inset-0 rounded-md bg-blue-500 blur-sm opacity-30 group-hover:opacity-50 transition"></div>
                  <UserPlus className="h-5 w-5 mr-1 relative z-10" /> 
                  <span className="relative z-10">Sign Up Free</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-4 shadow-lg">          
          <div className="space-y-3">
            <Link to="/" className="flex items-center py-2 text-gray-300 hover:text-blue-400 transition">
              <Home className="h-5 w-5 mr-2" /> Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogOut}
                  className="flex items-center py-2 text-red-400 font-medium hover:text-red-300 transition w-full text-left"
                >
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center py-2 text-blue-400 font-medium hover:text-blue-300 transition">
                  <LogIn className="h-5 w-5 mr-2" /> Login
                </Link>
                <Link to="/signup" className="block mt-2 flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md">
                  <UserPlus className="h-5 w-5 mr-2" /> Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Decorative illustrations */}
      <div className="hidden md:block absolute right-0 top-0 h-16 w-40">
        <div className="absolute right-0 top-0 h-16 w-40 bg-gradient-to-l from-purple-500 to-transparent opacity-10"></div>
      </div>
      <div className="hidden md:block absolute left-0 top-0 h-16 w-40">
        <div className="absolute left-0 top-0 h-16 w-40 bg-gradient-to-r from-blue-500 to-transparent opacity-10"></div>
      </div>
    </nav>
  );
};

export default Navbar;