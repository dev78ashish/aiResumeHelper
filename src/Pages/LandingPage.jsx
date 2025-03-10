import React, { useState } from 'react';
// import { a } from 'react-router-dom';
import { ArrowRight, CheckCircle, Briefcase, Award, LineChart } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">SkillSync</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">Testimonials</a>
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
            <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 transition">Features</a>
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600 transition">How It Works</a>
            <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600 transition">Testimonials</a>
            <a href="/login" className="block py-2 text-blue-600 font-medium hover:text-blue-500 transition">Login</a>
            <a href="/signup" className="block mt-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-center">
              Sign Up Free
            </a>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect Job Match</span>
              <span className="block text-blue-600">Powered by AI</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              SkillSync analyzes your resume and matches you with the best-fit job opportunities using advanced AI. Get personalized recommendations and improve your chances of landing your dream job.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="/signup" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#how-it-works" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:text-lg">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img
                className="w-full h-auto"
                src="/api/placeholder/600/400"
                alt="Dashboard preview"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to land your perfect job
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="bg-blue-100 inline-flex p-3 rounded-md">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI Resume Analysis</h3>
              <p className="mt-2 text-gray-600">
                Our AI analyzes your resume, extracts key skills, and provides personalized improvement suggestions.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="bg-blue-100 inline-flex p-3 rounded-md">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Job Matching</h3>
              <p className="mt-2 text-gray-600">
                Get job recommendations that perfectly match your skills, experience, and career goals.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="bg-blue-100 inline-flex p-3 rounded-md">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Application Tracking</h3>
              <p className="mt-2 text-gray-600">
                Track your applications, save favorite jobs, and earn badges as you progress in your job search.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How SkillSync Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Three simple steps to finding your perfect job match
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Upload Your Resume</h3>
              <p className="mt-2 text-gray-600">
                Simply upload your resume in PDF or DOC format to get started.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI Analyzes Your Profile</h3>
              <p className="mt-2 text-gray-600">
                Our AI engine extracts your skills and experience to create your profile.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Get Matched With Jobs</h3>
              <p className="mt-2 text-gray-600">
                Browse personalized job recommendations based on your unique skill set.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              See how SkillSync has helped professionals find their dream jobs
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="/api/placeholder/100/100"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">Software Developer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "SkillSync helped me find a job that perfectly matched my technical skills. The AI resume analysis was spot on and showed me areas to improve."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="/api/placeholder/100/100"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600">UX Designer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "I was amazed by how quickly I started getting interviews after using SkillSync. The job matching algorithm really works!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="/api/placeholder/100/100"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Jessica Rivera</h4>
                  <p className="text-gray-600">Marketing Specialist</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The application tracking feature saved me so much time. I could see all my applications in one place and never missed a deadline."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Find Your Perfect Job Match?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of professionals who have accelerated their career with SkillSync
          </p>
          <div className="mt-8 flex justify-center">
            <a href="/signup" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg">
              Get Started Free
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium">SkillSync</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">aedIn</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© 2025 SkillSync. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">aedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;