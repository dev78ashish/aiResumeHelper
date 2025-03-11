import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Briefcase, LineChart, ChevronDown, X, Mail } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
              <button 
                onClick={() => setShowDemo(true)} 
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a href="#how-it-works" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:text-lg">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6">
            {!showDemo ? (
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                  className="w-full h-auto"
                  src="/api/placeholder/600/400"
                  alt="Dashboard preview"
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Try SkillSync Now</h3>
                  <button onClick={() => setShowDemo(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload your resume</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input id="resume" name="resume" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF or DOC up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Thanks for trying SkillSync!</h3>
                    <p className="mt-1 text-sm text-gray-500">We'll analyze your resume and get back to you shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            )}
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
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition hover:translate-y-1">
              <div className="bg-blue-100 inline-flex p-3 rounded-md">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI Resume Analysis</h3>
              <p className="mt-2 text-gray-600">
                Our AI analyzes your resume, extracts key skills, and provides personalized improvement suggestions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Identifies your strongest skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Suggests improvements to highlight</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Tailors resume for specific industries</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition hover:translate-y-1">
              <div className="bg-blue-100 inline-flex p-3 rounded-md">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Job Matching</h3>
              <p className="mt-2 text-gray-600">
                Get job recommendations that perfectly match your skills, experience, and career goals.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Curated job matches based on your profile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Personalized job search filters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Daily updates with new opportunities</span>
                </li>
              </ul>
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
            <div className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Upload Your Resume</h3>
              <p className="mt-2 text-gray-600">
                Simply upload your resume in PDF or DOC format to get started.
              </p>
              <div className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer">Learn more →</div>
            </div>
            
            {/* Step 2 */}
            <div className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI Analyzes Your Profile</h3>
              <p className="mt-2 text-gray-600">
                Our AI engine extracts your skills and experience to create your profile.
              </p>
              <div className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer">Learn more →</div>
            </div>
            
            {/* Step 3 */}
            <div className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Get Matched With Jobs</h3>
              <p className="mt-2 text-gray-600">
                Browse personalized job recommendations based on your unique skill set.
              </p>
              <div className="mt-4 text-blue-600 hover:text-blue-700 cursor-pointer">Learn more →</div>
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
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition">
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
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition">
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
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition">
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
                "SkillSync's job matching feature saved me so much time. I found relevant positions that matched my skills perfectly."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter/Contact Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-blue-700 shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Ready to Find Your Perfect Job Match?
                  </h2>
                  <p className="mt-4 text-lg text-blue-100">
                    Join thousands of professionals who have accelerated their career with SkillSync
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <form className="sm:flex">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 rounded-md"
                      placeholder="Enter your email"
                    />
                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Join Now
                      </button>
                    </div>
                  </form>
                  <p className="mt-3 text-sm text-blue-200">
                    We care about your data. Read our <a href="#" className="text-white font-medium underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Copyright */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2025 SkillSync. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;