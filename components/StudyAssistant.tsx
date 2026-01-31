import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { Bot, Sparkles, Loader2, BookOpenCheck } from 'lucide-react';
import { Semester } from '../types';

interface StudyAssistantProps {
  course: string;
  semester: string;
  subject: string;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({ course, semester, subject }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGeneratePlan = async () => {
    if (!subject) return;
    setLoading(true);
    setResponse(null);
    try {
      const plan = await generateStudyPlan(subject, course, semester);
      setResponse(plan);
    } catch (e) {
      setResponse("Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  if (!course || !subject) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6 mb-8 text-center shadow-sm">
            <div className="flex justify-center mb-3 text-ru-blue">
                <Bot size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Gemini AI Study Companion</h3>
            <p className="text-gray-600 text-sm">Select a Course and Subject above to unlock AI-powered study plans and topic summaries.</p>
        </div>
    );
  }

  return (
    <div className="bg-white border-l-4 border-ru-accent rounded-r-lg shadow-md p-6 mb-8 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-ru-light rounded-lg text-ru-blue">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Need help with {subject}?</h3>
            <p className="text-sm text-gray-500">Generate a study roadmap using Gemini AI.</p>
          </div>
        </div>
        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="flex items-center space-x-2 bg-ru-blue hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Bot size={16} />}
          <span>{loading ? 'Analyzing...' : 'Generate Study Plan'}</span>
        </button>
      </div>

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm leading-relaxed text-gray-800 animate-in fade-in slide-in-from-top-4">
           <div className="flex items-center mb-3 text-ru-accent font-semibold border-b pb-2 border-gray-200">
                <BookOpenCheck size={18} className="mr-2"/>
                AI Generated Study Guide
           </div>
           <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-sans">
              {response}
           </div>
        </div>
      )}
    </div>
  );
};
