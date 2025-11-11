
import React, { useState, useEffect } from 'react';
import { UserRole, Page, User, StudentProfile } from './types';
import { Landing } from './components/Landing';
import { Auth } from './components/Auth';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check local storage for a logged-in user to persist session
    const storedUser = localStorage.getItem('careerCompassUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.profile) {
        setPage(Page.DASHBOARD);
      } else {
        setPage(Page.PROFILE_SETUP);
      }
    }
  }, []);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setPage(Page.AUTH);
  };

  const handleLogin = (email: string, role: UserRole) => {
    // Mock user creation
    const newUser: User = { id: Date.now().toString(), email, role, profile: null };
    
    if (role === UserRole.TPO) {
        alert("TPO portal is under construction. Please sign in as a student.");
        return;
    }
    
    setUser(newUser);
    setPage(Page.PROFILE_SETUP);
  };

  const handleProfileComplete = (profile: StudentProfile) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      localStorage.setItem('careerCompassUser', JSON.stringify(updatedUser));
      setPage(Page.DASHBOARD);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    localStorage.removeItem('careerCompassUser');
    setPage(Page.LANDING);
  };
  
  const handleUpdateProfile = (profile: StudentProfile | null) => {
      if (user) {
          const updatedUser = {...user, profile};
          setUser(updatedUser);
          localStorage.setItem('careerCompassUser', JSON.stringify(updatedUser));
      }
  }

  const renderPage = () => {
    switch (page) {
      case Page.LANDING:
        return <Landing onSelectRole={handleSelectRole} />;
      case Page.AUTH:
        if (selectedRole) {
          return <Auth role={selectedRole} onLogin={handleLogin} onBack={() => setPage(Page.LANDING)} />;
        }
        return <Landing onSelectRole={handleSelectRole} />;
      case Page.PROFILE_SETUP:
        if (user) {
          return <ProfileSetup user={user} onProfileComplete={handleProfileComplete} />;
        }
        return <Landing onSelectRole={handleSelectRole} />;
      case Page.DASHBOARD:
        if (user) {
          return <Dashboard user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />;
        }
        return <Landing onSelectRole={handleSelectRole} />;
      default:
        return <Landing onSelectRole={handleSelectRole} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;
