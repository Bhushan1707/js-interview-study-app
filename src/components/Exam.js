import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, RotateCcw, Award, ArrowLeft } from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import { saveExamResult } from '../utils/userManager';
import './Exam.css';

const Exam = ({ completedQuestions }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const category = studyCategories.find(cat => cat.id === categoryId);
  
  // Generate exam questions (random selection from completed questions)
  const examQuestions = useMemo(() => {
    if (!category) return [];
    
    const completedCategoryQuestions = category.questions.filter(q => 
      completedQuestions.has(q.id)
    );
    
    // Shuffle and take up to 10 questions for exam
    const shuffled = [...completedCategoryQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length)).map(question => ({
      ...question,
      options: generateOptions(question),
      correctAnswer: 0 // First option is always correct (the real answer)
    }));
  }, [category, completedQuestions]);

  // Generate multiple choice options
  function generateOptions(question) {
    const correctAnswer = question.answer.split('\n')[0].replace(/^\d+\.\s*\*?\*?/, '').trim();
    
    // Generate some plausible wrong answers based on common JavaScript concepts
    const wrongAnswers = [
      "This is handled by the JavaScript engine automatically",
      "It depends on the browser implementation",
      "This feature is not supported in modern JavaScript",
      "It works the same as in other programming languages",
      "This is a deprecated feature and should not be used"
    ].filter(answer => answer !== correctAnswer);
    
    // Shuffle wrong answers and take 3
    const selectedWrong = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine and shuffle all options
    const allOptions = [correctAnswer, ...selectedWrong];
    return allOptions.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (examStarted && timeLeft === 0) {
      handleSubmitExam();
    }
  }, [timeLeft, examStarted]);

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(examQuestions.length * 60); // 1 minute per question
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    const score = calculateScore();
    
    // Save exam result to user profile
    const examResult = {
      categoryId,
      categoryTitle: category.title,
      score: score.percentage,
      correct: score.correct,
      total: score.total,
      timeSpent: (examQuestions.length * 60) - timeLeft,
      answers: selectedAnswers,
      questions: examQuestions
    };
    
    saveExamResult(categoryId, examResult);
    
    setShowResults(true);
    setExamStarted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((question, index) => {
      const selectedOption = selectedAnswers[index];
      if (selectedOption === question.correctAnswer) {
        correct++;
      }
    });
    return { 
      correct, 
      total: examQuestions.length, 
      percentage: examQuestions.length > 0 ? Math.round((correct / examQuestions.length) * 100) : 0 
    };
  };

  const restartExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setExamStarted(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!category) {
    return (
      <div className="exam-container">
        <div className="exam-error">
          <h2>Category not found</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (examQuestions.length === 0) {
    return (
      <div className="exam-container">
        <div className="exam-error">
          <h2>No Exam Available</h2>
          <p>Complete some questions in "{category.title}" first to unlock the exam.</p>
          <button onClick={() => navigate(`/category/${categoryId}`)} className="back-btn">
            <ArrowLeft size={16} />
            Study Questions
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="exam-container">
        <div className="exam-results">
          <div className="results-header">
            <Award size={48} className={score.percentage >= 70 ? 'success' : 'warning'} />
            <h2>Exam Results</h2>
            <div className="score-display">
              <span className="score-number">{score.percentage}%</span>
              <span className="score-details">({score.correct}/{score.total} correct)</span>
            </div>
          </div>

          <div className="results-breakdown">
            {examQuestions.map((question, index) => {
              const selectedOption = selectedAnswers[index];
              const isCorrect = selectedOption === question.correctAnswer;
              
              return (
                <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="result-header">
                    {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    <span>Question {index + 1}</span>
                  </div>
                  <p className="result-question">{question.question}</p>
                  <div className="result-answers">
                    <p><strong>Your answer:</strong> {question.options[selectedOption] || 'Not answered'}</p>
                    {!isCorrect && (
                      <p><strong>Correct answer:</strong> {question.options[question.correctAnswer]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            <button onClick={restartExam} className="restart-btn">
              <RotateCcw size={16} />
              Retake Exam
            </button>
            <button onClick={() => navigate(`/category/${categoryId}`)} className="back-btn">
              <ArrowLeft size={16} />
              Back to Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="exam-container">
        <div className="exam-intro">
          <h1>Exam: {category.title}</h1>
          <div className="exam-info">
            <div className="info-item">
              <strong>Questions:</strong> {examQuestions.length}
            </div>
            <div className="info-item">
              <strong>Time Limit:</strong> {examQuestions.length} minutes
            </div>
            <div className="info-item">
              <strong>Passing Score:</strong> 70%
            </div>
          </div>
          <p>This exam contains questions from the topics you've completed. Good luck!</p>
          <button onClick={startExam} className="start-exam-btn">
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="exam-container">
      <div className="exam-header">
        <div className="exam-progress">
          <span>Question {currentQuestionIndex + 1} of {examQuestions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="exam-timer">
          <Clock size={20} />
          <span className={timeLeft < 60 ? 'time-warning' : ''}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="exam-content">
        <div className="question-section">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p className="question-text">{currentQuestion.question}</p>
        </div>

        <div className="options-section">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className={`option-label ${selectedAnswer === index ? 'selected' : ''}`}>
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>

        <div className="exam-navigation">
          <button 
            onClick={prevQuestion} 
            disabled={currentQuestionIndex === 0}
            className="nav-btn"
          >
            Previous
          </button>
          
          {currentQuestionIndex === examQuestions.length - 1 ? (
            <button onClick={handleSubmitExam} className="submit-btn">
              Submit Exam
            </button>
          ) : (
            <button onClick={nextQuestion} className="nav-btn primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
