import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, Copy, BookOpen } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import './QuestionDetail.css';

const QuestionDetail = ({ completedQuestions, bookmarkedQuestions, onMarkComplete, onToggleBookmark }) => {
  const { questionId } = useParams();
  
  // Find the question across all categories
  let question = null;
  let category = null;
  
  for (const cat of studyCategories) {
    const foundQuestion = cat.questions.find(q => q.id === parseInt(questionId));
    if (foundQuestion) {
      question = foundQuestion;
      category = cat;
      break;
    }
  }

  if (!question) {
    return (
      <div className="question-not-found">
        <h2>Question not found</h2>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const isCompleted = completedQuestions.has(question.id);
  const isBookmarked = bookmarkedQuestions.has(question.id);

  const copyCode = () => {
    if (question.code) {
      navigator.clipboard.writeText(question.code);
    }
  };

  return (
    <div className="question-detail">
      <div className="question-header">
        <Link to={`/category/${category.id}`} className="back-link">
          <ArrowLeft size={16} />
          Back to {category.title}
        </Link>
        
        <div className="question-actions">
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(question.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Star size={16} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          
          {!isCompleted && (
            <button
              className="btn btn-success"
              onClick={() => onMarkComplete(question.id)}
            >
              <CheckCircle size={16} />
              Mark Complete
            </button>
          )}
          
          {isCompleted && (
            <div className="completed-badge">
              <CheckCircle size={16} />
              Completed
            </div>
          )}
        </div>
      </div>

      <div className="question-content">
        <div className="question-meta">
          <Link to={`/category/${category.id}`} className="category-link">
            <span className="category-icon">{category.icon}</span>
            {category.title}
          </Link>
          
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

        <h1 className="question-title">{question.question}</h1>
        
        <div className="answer-section">
          <h2>Answer</h2>
          <div className="answer-content">
            {question.answer.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {question.code && (
          <div className="code-section">
            <div className="code-header">
              <h3>Code Example</h3>
              <button className="copy-btn" onClick={copyCode} title="Copy code">
                <Copy size={16} />
                Copy
              </button>
            </div>
            <div className="code-block">
              <pre><code>{question.code}</code></pre>
            </div>
          </div>
        )}

        <div className="navigation-section">
          <h3>Continue Learning</h3>
          <div className="navigation-links">
            <Link to={`/category/${category.id}`} className="nav-card">
              <BookOpen size={24} />
              <div>
                <h4>View All Questions</h4>
                <p>Continue with {category.title}</p>
              </div>
            </Link>
            
            <Link to="/study-plan" className="nav-card">
              <CheckCircle size={24} />
              <div>
                <h4>Study Plan</h4>
                <p>Follow structured learning path</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
