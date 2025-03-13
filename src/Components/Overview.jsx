import React, { useEffect, useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Award, Briefcase, GraduationCap, Code, Trash2, FileUp, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import ReactMarkdown from 'react-markdown';
import { cleanObject, cleanResumeText, getScoreColor, parseAllDetails, removeAsterisksFromArray } from './helper';

function Overview() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExtractedText, setShowExtractedText] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('summary');

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setFile(uploadedFile);
    setError('');
    setLoading(true);

    // Simulate upload progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Extract text from PDF
      const text = await pdfToText(uploadedFile);
      const cleanedText = cleanResumeText(text);
      setExtractedText(cleanedText);

      // Analyze with Gemini AI
      await analyzeResume(cleanedText);

      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset progress after animation completes
      setTimeout(() => setUploadProgress(0), 800);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setError('Failed to process resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  const analyzeResume = async (text) => {
    try {
      const prompt = `
        Analyze this resume and provide:
        1. Professional Summary (2-3 sentences about the candidate)
        2. Key Skills (both technical and soft skills)
        3. Experience Highlights (key achievements and responsibilities)
        4. Education Overview
        5. Overall Score (0-100) based on resume quality
        6. Improvement Suggestions (specific areas to enhance)
        7. Recommended Job Roles (based on experience and skills)
        8. Personal Details (provide in exactly this format with one detail per line):
           Full Name: [name]
           Phone: [phone]
           Current Location: [location]
           Current Role: [role]
           Experience(in years): [years]
           Highest Education Qualification: [qualification]
           Availability: [availability]
          
        Format the response in clear sections with exactly these headings:
        "Professional Summary:"
        "Key Skills:"
        "Experience Highlights:"
        "Education Overview:"
        "Overall Score:"
        "Improvement Suggestions:"
        "Recommended Job Roles:"
        "Personal Details:"
          
        For Personal Details, maintain the exact format specified above. If information is not available, use "Not specified" as the value.
          
        Here's the resume:
          
        ${text}
      `;

      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/public/gemini`, {
        question: prompt
      });

      // Get AI response
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log(aiResponse)

      // Improved section extraction with more reliable regex patterns
      const extractBetweenHeadings = (text, heading, nextHeadings) => {
        // Create a regex that looks for the heading and captures all content until one of the next headings
        const headingPattern = heading.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

        // For the last heading, we don't need to look for next headings
        if (nextHeadings.length === 0) {
          const regex = new RegExp(`${headingPattern}:?\\s*([\\s\\S]*)$`, "i");
          const match = text.match(regex);
          return match ? match[1].trim() : '';
        }

        // For other headings, look for next headings
        const nextHeadingsPattern = nextHeadings
          .map(h => h.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"))
          .join("|");

        const regex = new RegExp(`${headingPattern}:?\\s*([\\s\\S]*?)(?=(${nextHeadingsPattern}):?|$)`, "i");
        const match = text.match(regex);
        return match ? match[1].trim() : '';
      };

      // Define all section headings
      const allHeadings = [
        "Professional Summary",
        "Key Skills",
        "Experience Highlights",
        "Education Overview",
        "Overall Score",
        "Improvement Suggestions",
        "Recommended Job Roles",
        "Personal Details"
      ];

      // Extract each section by looking ahead to the next possible headings
      const sections = {};
      allHeadings.forEach((heading, index) => {
        const nextHeadings = allHeadings.slice(index + 1);
        const content = extractBetweenHeadings(aiResponse, heading, nextHeadings);

        // Convert heading to camelCase for object keys
        const key = heading.split(' ')
          .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('');

        sections[key] = content;
      });

      // Parse score - look for a number between 0-100
      const scoreMatch = sections.overallScore ? sections.overallScore.match(/\b([0-9]{1,3})\b/) : null;
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

      // Process suggestions to create a structured array
      const suggestions = sections.improvementSuggestions
        ? sections.improvementSuggestions
          .split('\n')
          .filter(line => line.trim())
          .map(suggestion => {
            const parts = suggestion.split(':');
            if (parts.length > 1) {
              return {
                title: parts[0].trim().replace(/^[•\-\d.]+\s*/, ''),
                description: parts.slice(1).join(':').trim()
              };
            } else {
              return {
                title: suggestion.replace(/^[•\-\d.]+\s*/, '').trim(),
                description: ''
              };
            }
          })
        : [];

      // Process recommended roles to create an array
      const recommendedRoles = sections.recommendedJobRoles
        ? sections.recommendedJobRoles
          .split(/[•\n,]/)
          .map(role => role.trim())
          .filter(role => role && !role.match(/^[0-9.]+$/))
        : [];

      // Create final structured analysis object
      const personalDetails = parseAllDetails(sections.personalDetails);

      // Update the final structured analysis object to include details
      const structuredAnalysis = {
        summary: sections.professionalSummary || '',
        skills: sections.keySkills || '',
        experience: sections.experienceHighlights || '',
        education: sections.educationOverview || '',
        score: score,
        suggestions: cleanObject(suggestions),
        recommendedRoles: removeAsterisksFromArray(recommendedRoles),
        details: personalDetails // Add the personal details object
      };

      setAnalysis(structuredAnalysis);
    } catch (error) {
      console.error("Error analyzing resume with AI:", error);
      setError("Failed to analyze the resume. Please try again later.");
    }
  };



  const scoreColors = analysis ? getScoreColor(analysis.score) : { bg: '', text: '', ring: '' };

  // Modified tab array - removed improvements tab
  const tabs = [
    { id: 'summary', icon: <Briefcase />, label: 'Summary' },
    { id: 'skills', icon: <Code />, label: 'Skills' },
    { id: 'experience', icon: <Award />, label: 'Experience' },
    { id: 'education', icon: <GraduationCap />, label: 'Education' },
    { id: 'details', icon: <FileText />, label: 'Personal Info' },
  ];

  // Add these state variables to your component
  const [showNotice, setShowNotice] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Simulate the saving process (replace with actual save logic)
  useEffect(() => {
    if (isSaving) {
      // Simulate API call or database save
      const timer = setTimeout(() => {
        setIsSaving(false);
        setIsSaved(true);

        // Optional: Reset the saved state after some time
        const resetTimer = setTimeout(() => {
          setIsSaved(false);
        }, 3000);

        return () => clearTimeout(resetTimer);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSaving]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            AI Resume Helper
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get AI-powered analysis and suggestions to land your dream job
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 transform transition-all hover:shadow-lg">
          <div className="flex items-center justify-center">
            {!file ? (
              <div className="w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-16 h-16 text-blue-500 mb-4" />
                    <p className="mb-2 text-lg font-medium text-blue-700">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-blue-600">PDF (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center space-x-4 w-full">
                <div className="w-16 h-16 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setExtractedText('');
                    setAnalysis(null);
                  }}
                  className="flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center animate-pulse">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-base font-medium text-blue-700">Analyzing your resume with AI...</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-md p-8 transition-all transform hover:shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Resume Analysis</h2>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center ${scoreColors.bg} ${scoreColors.text} text-3xl font-bold w-24 h-24 rounded-full ring-4 ${scoreColors.ring} transform transition-all hover:scale-105`}>
                    {analysis.score}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Resume Score</p>
                    <p className={`text-lg font-semibold ${scoreColors.text}`}>
                      {analysis.score >= 80 ? 'Excellent!' :
                        analysis.score >= 60 ? 'Good' : 'Needs Work'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Roles */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all transform hover:shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 text-indigo-500 mr-2" />
                Recommended Job Roles
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {analysis.recommendedRoles.length > 0 ? (
                  analysis.recommendedRoles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 transform transition-all hover:-translate-y-1 hover:shadow"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No specific roles recommended.</p>
                )}
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-6 space-x-2 font-medium text-sm transition-all ${activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'summary' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Summary</h3>
                    <ReactMarkdown>{analysis.summary}</ReactMarkdown>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Skills</h3>
                    <ReactMarkdown>{analysis.skills}</ReactMarkdown>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Experience Highlights</h3>
                    <ReactMarkdown>{analysis.experience}</ReactMarkdown>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
                    <ReactMarkdown>{analysis.education}</ReactMarkdown>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="prose max-w-none">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                      <div className="space-x-2">
                        {!showNotice && !showConfirm && !isSaving && !isSaved ? (
                          <button
                            onClick={() => setShowNotice(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Save Details
                          </button>
                        ) : showNotice ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Your details will be saved in our database which you can change later.</span>
                            <button
                              onClick={() => {
                                setShowNotice(false);
                                setShowConfirm(true);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              Continue
                            </button>
                          </div>
                        ) : showConfirm ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Confirm save?</span>
                            <button
                              onClick={() => {
                                setShowConfirm(false);
                                setIsSaving(true);
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => {
                                setShowNotice(false);
                                setShowConfirm(false);
                              }}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : isSaving ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Saving...</span>
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm text-green-600 font-medium">Saved successfully!</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.details && Object.entries(analysis.details).map(([key, value]) => (
                        <div key={key} className="flex flex-col p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-500 capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="font-medium">{value || 'Not specified'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Improvements Section - Now below tabs instead of as a tab */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all transform hover:shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                Suggested Improvements
              </h2>
              <div className="space-y-4">
                {analysis.suggestions.length > 0 ? (
                  analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start p-4 rounded-lg bg-blue-50 border border-blue-100 transform transition-all hover:shadow hover:bg-blue-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <span className="text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {suggestion.title}
                        </p>
                        {suggestion.description && (
                          <p className="mt-1 text-sm text-gray-600">
                            {suggestion.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No specific improvements suggested.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Extracted Text (Toggle) */}
        {extractedText && (
          <div className="mt-8">
            <button
              onClick={() => setShowExtractedText(!showExtractedText)}
              className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center text-sm text-gray-600">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                <span>Extracted Resume Text</span>
              </span>
              {showExtractedText ?
                <ChevronUp className="w-5 h-5 text-gray-500" /> :
                <ChevronDown className="w-5 h-5 text-gray-500" />
              }
            </button>

            {showExtractedText && (
              <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 whitespace-pre-wrap">
                {extractedText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;