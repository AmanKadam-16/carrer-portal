
import React, { useState, useCallback } from 'react';
import type { StudentProfile } from '../types';
import { getCareerSuggestions } from '../services/geminiService';

interface CareerSuggestionsProps {
  profile: StudentProfile;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    <p className="text-text-secondary">Generating your personalized career roadmap...</p>
  </div>
);

const CareerSuggestions: React.FC<CareerSuggestionsProps> = ({ profile }) => {
  const [suggestions, setSuggestions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions('');
    try {
      const result = await getCareerSuggestions(profile);
      setSuggestions(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);
  
  const parseMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-primary mt-6 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**')) {
            const parts = line.split('**');
            return <p key={index} className="my-1"><span className="font-semibold">{parts[1]}</span>{parts[2]}</p>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index} className="my-1">{line}</p>;
      });
  };


  return (
    <div className="p-4 sm:p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-text-primary mb-4">AI Career Guidance</h2>
      <p className="text-text-secondary mb-6">
        Get personalized career suggestions, internship recommendations, and skill-enhancement plans based on your profile.
      </p>
      
      {!suggestions && !isLoading && (
        <div className="text-center">
            <button
                onClick={handleGenerateSuggestions}
                disabled={isLoading}
                className="bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-indigo-300"
            >
                {isLoading ? 'Generating...' : '✨ Generate My Career Roadmap'}
            </button>
        </div>
      )}

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
      
      {suggestions && (
         <div className="prose max-w-none text-text-primary bg-gray-50 p-4 rounded-lg">
           {parseMarkdown(suggestions)}
            <button
                onClick={handleGenerateSuggestions}
                disabled={isLoading}
                className="mt-8 bg-secondary hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-emerald-300"
            >
                {isLoading ? 'Regenerating...' : '🔄 Regenerate Suggestions'}
            </button>
         </div>
      )}
    </div>
  );
};

export default CareerSuggestions;
