
export enum UserRole {
  STUDENT = 'student',
  TPO = 'tpo',
}

export enum Page {
  LANDING,
  AUTH,
  PROFILE_SETUP,
  DASHBOARD,
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  currentYear: string;
  department: string;
  college: string;
  gpa: string;
  interests: string[];
  skills: string[];
  completedCourses: string[];
  resumeUrl?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: StudentProfile | null;
}
