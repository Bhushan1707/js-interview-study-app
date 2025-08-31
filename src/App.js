import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudyCategory from './components/StudyCategory';
import QuestionDetail from './components/QuestionDetail';
import StudyPlan from './components/StudyPlan';
import Progress from './components/Progress';
import AllQuestions from './components/AllQuestions';
import JSCompiler from './components/JSCompiler';
import Exam from './components/Exam';
import VoiceExam from './components/VoiceExam';
import UserProfile from './components/UserProfile';
import { 
  getCurrentUser, 
  initializeDefaultUser, 
  markQuestionCompleted as markUserQuestionCompleted,
  markQuestionIncomplete as markUserQuestionIncomplete,
  toggleBookmark as toggleUserBookmark
} from './utils/userManager';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initialize user system
    const user = initializeDefaultUser();
    setCurrentUser(user);
    
    if (user) {
      // Load user's progress
      setCompletedQuestions(new Set(user.completedQuestions));
      setBookmarkedQuestions(new Set(user.bookmarkedQuestions));
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markQuestionComplete = (questionId) => {
    const updatedUser = markUserQuestionCompleted(questionId);
    if (updatedUser) {
      setCompletedQuestions(new Set(updatedUser.completedQuestions));
      setCurrentUser(updatedUser);
    }
  };

  const markQuestionIncomplete = (questionId) => {
    const updatedUser = markUserQuestionIncomplete(questionId);
    if (updatedUser) {
      setCompletedQuestions(new Set(updatedUser.completedQuestions));
      setCurrentUser(updatedUser);
    }
  };

  const toggleBookmark = (questionId) => {
    const updatedUser = toggleUserBookmark(questionId);
    if (updatedUser) {
      setBookmarkedQuestions(new Set(updatedUser.bookmarkedQuestions));
      setCurrentUser(updatedUser);
    }
  };

  const handleUserChange = (user) => {
    setCurrentUser(user);
    setCompletedQuestions(new Set(user.completedQuestions));
    setBookmarkedQuestions(new Set(user.bookmarkedQuestions));
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="app-content">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
          />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    completedQuestions={completedQuestions}
                    bookmarkedQuestions={bookmarkedQuestions}
                    setCompletedQuestions={setCompletedQuestions}
                  />
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <UserProfile 
                    onUserChange={handleUserChange}
                  />
                } 
              />
              <Route 
                path="/study-plan" 
                element={<StudyPlan />} 
              />
              <Route 
                path="/progress" 
                element={
                  <Progress 
                    completedQuestions={completedQuestions}
                  />
                } 
              />
              <Route 
                path="/all-questions" 
                element={
                  <AllQuestions 
                    completedQuestions={completedQuestions}
                    onMarkComplete={markQuestionComplete}
                    onMarkIncomplete={markQuestionIncomplete}
                  />
                } 
              />
              <Route 
                path="/compiler" 
                element={<JSCompiler />} 
              />
              <Route 
                path="/exam/:categoryId" 
                element={
                  <Exam 
                    completedQuestions={completedQuestions}
                  />
                } 
              />
              <Route 
                path="/voice-exam/:categoryId" 
                element={
                  <VoiceExam 
                    completedQuestions={completedQuestions}
                  />
                } 
              />
              <Route 
                path="/category/:categoryId" 
                element={
                  <StudyCategory 
                    completedQuestions={completedQuestions}
                    bookmarkedQuestions={bookmarkedQuestions}
                    onMarkComplete={markQuestionComplete}
                    onToggleBookmark={toggleBookmark}
                  />
                } 
              />
              <Route 
                path="/question/:questionId" 
                element={
                  <QuestionDetail 
                    completedQuestions={completedQuestions}
                    bookmarkedQuestions={bookmarkedQuestions}
                    onMarkComplete={markQuestionComplete}
                    onToggleBookmark={toggleBookmark}
                  />
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
