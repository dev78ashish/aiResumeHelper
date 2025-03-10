import { useState, useContext } from 'react';
import { Briefcase, Home, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">SkillSync</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center text-red-600 font-medium hover:text-red-500 transition"
              >
                <LogOut className="h-5 w-5 mr-1" /> Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-blue-600 font-medium hover:text-blue-500 transition">
                  <LogIn className="h-5 w-5 mr-1" /> Login
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                  <UserPlus className="h-5 w-5 mr-1" /> Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4">
          <Link to="/" className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition">
            <Home className="h-5 w-5 mr-2" /> Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center py-2 text-red-600 font-medium hover:text-red-500 transition w-full text-left"
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="flex items-center py-2 text-blue-600 font-medium hover:text-blue-500 transition">
                <LogIn className="h-5 w-5 mr-2" /> Login
              </Link>
              <Link to="/signup" className="block mt-2 flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                <UserPlus className="h-5 w-5 mr-2" /> Sign Up Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;