
import React from 'react';
import { UserRole } from '../types';

interface LandingProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleCard: React.FC<{
    role: UserRole;
    title: string;
    description: string;
    icon: React.ReactNode;
    onSelect: (role: UserRole) => void;
}> = ({ role, title, description, icon, onSelect }) => (
    <div 
        onClick={() => onSelect(role)}
        className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200"
    >
        <div className="text-primary mx-auto w-16 h-16 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-center text-text-primary">{title}</h3>
        <p className="text-text-secondary text-center mt-2">{description}</p>
    </div>
);


const StudentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);
const TPOIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
);

export const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-text-primary tracking-tight">Welcome to AI Career Compass</h1>
            <p className="mt-4 text-xl text-text-secondary max-w-2xl mx-auto">Your personalized guidance platform for a successful career in Computer Science.</p>
        </header>
        <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-text-primary mb-8">Choose your role to get started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RoleCard 
                    role={UserRole.STUDENT}
                    title="I am a Student"
                    description="Get personalized career advice, internship suggestions, and skill roadmaps."
                    icon={<StudentIcon/>}
                    onSelect={onSelectRole}
                />
                <RoleCard 
                    role={UserRole.TPO}
                    title="I am a TPO"
                    description="Access student analytics and manage campus placement activities."
                    icon={<TPOIcon/>}
                    onSelect={onSelectRole}
                />
            </div>
        </div>
    </div>
  );
};
