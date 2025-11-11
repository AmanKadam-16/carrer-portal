
import React, { useState } from 'react';
import type { StudentProfile, User } from '../types';

interface ProfileSetupProps {
  user: User;
  onProfileComplete: (profile: StudentProfile) => void;
}

const InputField: React.FC<{id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, placeholder?: string}> = 
({id, label, value, onChange, required=true, placeholder}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-secondary">{label}</label>
        <input type="text" id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
    </div>
);

const TagInput: React.FC<{id: string, label: string, tags: string[], setTags: (tags: string[]) => void, placeholder: string}> = 
({id, label, tags, setTags, placeholder}) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue('');
        }
    };
    
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-text-secondary">{label}</label>
            <div className="mt-1 flex flex-wrap items-center w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center bg-primary text-white text-sm font-medium mr-2 mb-1 px-2.5 py-0.5 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-2 text-white hover:text-indigo-200">
                          &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    id={id}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent border-none focus:ring-0 sm:text-sm text-text-primary"
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">Press Enter or Comma to add an item.</p>
        </div>
    );
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onProfileComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    currentYear: '3rd Year',
    department: 'Computer Science & Engineering',
    college: '',
    gpa: '',
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>(['Java', 'React']);
  const [completedCourses, setCompletedCourses] = useState<string[]>(['Data Structures']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: StudentProfile = {
      id: user.id,
      email: user.email,
      ...formData,
      interests,
      skills,
      completedCourses,
    };
    onProfileComplete(profile);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 p-10 bg-card shadow-lg rounded-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-text-primary">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            This information will help us personalize your career guidance.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} placeholder="e.g., Anjali Sharma"/>
                <InputField id="rollNumber" label="Roll Number" value={formData.rollNumber} onChange={handleChange} placeholder="e.g., 20CS123"/>
                <InputField id="currentYear" label="Current Year of Study" value={formData.currentYear} onChange={handleChange} />
                <InputField id="department" label="Department" value={formData.department} onChange={handleChange} />
                <InputField id="college" label="College Name" value={formData.college} onChange={handleChange} placeholder="e.g., IIT Bombay"/>
                <InputField id="gpa" label="Overall GPA (out of 10)" value={formData.gpa} onChange={handleChange} placeholder="e.g., 8.5"/>
            </div>
            
            <TagInput id="skills" label="Skills" tags={skills} setTags={setSkills} placeholder="Add a skill..."/>
            <TagInput id="interests" label="Interests" tags={interests} setTags={setInterests} placeholder="Add an interest..."/>
            <TagInput id="completedCourses" label="Completed Courses" tags={completedCourses} setTags={setCompletedCourses} placeholder="Add a course..."/>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Save and Continue
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
