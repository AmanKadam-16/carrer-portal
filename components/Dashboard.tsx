
import React, { useState } from 'react';
import type { User } from '../types';
import CareerSuggestions from './CareerSuggestions';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateProfile: (profile: User['profile']) => void;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const CareerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const LogoutIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);


const ProfileView: React.FC<{ profile: User['profile'] }> = ({ profile }) => {
    if (!profile) return <div>No profile data available.</div>;
    return (
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-text-primary mb-4">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-primary">
                <div><strong>Name:</strong> {profile.fullName}</div>
                <div><strong>Email:</strong> {profile.email}</div>
                <div><strong>College:</strong> {profile.college}</div>
                <div><strong>Department:</strong> {profile.department}</div>
                <div><strong>Current Year:</strong> {profile.currentYear}</div>
                <div><strong>GPA:</strong> {profile.gpa}</div>
                <div className="md:col-span-2"><strong>Interests:</strong> {profile.interests.join(', ')}</div>
                <div className="md:col-span-2"><strong>Skills:</strong> {profile.skills.join(', ')}</div>
                <div className="md:col-span-2"><strong>Completed Courses:</strong> {profile.completedCourses.join(', ')}</div>
            </div>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpdateProfile }) => {
  const [activeView, setActiveView] = useState('suggestions');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileView profile={user.profile} />;
      case 'suggestions':
        return user.profile ? <CareerSuggestions profile={user.profile} /> : <div>Please complete your profile first.</div>;
      default:
        return <div>Select an option</div>;
    }
  };
  
  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    viewName: string;
    activeView: string;
    onClick: (view: string) => void;
  }> = ({ icon, label, viewName, activeView, onClick }) => (
    <button
      onClick={() => onClick(viewName)}
      className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 rounded-lg ${
        activeView === viewName
          ? 'bg-primary text-white'
          : 'text-text-secondary hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`bg-card text-text-primary w-64 p-4 space-y-4 flex-shrink-0 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} absolute md:relative z-20`}>
        <div>
          <h1 className="text-2xl font-bold text-primary mb-8">AI Career Compass</h1>
          <nav className="space-y-2">
            <NavItem icon={<CareerIcon />} label="AI Guidance" viewName="suggestions" activeView={activeView} onClick={() => { setActiveView('suggestions'); setSidebarOpen(false); }} />
            <NavItem icon={<UserIcon />} label="My Profile" viewName="profile" activeView={activeView} onClick={() => { setActiveView('profile'); setSidebarOpen(false); }} />
          </nav>
        </div>
        <div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-left text-text-secondary hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors duration-200"
          >
            <LogoutIcon />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6 md:mb-8">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-200">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
           </button>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-text-primary">Welcome, {user.profile?.fullName || user.email}</h2>
            <p className="text-sm text-text-secondary">Ready to discover your future?</p>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
