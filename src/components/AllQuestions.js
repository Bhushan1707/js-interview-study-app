import React, { useState, useMemo } from 'react';
import { Search, BookOpen, CheckCircle, Circle, Filter } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import SearchSuggestions from './SearchSuggestions';
import './AllQuestions.css';

const AllQuestions = ({ completedQuestions, onMarkComplete, onMarkIncomplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  // Flatten all questions from all categories
  const allQuestions = useMemo(() => {
    return studyCategories.flatMap(category =>
      category.questions.map(question => ({
        ...question,
        categoryId: category.id,
        categoryTitle: category.title
      }))
    );
  }, []);

  // Filter questions based on search and category
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || question.categoryId === selectedCategory;
      const matchesCompletionFilter = showCompleted || !completedQuestions.has(question.id);
      
      return matchesSearch && matchesCategory && matchesCompletionFilter;
    });
  }, [allQuestions, searchTerm, selectedCategory, showCompleted, completedQuestions]);

  const toggleExpanded = (questionId) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(filteredQuestions.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  return (
    <div className="all-questions">
      <div className="questions-header">
        <div className="header-title">
          <BookOpen size={24} />
          <h1>All Questions & Answers</h1>
          <span className="questions-count">({filteredQuestions.length} questions)</span>
        </div>
        
        <div className="bulk-actions">
          <button onClick={expandAll} className="bulk-btn">
            Expand All
          </button>
          <button onClick={collapseAll} className="bulk-btn">
            Collapse All
          </button>
        </div>
      </div>

      <div className="questions-filters">
        <div className="search-container">
          <SearchSuggestions 
            onSearch={setSearchTerm}
            placeholder="Search questions and answers..."
          />
        </div>

        <div className="filter-controls">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="all">All Categories</option>
            {studyCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

          <label className="completion-filter">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show completed
          </label>
        </div>
      </div>

      <div className="questions-list">
        {filteredQuestions.map((question, index) => {
          const isCompleted = completedQuestions.has(question.id);
          const isExpanded = expandedQuestions.has(question.id);
          
          return (
            <div key={question.id} className={`question-card ${isCompleted ? 'completed' : ''}`}>
              <div className="question-header" onClick={() => toggleExpanded(question.id)}>
                <div className="question-info">
                  <span className="question-number">#{index + 1}</span>
                  <div className="question-content">
                    <h3 className="question-title">{question.question}</h3>
                    <div className="question-meta">
                      <span className="category-badge">{question.categoryTitle}</span>
                      {isCompleted && <span className="completed-badge">Completed</span>}
                    </div>
                  </div>
                </div>
                
                <div className="question-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCompleted && onMarkIncomplete) {
                        onMarkIncomplete(question.id);
                      } else {
                        onMarkComplete(question.id);
                      }
                    }}
                    className={`complete-btn ${isCompleted ? 'completed' : ''}`}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </button>
                  <div className={`expand-indicator ${isExpanded ? 'expanded' : ''}`}>
                    ▼
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="question-answer">
                  <div className="answer-content">
                    <pre>{question.answer}</pre>
                    {question.code && (
                      <div className="code-example">
                        <h4>Code Example:</h4>
                        <pre className="code-block">{question.code}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="no-questions">
          <Filter size={48} />
          <h3>No questions found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
