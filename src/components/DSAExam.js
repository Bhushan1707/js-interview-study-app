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
        title: `Two Sum - Sorted Array`,
        description: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.`,
        problem: `Return the indices of the two numbers (1-indexed) as an integer array [index1, index2] of length 2.`,
        difficulty: 'Easy',
        timeLimit: 10,
        examples: [
          {
            input: "numbers = [2,7,11,15], target = 9",
            output: "[1,2]",
            explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2]."
          },
          {
            input: "numbers = [2,3,4], target = 6",
            output: "[1,3]",
            explanation: "The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3. We return [1, 3]."
          }
        ],
        testCases: [
          { input: "[2,7,11,15], 9", expected: "[1,2]" },
          { input: "[2,3,4], 6", expected: "[1,3]" },
          { input: "[-1,0], -1", expected: "[1,2]" },
          { input: "[1,2,3,4,4,9,56,90], 8", expected: "[4,5]" }
        ],
        functionName: "twoSum",
        parameters: ["numbers", "target"],
        starterCode: `function twoSum(numbers, target) {
    // Write your solution here
    // Use two pointers approach
    
}`
      },
      {
        id: 2,
        title: `Valid Palindrome`,
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
        problem: `Given a string s, return true if it is a palindrome, or false otherwise.`,
        difficulty: 'Easy',
        timeLimit: 8,
        examples: [
          {
            input: 's = "A man, a plan, a canal: Panama"',
            output: 'true',
            explanation: '"amanaplanacanalpanama" is a palindrome.'
          },
          {
            input: 's = "race a car"',
            output: 'false',
            explanation: '"raceacar" is not a palindrome.'
          },
          {
            input: 's = " "',
            output: 'true',
            explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
          }
        ],
        testCases: [
          { input: '"A man, a plan, a canal: Panama"', expected: 'true' },
          { input: '"race a car"', expected: 'false' },
          { input: '" "', expected: 'true' },
          { input: '"Madam"', expected: 'true' }
        ],
        functionName: "isPalindrome",
        parameters: ["s"],
        starterCode: `function isPalindrome(s) {
    // Write your solution here
    // Use two pointers approach
    
}`
      },
      {
        id: 3,
        title: `Container With Most Water`,
        description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).`,
        problem: `Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
        difficulty: 'Medium',
        timeLimit: 15,
        examples: [
          {
            input: 'height = [1,8,6,2,5,4,8,3,7]',
            output: '49',
            explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.'
          },
          {
            input: 'height = [1,1]',
            output: '1',
            explanation: 'The maximum area is 1.'
          }
        ],
        testCases: [
          { input: '[1,8,6,2,5,4,8,3,7]', expected: '49' },
          { input: '[1,1]', expected: '1' },
          { input: '[4,3,2,1,4]', expected: '16' },
          { input: '[1,2,1]', expected: '2' }
        ],
        functionName: "maxArea",
        parameters: ["height"],
        starterCode: `function maxArea(height) {
    // Write your solution here
    // Use two pointers approach for optimal O(n) solution
    
}`
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
    setExamCompleted(true);
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
            testCases={currentQuestion?.testCases || []}
            functionName={currentQuestion?.functionName || ''}
            showTestResults={true}
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
