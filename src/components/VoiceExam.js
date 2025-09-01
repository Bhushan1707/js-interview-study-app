import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Play, Pause, RotateCcw, ArrowLeft, 
  Volume2, VolumeX, Clock, Award, CheckCircle 
} from 'lucide-react';
import { studyCategories } from '../data/questionsData';
import { speechRecognition, textToSpeech } from '../utils/speechRecognition';
import { answerAnalysis } from '../utils/answerAnalysis';
import { saveExamResult } from '../utils/userManager';
import './VoiceExam.css';

const VoiceExam = ({ completedQuestions }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // Exam state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Speech state
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // Results state
  const [answers, setAnswers] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  
  // Settings
  const [autoReadQuestions, setAutoReadQuestions] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  
  const timerRef = useRef(null);
  const category = studyCategories.find(cat => cat.id === categoryId);
  
  // Get exam questions (only from completed questions)
  const examQuestions = React.useMemo(() => {
    if (!category) return [];
    
    const completedCategoryQuestions = category.questions.filter(q => 
      completedQuestions.has(q.id)
    );
    
    // Take up to 5 questions for voice exam
    return completedCategoryQuestions.slice(0, Math.min(5, completedCategoryQuestions.length));
  }, [category, completedQuestions]);

  const currentQuestion = examQuestions[currentQuestionIndex];

  // Initialize speech recognition
  useEffect(() => {
    if (!speechRecognition.isSupported()) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    speechRecognition.onSpeechResult((result) => {
      // Append new speech to existing answer instead of replacing
      setCurrentAnswer(prev => {
        let newFinal = result.final.trim();
        
        // Fix common punctuation issues
        newFinal = newFinal
          .replace(/\bdot\b/gi, '.')
          .replace(/\bcomma\b/gi, ',')
          .replace(/\bquestion mark\b/gi, '?')
          .replace(/\bexclamation mark\b/gi, '!')
          .replace(/\bopen bracket\b/gi, '(')
          .replace(/\bclose bracket\b/gi, ')')
          .replace(/\bopen parenthesis\b/gi, '(')
          .replace(/\bclose parenthesis\b/gi, ')')
          .replace(/\bsemicolon\b/gi, ';')
          .replace(/\bcolon\b/gi, ':');
        
        if (newFinal && prev) {
          return prev + ' ' + newFinal;
        } else if (newFinal) {
          return newFinal;
        }
        return prev;
      });
      setInterimTranscript(result.interim);
    });

    speechRecognition.onSpeechStart(() => {
      setIsListening(true);
    });

    speechRecognition.onSpeechEnd(() => {
      setIsListening(false);
    });

    speechRecognition.onSpeechError((error) => {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      if (error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access to use voice exam.');
      }
    });

    return () => {
      speechRecognition.stopListening();
      textToSpeech.stop();
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0 && !examCompleted) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (examStarted && timeLeft === 0) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, examStarted, examCompleted]);

  // Auto-read questions
  useEffect(() => {
    if (examStarted && currentQuestion && autoReadQuestions && speechEnabled) {
      const questionText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
      setTimeout(() => {
        readQuestion(questionText);
      }, 1000);
    }
  }, [currentQuestionIndex, examStarted, autoReadQuestions, speechEnabled]);

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(examQuestions.length * 180); // 3 minutes per question
    setAnswers(new Array(examQuestions.length).fill(''));
    
    if (speechEnabled) {
      textToSpeech.speak('Voice exam started. Listen carefully to each question and provide your answer using the microphone.');
    }
  };

  const readQuestion = (text) => {
    if (!speechEnabled) return;
    
    setIsReading(true);
    textToSpeech.speak(text, {
      onEnd: () => setIsReading(false),
      onError: () => setIsReading(false)
    });
  };

  const startRecording = () => {
    if (isListening) return;
    
    try {
      speechRecognition.startListening();
      // Don't clear existing answer - allow continuous recording
      setInterimTranscript('');
    } catch (error) {
      alert('Error starting speech recognition: ' + error.message);
    }
  };

  const stopRecording = () => {
    speechRecognition.stopListening();
  };

  const saveCurrentAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer.trim();
    setAnswers(newAnswers);
    
    if (speechEnabled) {
      textToSpeech.speak('Answer saved.');
    }
  };

  const nextQuestion = () => {
    saveCurrentAnswer();
    
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setInterimTranscript('');
    } else {
      finishExam();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      saveCurrentAnswer();
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1] || '');
      setInterimTranscript('');
    }
  };

  const handleTimeUp = () => {
    if (speechEnabled) {
      textToSpeech.speak('Time is up. Finishing exam.');
    }
    finishExam();
  };

  const finishExam = () => {
    saveCurrentAnswer();
    setExamCompleted(true);
    setExamStarted(false);
    speechRecognition.stopListening();
    
    // Analyze all answers
    analyzeAnswers();
  };

  const analyzeAnswers = () => {
    const results = [];
    let totalScore = 0;

    examQuestions.forEach((question, index) => {
      const userAnswer = answers[index] || '';
      const analysis = answerAnalysis.analyzeAnswer(
        userAnswer,
        question.answer,
        question.question
      );
      
      results.push({
        questionIndex: index,
        question: question.question,
        userAnswer,
        correctAnswer: question.answer,
        analysis
      });
      
      totalScore += analysis.score;
    });

    setAnalysisResults(results);
    setOverallScore(Math.round(totalScore / examQuestions.length));

    // Save exam result
    const examResult = {
      categoryId,
      categoryTitle: category.title,
      score: Math.round(totalScore / examQuestions.length),
      totalQuestions: examQuestions.length,
      answers: results,
      examType: 'voice',
      timeSpent: (examQuestions.length * 180) - timeLeft
    };

    saveExamResult(`${categoryId}_voice`, examResult);

    if (speechEnabled) {
      setTimeout(() => {
        textToSpeech.speak(`Exam completed. Your overall score is ${Math.round(totalScore / examQuestions.length)} out of 10.`);
      }, 1000);
    }
  };

  const restartExam = () => {
    setCurrentQuestionIndex(0);
    setExamStarted(false);
    setExamCompleted(false);
    setTimeLeft(0);
    setAnswers([]);
    setAnalysisResults([]);
    setOverallScore(0);
    setCurrentAnswer('');
    setInterimTranscript('');
    speechRecognition.stopListening();
    textToSpeech.stop();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#10b981'; // green
    if (score >= 6) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  if (!category) {
    return (
      <div className="voice-exam-container">
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
      <div className="voice-exam-container">
        <div className="exam-error">
          <h2>No Voice Exam Available</h2>
          <p>Complete some questions in "{category.title}" first to unlock the voice exam.</p>
          <button onClick={() => navigate(`/category/${categoryId}`)} className="back-btn">
            <ArrowLeft size={16} />
            Study Questions
          </button>
        </div>
      </div>
    );
  }

  // Results view
  if (examCompleted) {
    return (
      <div className="voice-exam-container">
        <div className="exam-results">
          <div className="results-header">
            <Award size={48} style={{ color: getScoreColor(overallScore) }} />
            <h2>Voice Exam Results</h2>
            <div className="score-display">
              <span className="score-number" style={{ color: getScoreColor(overallScore) }}>
                {overallScore}/10
              </span>
              <span className="score-details">Overall Score</span>
            </div>
          </div>

          <div className="results-breakdown">
            {analysisResults.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-header">
                  <span className="question-number">Q{index + 1}</span>
                  <span className="score-badge" style={{ backgroundColor: getScoreColor(result.analysis.score) }}>
                    {result.analysis.score}/10
                  </span>
                </div>
                
                <div className="result-content">
                  <h4>Question:</h4>
                  <p className="question-text">{result.question}</p>
                  
                  <h4>Your Answer:</h4>
                  <p className="user-answer">{result.userAnswer || 'No answer provided'}</p>
                  
                  <div className="analysis-feedback">
                    <h4>Feedback:</h4>
                    {result.analysis.feedback.map((feedback, i) => (
                      <p key={i} className="feedback-item">{feedback}</p>
                    ))}
                    
                    {result.analysis.strengths.length > 0 && (
                      <div className="strengths">
                        <strong>Strengths:</strong>
                        <ul>
                          {result.analysis.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {result.analysis.improvements.length > 0 && (
                      <div className="improvements">
                        <strong>Areas for Improvement:</strong>
                        <ul>
                          {result.analysis.improvements.map((improvement, i) => (
                            <li key={i}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

  // Exam intro
  if (!examStarted) {
    return (
      <div className="voice-exam-container">
        <div className="exam-intro">
          <h1>Voice Exam: {category.title}</h1>
          
          <div className="exam-info">
            <div className="info-item">
              <strong>Questions:</strong> {examQuestions.length}
            </div>
            <div className="info-item">
              <strong>Time Limit:</strong> {examQuestions.length * 3} minutes
            </div>
            <div className="info-item">
              <strong>Format:</strong> Voice answers with AI analysis
            </div>
            <div className="info-item">
              <strong>Scoring:</strong> 1-10 scale per question
            </div>
          </div>

          <div className="exam-settings">
            <h3>Settings</h3>
            <label className="setting-item">
              <input
                type="checkbox"
                checked={autoReadQuestions}
                onChange={(e) => setAutoReadQuestions(e.target.checked)}
              />
              Auto-read questions aloud
            </label>
            <label className="setting-item">
              <input
                type="checkbox"
                checked={speechEnabled}
                onChange={(e) => setSpeechEnabled(e.target.checked)}
              />
              Enable text-to-speech feedback
            </label>
          </div>

          <div className="exam-instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>Each question will be read aloud (if enabled)</li>
              <li>Click the microphone to start recording your answer</li>
              <li>Speak clearly and provide detailed explanations</li>
              <li>Your answers will be analyzed by AI for technical accuracy</li>
              <li>You can navigate between questions and modify answers</li>
            </ul>
          </div>

          <button onClick={startExam} className="start-exam-btn">
            <Mic size={20} />
            Start Voice Exam
          </button>
        </div>
      </div>
    );
  }

  // Active exam view
  return (
    <div className="voice-exam-container">
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

        <div className="exam-controls">
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`control-btn ${speechEnabled ? 'active' : ''}`}
            title="Toggle text-to-speech"
          >
            {speechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      <div className="exam-content">
        <div className="question-section">
          <div className="question-header">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <button
              onClick={() => readQuestion(currentQuestion.question)}
              className="read-question-btn"
              disabled={isReading}
            >
              {isReading ? <Pause size={16} /> : <Play size={16} />}
              {isReading ? 'Reading...' : 'Read Question'}
            </button>
          </div>
          <p className="question-text">{currentQuestion.question}</p>
        </div>

        <div className="answer-section">
          <div className="recording-controls">
            <button
              onClick={isListening ? stopRecording : startRecording}
              className={`record-btn ${isListening ? 'recording' : ''}`}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              {isListening ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            {(currentAnswer || interimTranscript) && (
              <button onClick={saveCurrentAnswer} className="save-btn">
                <CheckCircle size={16} />
                Save Answer
              </button>
            )}
          </div>

          <div className="answer-display">
            <h3>Your Answer:</h3>
            <div className="answer-input-container">
              <textarea
                className="answer-textarea"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Click the microphone and start speaking, or type your answer here..."
                rows={6}
              />
              {interimTranscript && (
                <div className="interim-overlay">
                  <span className="interim-text">{interimTranscript}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="exam-navigation">
          <button 
            onClick={previousQuestion} 
            disabled={currentQuestionIndex === 0}
            className="nav-btn"
          >
            Previous
          </button>
          
          <span className="nav-info">
            {currentQuestionIndex + 1} / {examQuestions.length}
          </span>
          
          {currentQuestionIndex === examQuestions.length - 1 ? (
            <button onClick={finishExam} className="finish-btn">
              Finish Exam
            </button>
          ) : (
            <button onClick={nextQuestion} className="nav-btn primary">
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceExam;
