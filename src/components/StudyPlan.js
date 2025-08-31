import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { studyCategories, studyPlan } from '../data/questionsData';
import './StudyPlan.css';

const StudyPlan = () => {
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-beginner';
      case 'Intermediate': return 'badge-intermediate';
      case 'Advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  const currentPlan = studyPlan[selectedLevel];

  return (
    <div className="study-plan">
      <div className="study-plan-header">
        <h1>JavaScript Interview Study Plan</h1>
        <p>Choose your level and follow a structured learning path</p>
      </div>

      <div className="level-selector">
        <h2>Select Your Level</h2>
        <div className="level-buttons">
          {Object.keys(studyPlan).map(level => (
            <button
              key={level}
              className={`level-btn ${selectedLevel === level ? 'active' : ''}`}
              onClick={() => setSelectedLevel(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="plan-content">
        <div className="plan-overview">
          <h3>Your {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Study Plan</h3>
          <div className="plan-stats">
            <div className="stat">
              <Target size={20} />
              <span>{currentPlan.length} Categories</span>
            </div>
            <div className="stat">
              <BookOpen size={20} />
              <span>
                {currentPlan.reduce((total, item) => {
                  const category = studyCategories.find(cat => cat.id === item.categoryId);
                  return total + (category ? category.questions.length : 0);
                }, 0)} Questions
              </span>
            </div>
            <div className="stat">
              <Clock size={20} />
              <span>
                {currentPlan.reduce((total, item) => {
                  const category = studyCategories.find(cat => cat.id === item.categoryId);
                  if (category) {
                    const hours = parseInt(category.estimatedTime.split('-')[0]);
                    return total + hours;
                  }
                  return total;
                }, 0)}-{currentPlan.reduce((total, item) => {
                  const category = studyCategories.find(cat => cat.id === item.categoryId);
                  if (category) {
                    const hours = parseInt(category.estimatedTime.split('-')[1]);
                    return total + hours;
                  }
                  return total;
                }, 0)} Hours
              </span>
            </div>
          </div>
        </div>

        <div className="plan-steps">
          {currentPlan.map((planItem, index) => {
            const category = studyCategories.find(cat => cat.id === planItem.categoryId);
            if (!category) return null;

            return (
              <div key={planItem.categoryId} className="plan-step">
                <div className="step-number">
                  <span>{planItem.order}</span>
                </div>
                
                <div className="step-content">
                  <div className="step-header">
                    <div className="step-title-section">
                      <div className="step-icon">{category.icon}</div>
                      <div>
                        <h4>{category.title}</h4>
                        <p className="step-focus">Focus: {planItem.focus}</p>
                      </div>
                    </div>
                    <span className={`badge ${getDifficultyColor(category.difficulty)}`}>
                      {category.difficulty}
                    </span>
                  </div>
                  
                  <p className="step-description">{category.description}</p>
                  
                  <div className="step-meta">
                    <div className="meta-item">
                      <BookOpen size={16} />
                      {category.questions.length} questions
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      {category.estimatedTime}
                    </div>
                  </div>
                  
                  <div className="step-actions">
                    <Link 
                      to={`/category/${category.id}`} 
                      className="btn btn-primary"
                    >
                      Start Learning
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                
                {index < currentPlan.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="study-tips">
        <h3>Study Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <CheckCircle size={24} />
            <h4>Practice Regularly</h4>
            <p>Set aside dedicated time each day for consistent learning</p>
          </div>
          <div className="tip-card">
            <Target size={24} />
            <h4>Focus on Understanding</h4>
            <p>Don't just memorize answers, understand the concepts</p>
          </div>
          <div className="tip-card">
            <BookOpen size={24} />
            <h4>Code Along</h4>
            <p>Try running the code examples to see them in action</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
