import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import './Progress.css';

const Progress = ({ completedQuestions }) => {
  const totalQuestions = studyCategories.reduce((total, category) => total + category.questions.length, 0);
  const completedCount = completedQuestions.size;
  const overallProgress = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  const categoryProgress = studyCategories.map(category => {
    const categoryCompleted = category.questions.filter(q => completedQuestions.has(q.id)).length;
    const categoryProgress = (categoryCompleted / category.questions.length) * 100;
    
    return {
      ...category,
      completed: categoryCompleted,
      progress: categoryProgress
    };
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-beginner';
      case 'Intermediate': return 'badge-intermediate';
      case 'Advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1>Your Learning Progress</h1>
        <p>Track your JavaScript interview preparation journey</p>
      </div>

      {/* Overall Progress */}
      <div className="overall-progress-card">
        <div className="progress-info">
          <div className="progress-stats">
            <div className="stat-large">
              <h2>{Math.round(overallProgress)}%</h2>
              <p>Overall Progress</p>
            </div>
            <div className="stat-grid">
              <div className="stat-item">
                <Target size={20} />
                <div>
                  <span className="stat-number">{totalQuestions}</span>
                  <span className="stat-label">Total Questions</span>
                </div>
              </div>
              <div className="stat-item">
                <CheckCircle size={20} />
                <div>
                  <span className="stat-number">{completedCount}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-item">
                <BookOpen size={20} />
                <div>
                  <span className="stat-number">{totalQuestions - completedCount}</span>
                  <span className="stat-label">Remaining</span>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-visual">
            <div className="circular-progress">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallProgress / 100)}`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percentage">{Math.round(overallProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="category-progress-section">
        <h2>Progress by Category</h2>
        <div className="category-progress-grid">
          {categoryProgress.map(category => (
            <div key={category.id} className="category-progress-card">
              <div className="category-progress-header">
                <div className="category-info">
                  <div className="category-icon">{category.icon}</div>
                  <div>
                    <h3>{category.title}</h3>
                    <span className={`badge ${getDifficultyColor(category.difficulty)}`}>
                      {category.difficulty}
                    </span>
                  </div>
                </div>
                <div className="progress-percentage-small">
                  {Math.round(category.progress)}%
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${category.progress}%` }}
                />
              </div>
              
              <div className="category-stats">
                <div className="category-stat">
                  <CheckCircle size={16} />
                  <span>{category.completed} completed</span>
                </div>
                <div className="category-stat">
                  <BookOpen size={16} />
                  <span>{category.questions.length - category.completed} remaining</span>
                </div>
                <div className="category-stat">
                  <Clock size={16} />
                  <span>{category.estimatedTime}</span>
                </div>
              </div>
              
              <Link 
                to={`/category/${category.id}`} 
                className="btn btn-outline btn-small"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="achievements-section">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          <div className={`achievement ${completedCount >= 1 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🎯</div>
            <div className="achievement-content">
              <h4>First Steps</h4>
              <p>Complete your first question</p>
            </div>
          </div>
          
          <div className={`achievement ${completedCount >= 5 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🔥</div>
            <div className="achievement-content">
              <h4>Getting Started</h4>
              <p>Complete 5 questions</p>
            </div>
          </div>
          
          <div className={`achievement ${completedCount >= 10 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">⚡</div>
            <div className="achievement-content">
              <h4>On Fire</h4>
              <p>Complete 10 questions</p>
            </div>
          </div>
          
          <div className={`achievement ${overallProgress >= 50 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">🏆</div>
            <div className="achievement-content">
              <h4>Halfway There</h4>
              <p>Reach 50% completion</p>
            </div>
          </div>
          
          <div className={`achievement ${overallProgress >= 100 ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">👑</div>
            <div className="achievement-content">
              <h4>Master</h4>
              <p>Complete all questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
