import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, BookOpen, TrendingUp, Code, Target, Users, User, Award, Brain } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const categoryIcons = {
    'core-concepts': Target,
    'functions-scope': Users,
    'async-javascript': TrendingUp,
    'es6-features': Code
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Study Categories</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Home size={20} />
            <div className="nav-item-content">
              <span className="nav-item-title">Dashboard</span>
              <span className="nav-item-subtitle">Overview & Stats</span>
            </div>
          </Link>
          
          <Link 
            to="/study-plan" 
            className={`nav-item ${location.pathname === '/study-plan' ? 'active' : ''}`}
            onClick={onClose}
          >
            <BookOpen size={20} />
            Study Plan
          </Link>
          
          <Link 
            to="/progress" 
            className={`nav-item ${location.pathname === '/progress' ? 'active' : ''}`}
            onClick={onClose}
          >
            <TrendingUp size={20} />
            Progress
          </Link>
          
          <Link 
            to="/all-questions" 
            className={`nav-item ${location.pathname === '/all-questions' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Code size={20} />
            All Questions
          </Link>
          
          <Link 
            to="/compiler" 
            className={`nav-item ${location.pathname === '/compiler' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Code size={20} />
            JS Compiler
          </Link>
          
          <Link 
            to="/dsa-patterns" 
            className={`nav-item ${location.pathname === '/dsa-patterns' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Brain size={20} />
            <div className="nav-item-content">
              <span className="nav-item-title">DSA Patterns</span>
              <span className="nav-item-subtitle">15 patterns</span>
            </div>
          </Link>
          
          <Link 
            to="/profile" 
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            onClick={onClose}
          >
            <User size={20} />
            <div className="nav-item-content">
              <span className="nav-item-title">User Profile</span>
              <span className="nav-item-subtitle">Manage Users & Progress</span>
            </div>
          </Link>
          
          <div className="nav-divider" />
          
          <div className="nav-section">
            <h3>JavaScript Categories</h3>
            {studyCategories.map(category => {
              const IconComponent = categoryIcons[category.id] || Code;
              return (
                <div key={category.id} className="category-group">
                  <Link
                    to={`/category/${category.id}`}
                    className={`nav-item ${location.pathname === `/category/${category.id}` ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <IconComponent size={20} />
                    <div className="nav-item-content">
                      <span className="nav-item-title">{category.title}</span>
                      <span className="nav-item-subtitle">{category.questions.length} questions</span>
                    </div>
                  </Link>
                  <Link
                    to={`/exam/${category.id}`}
                    className={`nav-item exam-link ${location.pathname === `/exam/${category.id}` ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Target size={16} />
                    <span>Multiple Choice</span>
                  </Link>
                  <Link
                    to={`/voice-exam/${category.id}`}
                    className={`nav-item exam-link ${location.pathname === `/voice-exam/${category.id}` ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Award size={16} />
                    <span>Voice Exam</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
