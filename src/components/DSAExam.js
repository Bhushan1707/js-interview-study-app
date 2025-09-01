import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Play, RotateCcw, CheckCircle,
  Clock, Code, Lightbulb, Target
} from 'lucide-react';
import dsaPatternsData from '../data/dsaPatternsData';
import JSCompiler from './JSCompiler';
import './DSAExam.css';

const DSAExam = () => {
  const { patternId } = useParams();
  const [pattern, setPattern] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [examCompleted, setExamCompleted] = useState(false);
  const [results, setResults] = useState([]);

  // Generate exam questions based on the pattern
  const generateExamQuestions = (pattern) => {
    const questions = [
      {
        id: 1,
        title: `Basic ${pattern.name} Implementation`,
        description: `Implement a basic solution using the ${pattern.name} pattern.`,
        problem: pattern.sample_problem,
        difficulty: 'Easy',
        timeLimit: 10,
        testCases: [
          {
            input: pattern.example?.input || 'nums = [1, 2, 3, 4, 5]',
            expectedOutput: pattern.example?.output || '15',
            description: 'Basic test case'
          }
        ],
        starterCode: `// Implement ${pattern.name} pattern
function solve(input) {
    // Your code here
    return result;
}

// Test your solution
console.log(solve(${pattern.example?.input || '[1, 2, 3, 4, 5]'}));`
      },
      {
        id: 2,
        title: `Advanced ${pattern.name} Problem`,
        description: `Solve a more complex problem using the ${pattern.name} pattern with edge cases.`,
        problem: `Given a more complex scenario, optimize your ${pattern.name} solution for better performance.`,
        difficulty: 'Medium',
        timeLimit: 15,
        testCases: [
          {
            input: 'Complex input case',
            expectedOutput: 'Expected complex output',
            description: 'Advanced test case with edge conditions'
          }
        ],
        starterCode: `// Advanced ${pattern.name} implementation
function advancedSolve(input) {
    // Handle edge cases
    if (!input || input.length === 0) return null;
    
    // Your optimized code here
    return result;
}

// Test with edge cases
console.log(advancedSolve([]));
console.log(advancedSolve([1]));`
      },
      {
        id: 3,
        title: `${pattern.name} Optimization Challenge`,
        description: `Optimize your solution for time and space complexity.`,
        problem: `Implement the most efficient version of ${pattern.name} pattern with optimal time/space complexity.`,
        difficulty: 'Hard',
        timeLimit: 20,
        testCases: [
          {
            input: 'Large dataset',
            expectedOutput: 'Optimized result',
            description: 'Performance test with large input'
          }
        ],
        starterCode: `// Optimized ${pattern.name} solution
// Target: O(n) time, O(1) space complexity
function optimizedSolve(input) {
    // Write your most efficient solution
    return result;
}

// Performance test
const largeInput = new Array(10000).fill(0).map((_, i) => i);
console.time('Performance Test');
console.log(optimizedSolve(largeInput));
console.timeEnd('Performance Test');`
      }
    ];

    return questions;
  };

  useEffect(() => {
    const foundPattern = dsaPatternsData.dsa_patterns.find(p => p.id === parseInt(patternId));
    if (foundPattern) {
      setPattern(foundPattern);
      const questions = generateExamQuestions(foundPattern);
      setExamQuestions(questions);
      setUserCode(questions[0]?.starterCode || '');
    }
  }, [patternId]);

  const [examQuestions, setExamQuestions] = useState([]);

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0 && !examCompleted) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examStarted, examCompleted]);

  const finishExam = useCallback(() => {
    setIsExamFinished(true);
    setShowResults(true);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      finishExam();
    }
  }, [timeLeft, finishExam]);

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(1800); // 30 minutes
  };

  const nextQuestion = () => {
    // Save current answer
    const newResults = [...results];
    newResults[currentQuestionIndex] = {
      questionId: examQuestions[currentQuestionIndex].id,
      code: userCode,
      completed: true
    };
    setResults(newResults);

    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserCode(examQuestions[currentQuestionIndex + 1]?.starterCode || '');
    } else {
      handleFinishExam();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer
      const newResults = [...results];
      newResults[currentQuestionIndex] = {
        questionId: examQuestions[currentQuestionIndex].id,
        code: userCode,
        completed: true
      };
      setResults(newResults);

      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserCode(results[currentQuestionIndex - 1]?.code || examQuestions[currentQuestionIndex - 1]?.starterCode || '');
    }
  };

  const handleFinishExam = () => {
    // Save final answer
    const newResults = [...results];
    newResults[currentQuestionIndex] = {
      questionId: examQuestions[currentQuestionIndex]?.id,
      code: userCode,
      completed: true
    };
    setResults(newResults);
    setExamCompleted(true);
    setExamStarted(false);
    finishExam();
  };

  const restartExam = () => {
    setExamStarted(false);
    setExamCompleted(false);
    setCurrentQuestionIndex(0);
    setUserCode(examQuestions[0]?.starterCode || '');
    setTimeLeft(1800);
    setResults([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!pattern) {
    return (
      <div className="dsa-exam-container">
        <div className="exam-error">
          <h2>Pattern not found</h2>
          <Link to="/dsa-patterns" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to DSA Patterns
          </Link>
        </div>
      </div>
    );
  }

  if (examCompleted) {
    return (
      <div className="dsa-exam-container">
        <div className="exam-results">
          <div className="results-header">
            <CheckCircle size={48} color="#10b981" />
            <h2>DSA Exam Completed!</h2>
            <p>Pattern: {pattern.name}</p>
          </div>

          <div className="results-summary">
            <div className="summary-card">
              <h3>Questions Completed</h3>
              <div className="summary-value">{results.filter(r => r?.completed).length}/{examQuestions.length}</div>
            </div>
            <div className="summary-card">
              <h3>Time Spent</h3>
              <div className="summary-value">{formatTime(1800 - timeLeft)}</div>
            </div>
            <div className="summary-card">
              <h3>Pattern Mastery</h3>
              <div className="summary-value">
                {Math.round((results.filter(r => r?.completed).length / examQuestions.length) * 100)}%
              </div>
            </div>
          </div>

          <div className="results-breakdown">
            {examQuestions.map((question, index) => (
              <div key={question.id} className="result-item">
                <div className="result-header">
                  <h4>{question.title}</h4>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
                  >
                    {question.difficulty}
                  </span>
                </div>
                <div className="result-code">
                  <h5>Your Solution:</h5>
                  <pre><code>{results[index]?.code || 'No solution provided'}</code></pre>
                </div>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button onClick={restartExam} className="btn btn-outline">
              <RotateCcw size={16} />
              Retake Exam
            </button>
            <Link to={`/dsa-pattern/${pattern.id}`} className="btn btn-primary">
              <Lightbulb size={16} />
              Review Pattern
            </Link>
            <Link to="/dsa-patterns" className="btn btn-outline">
              <ArrowLeft size={16} />
              All Patterns
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="dsa-exam-container">
        <div className="exam-intro">
          <Link to={`/dsa-pattern/${pattern.id}`} className="back-link">
            <ArrowLeft size={16} />
            Back to Pattern
          </Link>

          <div className="exam-intro-content">
            <h1>DSA Pattern Exam</h1>
            <h2>{pattern.name}</h2>
            <p>{pattern.description}</p>

            <div className="exam-info">
              <div className="info-card">
                <Code size={24} />
                <h3>Questions</h3>
                <p>{examQuestions.length} coding problems</p>
              </div>
              <div className="info-card">
                <Clock size={24} />
                <h3>Duration</h3>
                <p>30 minutes</p>
              </div>
              <div className="info-card">
                <Target size={24} />
                <h3>Focus</h3>
                <p>{pattern.name} pattern mastery</p>
              </div>
            </div>

            <div className="exam-instructions">
              <h3>Instructions:</h3>
              <ul>
                <li>Solve {examQuestions.length} problems using the {pattern.name} pattern</li>
                <li>Each problem builds on the previous one in complexity</li>
                <li>Use the built-in JavaScript compiler to test your solutions</li>
                <li>You can navigate between questions and modify your answers</li>
                <li>Focus on implementing the pattern correctly and efficiently</li>
              </ul>
            </div>

            <button onClick={startExam} className="btn btn-primary start-exam-btn">
              <Play size={20} />
              Start DSA Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];

  return (
    <div className="dsa-exam-container">
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
          <span className={timeLeft < 300 ? 'time-warning' : ''}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="exam-content">
        <div className="exam-question">
          <div className="question-header">
            <h2>{examQuestions[currentQuestionIndex]?.title}</h2>
            <span className={`difficulty-badge ${examQuestions[currentQuestionIndex]?.difficulty.toLowerCase()}`}>
              {examQuestions[currentQuestionIndex]?.difficulty}
            </span>
          </div>
          
          <div className="question-description">
            <p>{examQuestions[currentQuestionIndex]?.description}</p>
          </div>
          
          {examQuestions[currentQuestionIndex]?.examples && (
            <div className="question-examples">
              <h4>Examples:</h4>
              {examQuestions[currentQuestionIndex].examples.map((example, index) => (
                <div key={index} className="example">
                  <div className="example-input">
                    <strong>Input:</strong> {example.input}
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> {example.output}
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="js-compiler-container">
          <JSCompiler 
            initialCode={userCode}
            onCodeChange={setUserCode}
          />
        </div>
      </div>
      
      <div className="exam-navigation">
        <button 
          onClick={previousQuestion} 
          disabled={currentQuestionIndex === 0}
          className="btn btn-outline"
        >
          Previous
        </button>
        
        <span className="nav-info">
          {currentQuestionIndex + 1} / {examQuestions.length}
        </span>
        
        {currentQuestionIndex === examQuestions.length - 1 ? (
          <button onClick={handleFinishExam} className="btn btn-primary">
            Finish Exam
          </button>
        ) : (
          <button onClick={nextQuestion} className="btn btn-primary">
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default DSAExam;
