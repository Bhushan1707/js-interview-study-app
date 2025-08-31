import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Target, TrendingUp, Star, CheckCircle } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import { loadCompletedQuestions, loadUserProgress, saveUserProgress, updateStudyStreak } from '../utils/localStorage';
import './Dashboard.css';

const Dashboard = ({ completedQuestions, bookmarkedQuestions, setCompletedQuestions }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [studyStreak, setStudyStreak] = useState(0);
  
  const totalQuestions = studyCategories.reduce((total, category) => total + category.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  useEffect(() => {
    // Load progress from localStorage on component mount
    const savedProgress = loadUserProgress();
    const savedCompleted = loadCompletedQuestions();
    
    // Update completed questions if there are saved ones
    if (savedCompleted.length > 0) {
      setCompletedQuestions(new Set(savedCompleted));
    }
    
    // Update study streak
    const newStreak = updateStudyStreak();
    setStudyStreak(newStreak);
    
    // Calculate and save current progress
    const currentProgress = {
      totalQuestions,
      completedQuestions: savedCompleted.length,
      progressPercentage: totalQuestions > 0 ? (savedCompleted.length / totalQuestions) * 100 : 0,
      studyStreak: newStreak
    };
    
    saveUserProgress(currentProgress);
    setUserProgress(currentProgress);
  }, [totalQuestions, setCompletedQuestions]);

  useEffect(() => {
    // Update progress whenever completed questions change
    if (userProgress) {
      const updatedProgress = {
        ...userProgress,
        completedQuestions: completedCount,
        progressPercentage
      };
      saveUserProgress(updatedProgress);
      setUserProgress(updatedProgress);
    }
  }, [completedCount, progressPercentage, userProgress]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-beginner';
      case 'Intermediate': return 'badge-intermediate';
      case 'Advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>JavaScript Interview Study Dashboard</h1>
        <p>Master JavaScript concepts with structured learning and practice</p>
      </div>

      {/* Progress Overview */}
      <div className="stats-grid">
        <Link to="/all-questions" className="stat-card clickable">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalQuestions}</h3>
            <p>Total Questions</p>
          </div>
        </Link>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bookmarked">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>{bookmarkedQuestions.size}</h3>
            <p>Bookmarked</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon progress">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{Math.round(progressPercentage)}%</h3>
            <p>Progress</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon streak">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{studyStreak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Overall Progress</h2>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="progress-text">
            {completedCount} of {totalQuestions} questions completed
          </div>
        </div>
      </div>

      {/* Study Categories */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Study Categories</h2>
          <Link to="/study-plan" className="btn btn-outline">
            View Study Plan
          </Link>
        </div>
        <div className="categories-grid">
          {studyCategories.map(category => {
            const categoryCompleted = category.questions.filter(q => 
              completedQuestions.has(q.id)
            ).length;
            const categoryProgress = (categoryCompleted / category.questions.length) * 100;

            return (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`} 
                className="category-card"
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <span className={`badge ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-meta">
                  <div className="meta-item">
                    <BookOpen size={16} />
                    {category.questions.length} questions
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    {category.estimatedTime}
                  </div>
                </div>
                <div className="category-progress">
                  <div className="progress-bar small">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                  <span className="progress-label">
                    {categoryCompleted}/{category.questions.length}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="actions-grid">
          <Link to="/study-plan" className="action-card">
            <BookOpen size={32} />
            <h3>Study Plan</h3>
            <p>Follow a structured learning path</p>
          </Link>
          <Link to="/progress" className="action-card">
            <TrendingUp size={32} />
            <h3>View Progress</h3>
            <p>Track your learning journey</p>
          </Link>
          <Link to="/all-questions" className="action-card">
            <BookOpen size={32} />
            <h3>All Questions</h3>
            <p>View all questions in one place</p>
          </Link>
          <Link to="/compiler" className="action-card">
            <Target size={32} />
            <h3>JS Compiler</h3>
            <p>Test and run JavaScript code</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
