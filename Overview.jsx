import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import ReactMarkdown from 'react-markdown';

function Overview() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    try {
      // Extract text from PDF
      const text = await pdfToText(uploadedFile);
      const cleanedText = cleanResumeText(text);
      setExtractedText(cleanedText);

      // Analyze with Gemini AI
      await analyzeResume(cleanedText);
    } catch (err) {
      setError('Failed to process resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cleanResumeText = (text) => {
    let cleaned = text.replace(/\n{3,}/g, '\n\n');
    
    const sections = ['experience', 'education', 'skills', 'projects', 'certifications', 'contact'];
    sections.forEach(section => {
      const regex = new RegExp(`(^|\\n)(${section}|${section.toUpperCase()}):?`, 'i');
      cleaned = cleaned.replace(regex, `\n\n## ${section.toUpperCase()} ##\n`);
    });
    
    return cleaned;
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

        Format the response in clear sections with exactly these headings:
        "Professional Summary:"
        "Key Skills:"
        "Experience Highlights:"
        "Education Overview:"
        "Overall Score:"
        "Improvement Suggestions:"
        "Recommended Job Roles:"
        "New Changes:"

        Here's the resume:

        ${text}
      `;

      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/public/gemini`, {
        question: prompt
      });

      // Get AI response
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log("Raw AI response:", aiResponse); // Add logging for debugging
      
      // Improved section extraction with more reliable regex patterns
      const extractBetweenHeadings = (text, heading, nextHeadings) => {
        // Create a regex that looks for the heading and captures all content until one of the next headings
        const headingPattern = heading.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
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
        "New Changes"
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
        console.log(content)
      });
      
      // console.log("Extracted sections:", sections); // Add logging for debugging

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
      const structuredAnalysis = {
        summary: sections.professionalSummary || '',
        skills: sections.keySkills || '',
        experience: sections.experienceHighlights || '',
        education: sections.educationOverview || '',
        score: score,
        suggestions: suggestions,
        recommendedRoles: recommendedRoles
      };

      // console.log("Structured analysis:", structuredAnalysis); // Add logging for debugging

      setAnalysis(structuredAnalysis);
    } catch (error) {
      console.error("Error analyzing resume with AI:", error);
      setError("Failed to analyze the resume. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Helper</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload your resume and get AI-powered analysis and suggestions
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-center">
            {!file ? (
              <div className="w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
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
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setExtractedText('');
                    setAnalysis(null);
                  }}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-sm text-blue-600">Analyzing your resume...</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Resume Analysis</h2>
                <div className={`text-2xl font-bold px-4 py-2 rounded-full ${
                  analysis.score >= 80 ? 'bg-green-100 text-green-700' :
                  analysis.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {analysis.score}/100
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Professional Summary</h2>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{analysis.summary}</ReactMarkdown>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Key Skills</h2>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{analysis.skills}</ReactMarkdown>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Experience Highlights</h2>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{analysis.experience}</ReactMarkdown>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Education</h2>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{analysis.education}</ReactMarkdown>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Suggested Improvements
              </h2>
              <div className="space-y-4">
                {analysis.suggestions.length > 0 ? (
                  analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {suggestion.title}
                        </p>
                        {suggestion.description && (
                          <p className="mt-1 text-sm text-gray-500">
                            {suggestion.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No specific improvements suggested.</p>
                )}
              </div>
            </div>

            {/* Recommended Roles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recommended Job Roles
              </h2>
              <div className="flex flex-wrap gap-2">
                {analysis.recommendedRoles.length > 0 ? (
                  analysis.recommendedRoles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No specific roles recommended.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Extracted Text (Hidden by default) */}
        {extractedText && (
          <div className="mt-6">
            <details className="bg-white rounded-lg shadow-sm">
              <summary className="p-4 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                View Extracted Text
              </summary>
              <pre className="p-4 text-sm text-gray-600 whitespace-pre-wrap border-t border-gray-200">
                {extractedText}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;