
import { GoogleGenAI } from "@google/genai";
import type { StudentProfile } from '../types';

const getApiKey = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
};

export const getCareerSuggestions = async (profile: StudentProfile): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const prompt = `
      You are an expert career counselor for Computer Science and Engineering students in India. 
      Based on the following student profile, provide personalized and actionable guidance.

      **Student Profile:**
      - **Full Name:** ${profile.fullName}
      - **College:** ${profile.college}
      - **Department:** ${profile.department}
      - **Current Year:** ${profile.currentYear}
      - **Overall GPA:** ${profile.gpa}
      - **Interests:** ${profile.interests.join(', ')}
      - **Skills:** ${profile.skills.join(', ')}
      - **Completed Courses:** ${profile.completedCourses.join(', ')}

      Please provide the following in a well-structured Markdown format:

      ### 1. Top 3 Career Path Suggestions
      For each career path, provide:
      - A brief description of the role.
      - Why it's a good fit for this student's profile (connect it to their skills and interests).
      - Key companies in India that hire for this role.

      ### 2. Recommended Internships
      Suggest 3 specific types of internships that would be beneficial. For each, describe:
      - The kind of work involved.
      - How it aligns with their potential career paths.

      ### 3. Skill Enhancement Plan
      List 3-5 concrete skills or online courses/certifications to pursue next. For each, explain:
      - Why this skill/course is important.
      - Suggest a popular platform (like Coursera, Udemy, NPTEL) to find it.

      ### 4. Project Ideas
      Propose 2-3 project ideas that the student could build to strengthen their resume, tailored to their skills and interests.

      Keep the tone encouraging, professional, and highly relevant to the Indian tech industry.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating career suggestions:", error);
    if (error instanceof Error) {
        return `An error occurred while fetching suggestions: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while fetching suggestions.";
  }
};
