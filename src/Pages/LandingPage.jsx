import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Briefcase, LineChart, ChevronDown, X, Mail, Moon, Star, Code, Shield, Users } from 'lucide-react';
import home from '../assets/home.png';

const LandingPage = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect Job Match</span>
              <span className="block text-blue-400">Powered by AI</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300">
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
              <a href="#how-it-works" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-400 bg-gray-800 hover:bg-gray-700 md:text-lg">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6">
            {/* Abstract illustration in the background */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500 bg-opacity-10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-500 bg-opacity-10 rounded-full blur-xl"></div>

            {!showDemo ? (
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 relative z-10">
                <div className="absolute top-0 right-0 p-4">
                  <Moon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <Star className="h-6 w-6 text-purple-400" />
                </div>
                <img
                  className="w-full h-auto"
                  src={home}
                  alt="Dashboard preview"
                />
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden p-6 border border-gray-700 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Try SkillSync Now</h3>
                  <button onClick={() => setShowDemo(false)} className="text-gray-400 hover:text-gray-200">
                    <X size={20} />
                  </button>
                </div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-300">Upload your resume</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md bg-gray-700">
                        <div className="space-y-1 text-center">
                          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-400">
                            <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-400 hover:text-blue-300">
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
                    <h3 className="mt-2 text-lg font-medium text-white">Thanks for trying SkillSync!</h3>
                    <p className="mt-1 text-sm text-gray-400">We'll analyze your resume and get back to you shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-400 bg-gray-700 hover:bg-gray-600"
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
      <section id="features" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to land your perfect job
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Feature 1 */}
            <div className="bg-gray-900 rounded-lg p-6 hover:shadow-md transition hover:translate-y-1 border border-gray-700 relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500 bg-opacity-5 rounded-bl-full"></div>
              <div className="bg-gray-800 inline-flex p-3 rounded-md">
                <LineChart className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">AI Resume Analysis</h3>
              <p className="mt-2 text-gray-300">
                Our AI analyzes your resume, extracts key skills, and provides personalized improvement suggestions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Identifies your strongest skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Suggests improvements to highlight</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Tailors resume for specific industries</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 rounded-lg p-6 hover:shadow-md transition hover:translate-y-1 border border-gray-700 relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500 bg-opacity-5 rounded-bl-full"></div>
              <div className="bg-gray-800 inline-flex p-3 rounded-md">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Smart Job Matching</h3>
              <p className="mt-2 text-gray-300">
                Get job recommendations that perfectly match your skills, experience, and career goals.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Curated job matches based on your profile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Personalized job search filters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Daily updates with new opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How SkillSync Works
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Three simple steps to finding your perfect job match
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-blue-500 bg-opacity-5 rounded-bl-full"></div>
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="mt-4 text-lg font-medium text-white">Upload Your Resume</h3>
              <p className="mt-2 text-gray-300">
                Simply upload your resume in PDF or DOC format to get started.
              </p>
              {/* <div className="mt-4 text-blue-400 hover:text-blue-300 cursor-pointer">Learn more →</div> */}
            </div>

            {/* Step 2 */}
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-purple-500 bg-opacity-5 rounded-bl-full"></div>
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="mt-4 text-lg font-medium text-white">AI Analyzes Your Profile</h3>
              <p className="mt-2 text-gray-300">
                Our AI engine extracts your skills and experience to create your profile.
              </p>
              {/* <div className="mt-4 text-blue-400 hover:text-blue-300 cursor-pointer">Learn more →</div> */}
            </div>

            {/* Step 3 */}
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-blue-500 bg-opacity-5 rounded-bl-full"></div>
              <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="mt-4 text-lg font-medium text-white">Get Matched With Jobs</h3>
              <p className="mt-2 text-gray-300">
                Browse personalized job recommendations based on your unique skill set.
              </p>
              {/* <div className="mt-4 text-blue-400 hover:text-blue-300 cursor-pointer">Learn more →</div> */}
            </div>
          </div>
        </div>
      </section>



      <section id="statistics" className="py-16 bg-gray-800 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Proven Results
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              SkillSync is trusted by job seekers worldwide
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-400">95%</div>
              <p className="mt-2 text-gray-300">Matching Accuracy</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-400">10k+</div>
              <p className="mt-2 text-gray-300">Active Users</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-400">4.8</div>
              <p className="mt-2 text-gray-300">Average Rating</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-400">75%</div>
              <p className="mt-2 text-gray-300">Faster Job Search</p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to know about SkillSync
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <button className="flex w-full justify-between items-center text-left" onClick={() => { }}>
                <h3 className="text-lg font-medium text-white">How accurate is the AI resume analysis?</h3>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              <div className="mt-2 text-gray-300">
                Our AI resume analysis is 95% accurate, trained on millions of resumes and job descriptions across various industries. The AI continues to learn and improve based on user feedback and outcomes.
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <button className="flex w-full justify-between items-center text-left" onClick={() => { }}>
                <h3 className="text-lg font-medium text-white">Is my resume data secure?</h3>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              <div className="mt-2 text-gray-300">
                Absolutely. We use enterprise-grade encryption for all data. Your resume information is never shared with third parties without your explicit permission. We comply with GDPR, CCPA, and other privacy regulations.
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <button className="flex w-full justify-between items-center text-left" onClick={() => { }}>
                <h3 className="text-lg font-medium text-white">How long does it take to analyze my resume?</h3>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              <div className="mt-2 text-gray-300">
                Our AI system analyzes your resume within minutes. You'll receive an initial analysis in under 5 minutes, with more detailed insights available shortly after.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 bg-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Find Your Perfect Job?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300">
                Join thousands of professionals who have already found their dream jobs using SkillSync.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose SkillSync
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="bg-gray-800 inline-flex p-3 rounded-full mx-auto">
                <Code className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Advanced AI</h3>
              <p className="mt-2 text-gray-300">State-of-the-art technology</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-800 inline-flex p-3 rounded-full mx-auto">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Data Security</h3>
              <p className="mt-2 text-gray-300">Enterprise-grade protection</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-800 inline-flex p-3 rounded-full mx-auto">
                <LineChart className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Analytics</h3>
              <p className="mt-2 text-gray-300">Gain valuable insights</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-800 inline-flex p-3 rounded-full mx-auto">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">User-Friendly</h3>
              <p className="mt-2 text-gray-300">Seamless and intuitive design</p>
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

  )
};

export default LandingPage;