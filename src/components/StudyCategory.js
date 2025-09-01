import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Star, CheckCircle, Code } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import './StudyCategory.css';

const StudyCategory = ({ completedQuestions, bookmarkedQuestions, onMarkComplete, onToggleBookmark }) => {
  const { categoryId } = useParams();
  const category = studyCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="category-not-found">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-beginner';
      case 'Intermediate': return 'badge-intermediate';
      case 'Advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  const completedCount = category.questions.filter(q => completedQuestions.has(q.id)).length;
  const progressPercentage = (completedCount / category.questions.length) * 100;

  return (
    <div className="study-category">
      <div className="category-header">
        <div className="category-info">
          <div className="category-card-header">
            <div className="category-title-section">
              <div className="category-icon-large">{category.icon}</div>
              <div>
                <h1>{category.title}</h1>
                <p>{category.description}</p>
              </div>
            </div>
            <Link to="/" className="back-link-card">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="category-meta-section">
            <span className={`badge ${getDifficultyColor(category.difficulty)}`}>
              {category.difficulty}
            </span>
            <div className="meta-item">
              <BookOpen size={16} />
              {category.questions.length} questions
            </div>
            <div className="meta-item">
              <Clock size={16} />
              {category.estimatedTime}
            </div>
          </div>
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <div className="progress-info">
            <h3>Progress</h3>
            <span className="progress-text">
              {completedCount} of {category.questions.length} completed
            </span>
          </div>
          <div className="progress-percentage">
            {Math.round(progressPercentage)}%
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="questions-section">
        <h2>Questions</h2>
        <div className="questions-list">
          {category.questions.map((question, index) => {
            const isCompleted = completedQuestions.has(question.id);
            const isBookmarked = bookmarkedQuestions.has(question.id);

            return (
              <div key={question.id} className={`question-card ${isCompleted ? 'completed' : ''}`}>
                <div className="question-header">
                  <div className="question-number">
                    {isCompleted ? (
                      <CheckCircle size={20} className="completed-icon" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="question-actions">
                    <button
                      className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => onToggleBookmark(question.id)}
                      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <Star size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="question-content">
                  <h3>{question.question}</h3>
                  <div className="question-preview">
                    {question.answer.split('\n')[0]}...
                  </div>
                  
                  {question.tags && (
                    <div className="question-tags">
                      {question.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="question-footer">
                  <Link 
                    to={`/question/${question.id}`} 
                    className="btn btn-outline"
                  >
                    <Code size={16} />
                    View Details
                  </Link>
                  
                  {!isCompleted && (
                    <button
                      className="btn btn-success"
                      onClick={() => onMarkComplete(question.id)}
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudyCategory;
