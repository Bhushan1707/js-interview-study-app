// Local Storage utility functions for persisting user progress

const STORAGE_KEYS = {
  COMPLETED_QUESTIONS: 'js_interview_completed_questions',
  EXAM_RESULTS: 'js_interview_exam_results',
  USER_PROGRESS: 'js_interview_user_progress',
  STUDY_STREAK: 'js_interview_study_streak'
};

// Generic localStorage functions
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Completed Questions Management
export const saveCompletedQuestions = (completedQuestions) => {
  return saveToStorage(STORAGE_KEYS.COMPLETED_QUESTIONS, completedQuestions);
};

export const loadCompletedQuestions = () => {
  return loadFromStorage(STORAGE_KEYS.COMPLETED_QUESTIONS, []);
};

export const markQuestionCompleted = (questionId) => {
  const completed = loadCompletedQuestions();
  if (!completed.includes(questionId)) {
    completed.push(questionId);
    saveCompletedQuestions(completed);
  }
  return completed;
};

export const markQuestionIncomplete = (questionId) => {
  const completed = loadCompletedQuestions();
  const filtered = completed.filter(id => id !== questionId);
  saveCompletedQuestions(filtered);
  return filtered;
};

export const isQuestionCompleted = (questionId) => {
  const completed = loadCompletedQuestions();
  return completed.includes(questionId);
};

// Exam Results Management
export const saveExamResult = (examId, result) => {
  const examResults = loadFromStorage(STORAGE_KEYS.EXAM_RESULTS, {});
  examResults[examId] = {
    ...result,
    completedAt: new Date().toISOString()
  };
  return saveToStorage(STORAGE_KEYS.EXAM_RESULTS, examResults);
};

export const loadExamResults = () => {
  return loadFromStorage(STORAGE_KEYS.EXAM_RESULTS, {});
};

export const getExamResult = (examId) => {
  const examResults = loadExamResults();
  return examResults[examId] || null;
};

// User Progress Management
export const saveUserProgress = (progress) => {
  const currentProgress = loadUserProgress();
  const updatedProgress = {
    ...currentProgress,
    ...progress,
    lastUpdated: new Date().toISOString()
  };
  return saveToStorage(STORAGE_KEYS.USER_PROGRESS, updatedProgress);
};

export const loadUserProgress = () => {
  return loadFromStorage(STORAGE_KEYS.USER_PROGRESS, {
    totalQuestions: 0,
    completedQuestions: 0,
    totalExams: 0,
    completedExams: 0,
    averageScore: 0,
    studyStreak: 0,
    lastStudyDate: null,
    createdAt: new Date().toISOString()
  });
};

// Study Streak Management
export const updateStudyStreak = () => {
  const progress = loadUserProgress();
  const today = new Date().toDateString();
  const lastStudyDate = progress.lastStudyDate ? new Date(progress.lastStudyDate).toDateString() : null;
  
  let newStreak = progress.studyStreak || 0;
  
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
  
  saveUserProgress({
    studyStreak: newStreak,
    lastStudyDate: new Date().toISOString()
  });
  
  return newStreak;
};

// Clear all data (for reset functionality)
export const clearAllProgress = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
  return true;
};

// Export/Import functionality
export const exportProgress = () => {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    data[name] = loadFromStorage(key);
  });
  return data;
};

export const importProgress = (data) => {
  try {
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      if (data[name]) {
        saveToStorage(key, data[name]);
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
};
