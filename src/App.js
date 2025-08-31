import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudyCategory from './components/StudyCategory';
import AllQuestions from './components/AllQuestions';
import StudyPlan from './components/StudyPlan';
import Progress from './components/Progress';
import JSCompiler from './components/JSCompiler';
import Exam from './components/Exam';
import VoiceExam from './components/VoiceExam';
import QuestionDetail from './components/QuestionDetail';
import FloatingActionButton from './components/FloatingActionButton';
import AnimatedBackground from './components/AnimatedBackground';
import { NotificationProvider } from './components/NotificationSystem';
import { 
  initializeDefaultUser, 
  markQuestionCompleted, 
  markQuestionIncomplete, 
  toggleBookmark 
} from './utils/userManager';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [, setCurrentUser] = useState(null);

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

  const handleMarkComplete = (questionId) => {
    const updatedUser = markQuestionCompleted(questionId);
    if (updatedUser) {
      setCompletedQuestions(new Set(updatedUser.completedQuestions));
      setCurrentUser(updatedUser);
    }
  };

  const handleMarkIncomplete = (questionId) => {
    const updatedUser = markQuestionIncomplete(questionId);
    if (updatedUser) {
      setCompletedQuestions(new Set(updatedUser.completedQuestions));
      setCurrentUser(updatedUser);
    }
  };

  const handleToggleBookmark = (questionId) => {
    const updatedUser = toggleBookmark(questionId);
    if (updatedUser) {
      setBookmarkedQuestions(new Set(updatedUser.bookmarkedQuestions));
      setCurrentUser(updatedUser);
    }
  };


  return (
    <NotificationProvider>
      <Router>
        <div className="app">
          <AnimatedBackground variant="particles" />
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  completedQuestions={completedQuestions}
                  bookmarkedQuestions={bookmarkedQuestions}
                  setCompletedQuestions={setCompletedQuestions}
                />
              } />
              <Route path="/category/:categoryId" element={
                <StudyCategory 
                  completedQuestions={completedQuestions}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onMarkComplete={handleMarkComplete}
                  onMarkIncomplete={handleMarkIncomplete}
                  onToggleBookmark={handleToggleBookmark}
                />
              } />
              <Route path="/all-questions" element={
                <AllQuestions 
                  completedQuestions={completedQuestions}
                  onMarkComplete={handleMarkComplete}
                  onMarkIncomplete={handleMarkIncomplete}
                />
              } />
              <Route path="/study-plan" element={
                <StudyPlan 
                  completedQuestions={completedQuestions}
                />
              } />
              <Route path="/progress" element={
                <Progress 
                  completedQuestions={completedQuestions}
                  bookmarkedQuestions={bookmarkedQuestions}
                />
              } />
              <Route path="/compiler" element={
                <JSCompiler />
              } />
              <Route path="/exam/:categoryId" element={
                <Exam 
                  completedQuestions={completedQuestions}
                />
              } />
              <Route path="/voice-exam/:categoryId" element={
                <VoiceExam 
                  completedQuestions={completedQuestions}
                />
              } />
              <Route path="/question/:questionId" element={
                <QuestionDetail 
                  completedQuestions={completedQuestions}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onMarkComplete={handleMarkComplete}
                  onMarkIncomplete={handleMarkIncomplete}
                  onToggleBookmark={handleToggleBookmark}
                />
              } />
            </Routes>
          </main>
          <FloatingActionButton />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
