// User Profile Management System for Client-Side Multi-User Support

const USER_STORAGE_KEY = 'js_interview_users';
const CURRENT_USER_KEY = 'js_interview_current_user';

// User Profile Structure
const createUserProfile = (username, email = '') => ({
  id: generateUserId(),
  username,
  email,
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  avatar: generateAvatar(username),
  settings: {
    theme: 'light',
    notifications: true,
    autoSave: true
  },
  progress: {
    totalQuestions: 0,
    completedQuestions: 0,
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    studyStreak: 0,
    lastStudyDate: null,
    totalStudyTime: 0
  },
  completedQuestions: [],
  bookmarkedQuestions: [],
  examResults: {},
  achievements: [],
  studyHistory: []
});

// Generate unique user ID
const generateUserId = () => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Generate avatar based on username
const generateAvatar = (username) => {
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
  const color = colors[username.length % colors.length];
  return {
    type: 'initials',
    initials: username.slice(0, 2).toUpperCase(),
    backgroundColor: color,
    textColor: '#ffffff'
  };
};

// User Management Functions
export const createUser = (username, email = '') => {
  try {
    const users = getAllUsers();
    
    // Check if username already exists
    if (users.find(user => user.username.toLowerCase() === username.toLowerCase())) {
      throw new Error('Username already exists');
    }
    
    const newUser = createUserProfile(username, email);
    users.push(newUser);
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    setCurrentUser(newUser.id);
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getAllUsers = () => {
  try {
    const users = localStorage.getItem(USER_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

export const getCurrentUser = () => {
  try {
    const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUserId) return null;
    
    const users = getAllUsers();
    return users.find(user => user.id === currentUserId) || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const setCurrentUser = (userId) => {
  try {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update last active time
    user.lastActive = new Date().toISOString();
    updateUser(user);
    
    localStorage.setItem(CURRENT_USER_KEY, userId);
    return user;
  } catch (error) {
    console.error('Error setting current user:', error);
    throw error;
  }
};

export const updateUser = (updatedUser) => {
  try {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex] = { ...updatedUser, lastActive: new Date().toISOString() };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    
    return users[userIndex];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = (userId) => {
  try {
    const users = getAllUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(filteredUsers));
    
    // If deleted user was current user, clear current user
    const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserId === userId) {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};

// Progress Management for Current User
export const updateUserProgress = (progressData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const updatedUser = {
    ...currentUser,
    progress: {
      ...currentUser.progress,
      ...progressData
    }
  };
  
  return updateUser(updatedUser);
};

export const markQuestionCompleted = (questionId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  if (!currentUser.completedQuestions.includes(questionId)) {
    currentUser.completedQuestions.push(questionId);
    currentUser.progress.completedQuestions = currentUser.completedQuestions.length;
    
    // Add to study history
    currentUser.studyHistory.push({
      type: 'question_completed',
      questionId,
      timestamp: new Date().toISOString()
    });
    
    return updateUser(currentUser);
  }
  
  return currentUser;
};

export const markQuestionIncomplete = (questionId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  currentUser.completedQuestions = currentUser.completedQuestions.filter(id => id !== questionId);
  currentUser.progress.completedQuestions = currentUser.completedQuestions.length;
  
  return updateUser(currentUser);
};

export const toggleBookmark = (questionId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const bookmarkIndex = currentUser.bookmarkedQuestions.indexOf(questionId);
  if (bookmarkIndex === -1) {
    currentUser.bookmarkedQuestions.push(questionId);
  } else {
    currentUser.bookmarkedQuestions.splice(bookmarkIndex, 1);
  }
  
  return updateUser(currentUser);
};

export const saveExamResult = (examId, result) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  currentUser.examResults[examId] = {
    ...result,
    completedAt: new Date().toISOString()
  };
  
  // Update exam progress
  currentUser.progress.completedExams = Object.keys(currentUser.examResults).length;
  
  // Calculate average score
  const scores = Object.values(currentUser.examResults).map(r => r.score || 0);
  currentUser.progress.averageScore = scores.length > 0 
    ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
    : 0;
  
  // Add to study history
  currentUser.studyHistory.push({
    type: 'exam_completed',
    examId,
    score: result.score,
    timestamp: new Date().toISOString()
  });
  
  return updateUser(currentUser);
};

// Study Streak Management
export const updateStudyStreak = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return 0;
  
  const today = new Date().toDateString();
  const lastStudyDate = currentUser.progress.lastStudyDate 
    ? new Date(currentUser.progress.lastStudyDate).toDateString() 
    : null;
  
  let newStreak = currentUser.progress.studyStreak || 0;
  
  if (lastStudyDate === today) {
    // Already studied today, no change
    return newStreak;
  } else if (lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
    // Studied yesterday, increment streak
    newStreak += 1;
  } else if (lastStudyDate !== today) {
    // Missed a day or first time, reset streak
    newStreak = 1;
  }
  
  updateUserProgress({
    studyStreak: newStreak,
    lastStudyDate: new Date().toISOString()
  });
  
  return newStreak;
};

// Data Export/Import for User
export const exportUserData = (userId = null) => {
  const targetUser = userId ? getAllUsers().find(u => u.id === userId) : getCurrentUser();
  if (!targetUser) return null;
  
  return {
    user: targetUser,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
};

export const importUserData = (userData) => {
  try {
    if (!userData.user || !userData.user.id) {
      throw new Error('Invalid user data format');
    }
    
    const users = getAllUsers();
    const existingUserIndex = users.findIndex(u => u.id === userData.user.id);
    
    if (existingUserIndex !== -1) {
      // Update existing user
      users[existingUserIndex] = userData.user;
    } else {
      // Add new user
      users.push(userData.user);
    }
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    return userData.user;
  } catch (error) {
    console.error('Error importing user data:', error);
    throw error;
  }
};

// Initialize default user if none exists
export const initializeDefaultUser = () => {
  const users = getAllUsers();
  const currentUser = getCurrentUser();
  
  if (users.length === 0 || !currentUser) {
    const defaultUser = createUser('Student', '');
    return defaultUser;
  }
  
  return currentUser;
};

// User Statistics
export const getUserStats = (userId = null) => {
  const targetUser = userId ? getAllUsers().find(u => u.id === userId) : getCurrentUser();
  if (!targetUser) return null;
  
  const totalStudyDays = targetUser.studyHistory.reduce((days, entry) => {
    const date = new Date(entry.timestamp).toDateString();
    return days.includes(date) ? days : [...days, date];
  }, []).length;
  
  return {
    ...targetUser.progress,
    totalStudyDays,
    accountAge: Math.floor((Date.now() - new Date(targetUser.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
    lastActive: targetUser.lastActive
  };
};
