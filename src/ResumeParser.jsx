import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';

function ResumeParser() {
    const [extractedText, setExtractedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    async function extractText(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        setIsLoading(true);
        try {
            const text = await pdfToText(file);
            // Format and clean the extracted text
            const cleanedText = cleanResumeText(text);
            setExtractedText(cleanedText);
        } catch (error) {
            console.error("Failed to extract text from pdf", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Function to clean and structure resume text
    function cleanResumeText(text) {
        // Remove excessive newlines and format sections
        let cleaned = text.replace(/\n{3,}/g, '\n\n');
        
        // Try to preserve resume structure
        const sections = ['experience', 'education', 'skills', 'projects', 'certifications', 'contact'];
        sections.forEach(section => {
            const regex = new RegExp(`(^|\\n)(${section}|${section.toUpperCase()}):?`, 'i');
            cleaned = cleaned.replace(regex, `\n\n## ${section.toUpperCase()} ##\n`);
        });
        
        return cleaned;
    }

    // Function to send to Gemini AI
    async function analyzeResume() {
        if (!extractedText) return;
        
        setIsLoading(true);
        try {
            // Prepare a prompt with instructions for analyzing the resume
            const prompt = `
            I'm sending you the text extracted from a resume PDF. Please analyze it and provide:
            
            1. A brief professional summary of the candidate
            2. Key skills and expertise areas (technical and soft skills)
            3. Suitable job roles or positions this person might be qualified for
            4. Provide a rating and suggestions for improvement.
            
            If some information appears incomplete or unclear, please indicate this in your analysis.
            
            Here is the resume text:
            
            ${extractedText}
            `;

            const url = `${import.meta.env.VITE_APP_URL}/public/gemini`


            const body = {
                question: prompt
            };
            
            // Call the Gemini model
            const response = await axios.post(url, body);
            // const data =await response;
            setAiResponse(response.data.candidates[0].content.parts[0].text);
            console.log()
        } catch (error) {
            console.error("Error analyzing resume with AI:", error);
            // setAiResponse("Failed to analyze the resume. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="App">
            <h1>Resume Analyzer</h1>
            
            <input type="file" accept="application/pdf" onChange={extractText}/>
            
            {isLoading && <p>Processing...</p>}
            
            {extractedText && (
                <div>
                    <h3>Extracted Resume Text:</h3>
                    <pre style={{ 
                        whiteSpace: 'pre-wrap', 
                        maxHeight: '300px', 
                        overflow: 'auto',
                        padding: '15px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}>
                        {extractedText}
                    </pre>
                    
                    <button 
                        onClick={analyzeResume}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            margin: '15px 0',
                            backgroundColor: '#4285f4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Analyze with Gemini
                    </button>
                </div>
            )}
            
            {aiResponse && (
                <div>
                    <h3>Resume Analysis:</h3>
                    <div style={{ 
                        padding: '15px',
                        border: '1px solid #4caf50',
                        borderRadius: '5px',
                        backgroundColor: '#f9fff9',
                        whiteSpace: 'pre-line'
                    }}>
                        {aiResponse}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResumeParser;