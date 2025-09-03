import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../services/aiService';
import { studyCategories } from '../data/questionsData';
import nodeJsInterviewQuestions from '../data/nodejs-quetions';
import LoadingSpinner from './LoadingSpinner';
import './AIInterview.css';

const AIInterview = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    totalScore: 0,
    averageScore: 0
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);
  const textareaRef = useRef(null);

  // Get questions based on category
  const getQuestionsForCategory = () => {
    if (categoryId === 'nodejs-fundamentals') {
      return nodeJsInterviewQuestions.questions;
    }
    
    const category = studyCategories.find(cat => cat.id === categoryId);
    return category ? category.questions : [];
  };

  // Initialize AI models and load first question
  useEffect(() => {
    const initializeAI = async () => {
      setModelLoading(true);
      try {
        // Monitor loading progress
        const progressInterval = setInterval(() => {
          const status = aiService.getLoadingStatus();
          setLoadingProgress(status.progress);
          if (!status.isLoading) {
            clearInterval(progressInterval);
            setModelLoading(false);
          }
        }, 500);

        await aiService.initializeQAModel();
        clearInterval(progressInterval);
        setModelLoading(false);
        loadRandomQuestion();
      } catch (error) {
        console.error('Failed to initialize AI:', error);
        setModelLoading(false);
        // Load question anyway for basic functionality
        loadRandomQuestion();
      }
    };

    initializeAI();
  }, [categoryId]);

  // Load a random question from the category
  const loadRandomQuestion = () => {
    const questions = getQuestionsForCategory();
    if (questions.length === 0) {
      navigate('/');
      return;
    }

    // Avoid repeating recent questions
    const recentIds = questionHistory.slice(-3).map(q => q.id);
    const availableQuestions = questions.filter(q => !recentIds.includes(q.id));
    const questionsToChooseFrom = availableQuestions.length > 0 ? availableQuestions : questions;
    
    const randomQuestion = questionsToChooseFrom[Math.floor(Math.random() * questionsToChooseFrom.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setFeedback(null);
    setShowFeedback(false);
  };

  // Submit answer for AI analysis
  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert('Please provide an answer before submitting.');
      return;
    }

    setIsAnalyzing(true);
    setShowFeedback(false);

    try {
      const analysisResult = await aiService.analyzeAnswer(
        currentQuestion.question,
        userAnswer,
        currentQuestion.answer
      );

      setFeedback(analysisResult);
      setShowFeedback(true);

      // Update session statistics
      const newStats = {
        questionsAnswered: sessionStats.questionsAnswered + 1,
        totalScore: sessionStats.totalScore + analysisResult.score,
        averageScore: Math.round((sessionStats.totalScore + analysisResult.score) / (sessionStats.questionsAnswered + 1))
      };
      setSessionStats(newStats);

      // Add to question history
      setQuestionHistory(prev => [...prev, {
        ...currentQuestion,
        userAnswer,
        feedback: analysisResult,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Failed to analyze answer:', error);
      setFeedback({
        score: 50,
        strengths: ['Answer provided'],
        improvements: ['AI analysis temporarily unavailable'],
        suggestions: ['Review the expected answer below'],
        followUpQuestions: []
      });
      setShowFeedback(true);
    }

    setIsAnalyzing(false);
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [userAnswer]);

  if (modelLoading) {
    return (
      <div className="ai-interview-container">
        <div className="loading-section">
          <LoadingSpinner />
          <h3>Loading AI Models...</h3>
          <p>Initializing local AI models for interview analysis</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">{Math.round(loadingProgress)}% complete</p>
          <div className="loading-info">
            <p>🤖 Loading Q&A model for answer analysis</p>
            <p>⚡ Running 100% locally - no data sent to servers</p>
            <p>🔒 Your answers stay private on your device</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="ai-interview-container">
        <div className="error-section">
          <h3>No Questions Available</h3>
          <p>Unable to load questions for this category.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-interview-container">
      {/* Header */}
      <div className="interview-header">
        <div className="header-content">
          <h1>🤖 AI Interview Practice</h1>
          <div className="session-stats">
            <div className="stat">
              <span className="stat-label">Questions:</span>
              <span className="stat-value">{sessionStats.questionsAnswered}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Score:</span>
              <span className="stat-value">{sessionStats.averageScore}%</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="btn-secondary">
          Exit Interview
        </button>
      </div>

      {/* Question Section */}
      <div className="question-section">
        <div className="question-card">
          <div className="question-header">
            <h2>Interview Question</h2>
            <div className="question-meta">
              <span className="difficulty">{currentQuestion.difficulty || 'Medium'}</span>
              {currentQuestion.tags && (
                <div className="tags">
                  {currentQuestion.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="question-content">
            <p>{currentQuestion.question}</p>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="answer-section">
        <div className="answer-card">
          <div className="answer-header">
            <h3>Your Answer</h3>
            <div className="answer-controls">
              <span className="char-count">{userAnswer.length} characters</span>
              <button 
                onClick={handleSubmitAnswer}
                disabled={isAnalyzing || !userAnswer.trim()}
                className="btn-primary"
              >
                {isAnalyzing ? 'Analyzing...' : 'Submit Answer'}
              </button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your answer here... (Ctrl+Enter to submit)"
            className="answer-textarea"
            disabled={isAnalyzing}
          />
          <div className="answer-tips">
            <p>💡 <strong>Tips:</strong> Be specific, include examples, and explain your reasoning</p>
            <p>⌨️ <strong>Shortcut:</strong> Press Ctrl+Enter to submit</p>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      {showFeedback && feedback && (
        <div className="feedback-section">
          <div className="feedback-card">
            <div className="feedback-header">
              <h3>AI Analysis & Feedback</h3>
              <div className="score-badge">
                <span className="score">{feedback.score}%</span>
              </div>
            </div>

            <div className="feedback-content">
              {/* Strengths */}
              {feedback.strengths.length > 0 && (
                <div className="feedback-category strengths">
                  <h4>✅ Strengths</h4>
                  <ul>
                    {feedback.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {feedback.improvements.length > 0 && (
                <div className="feedback-category improvements">
                  <h4>🎯 Areas for Improvement</h4>
                  <ul>
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {feedback.suggestions.length > 0 && (
                <div className="feedback-category suggestions">
                  <h4>💡 Suggestions</h4>
                  <ul>
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow-up Questions */}
              {feedback.followUpQuestions.length > 0 && (
                <div className="feedback-category follow-up">
                  <h4>🤔 Follow-up Questions to Consider</h4>
                  <ul>
                    {feedback.followUpQuestions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Expected Answer */}
            <div className="expected-answer">
              <h4>📚 Expected Answer</h4>
              <div className="expected-content">
                <p>{currentQuestion.answer}</p>
                {currentQuestion.code && (
                  <pre className="code-example">
                    <code>{currentQuestion.code}</code>
                  </pre>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="feedback-actions">
              <button onClick={loadRandomQuestion} className="btn-primary">
                Next Question
              </button>
              <button 
                onClick={() => setShowFeedback(false)} 
                className="btn-secondary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="analyzing-overlay">
          <div className="analyzing-content">
            <LoadingSpinner />
            <h3>Analyzing Your Answer...</h3>
            <p>AI is evaluating your response</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterview;
