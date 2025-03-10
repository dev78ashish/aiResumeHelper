import { useState } from 'react';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">SkillSync</span>
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
            <a href="/#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
            <a href="/#testimonials" className="text-gray-700 hover:text-blue-600 transition">Testimonials</a>
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-500 transition">Login</a>
            <a href="/signup" className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Sign Up Free
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4">
          <a href="/#features" className="block py-2 text-gray-700 hover:text-blue-600 transition">Features</a>
          <a href="/#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600 transition">How It Works</a>
          <a href="/#testimonials" className="block py-2 text-gray-700 hover:text-blue-600 transition">Testimonials</a>
          <a href="/login" className="block py-2 text-blue-600 font-medium hover:text-blue-500 transition">Login</a>
          <a href="/signup" className="block mt-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-center">
            Sign Up Free
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;