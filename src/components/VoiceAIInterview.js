import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../services/aiService';
import { studyCategories } from '../data/questionsData';
import nodeJsInterviewQuestions from '../data/nodejs-quetions';
import LoadingSpinner from './LoadingSpinner';
import { Mic, MicOff, Volume2, VolumeX, SkipForward, RotateCcw, Brain, Clock } from 'lucide-react';
import './VoiceAIInterview.css';

const VoiceAIInterview = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // Core state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [answerSummary, setAnswerSummary] = useState('');
  
  // AI and voice state
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [status, setStatus] = useState('Ready to start interview');
  
  // Interview flow state
  const [interviewActive, setInterviewActive] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [currentStep, setCurrentStep] = useState('waiting'); // waiting, speaking, listening, analyzing
  const [questionHistory, setQuestionHistory] = useState([]);
  // const [askedQuestionIds, setAskedQuestionIds] = useState(new Set()); // Unused
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    totalScore: 0,
    averageScore: 0,
    timeSpent: 0
  });
  const [showSummary, setShowSummary] = useState(false);
  
  // Refs and timers
  const startTimeRef = useRef(null);
  const stepTimeoutRef = useRef(null);
  const autoFlowRef = useRef(null);

  // Get questions based on category
  const getQuestionsForCategory = () => {
    if (categoryId === 'nodejs-fundamentals') {
      return nodeJsInterviewQuestions.questions;
    }
    
    const category = studyCategories.find(cat => cat.id === categoryId);
    return category ? category.questions : [];
  };

  // Initialize AI models and voice capabilities
  useEffect(() => {
    const initializeAI = async () => {
      setIsModelLoading(true);
      
      try {
        // Initialize voice capabilities first
        const speechSupported = aiService.initializeSpeechSynthesis();
        const recognitionSupported = aiService.initializeSpeechRecognition();
        setVoiceSupported(speechSupported && recognitionSupported);
        
        // Monitor loading progress
        const progressInterval = setInterval(() => {
          const status = aiService.getLoadingStatus();
          setLoadingProgress(status.progress);
          if (!status.isLoading) {
            clearInterval(progressInterval);
          }
        }, 500);

        // Initialize all AI models
        await Promise.all([
          aiService.initializeQAModel(),
          aiService.initializeSummarizer(),
          aiService.initializeTextGenerator(),
          aiService.initializeEmbedder()
        ]);
        
        // Generate embeddings for questions
        const questions = getQuestionsForCategory();
        await aiService.generateQuestionEmbeddings(questions);
        
        // Initialize shuffled questions
        const shuffled = shuffleQuestions(questions);
        setShuffledQuestions(shuffled);
        setCurrentQuestionIndex(0);
        
        clearInterval(progressInterval);
        setIsModelLoading(false);
        
        // Load first question
        loadRandomQuestion();
        
      } catch (error) {
        console.error('Failed to initialize AI:', error);
        setIsModelLoading(false);
        loadRandomQuestion(); // Continue with basic functionality
      }
    };

    initializeAI();
    
    // Cleanup on unmount
    return () => {
      const currentStepTimeout = stepTimeoutRef.current;
      const currentAutoFlow = autoFlowRef.current;
      if (currentStepTimeout) clearTimeout(currentStepTimeout);
      if (currentAutoFlow) clearTimeout(currentAutoFlow);
      aiService.stopSpeaking();
      aiService.stopListening();
    };
  }, [categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shuffle questions array to avoid repetition
  const shuffleQuestions = (questions) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load next unique question from shuffled list
  const loadRandomQuestion = async () => {
    const questions = getQuestionsForCategory();
    if (questions.length === 0) {
      navigate('/');
      return;
    }

    // Initialize shuffled questions if empty or reset if all questions asked
    if (shuffledQuestions.length === 0 || currentQuestionIndex >= shuffledQuestions.length) {
      const newShuffled = shuffleQuestions(questions);
      setShuffledQuestions(newShuffled);
      setCurrentQuestionIndex(1); // Start at 1 since we're setting first question
      // setAskedQuestionIds(new Set()); // Unused
      
      // Set first question from new shuffle
      const firstQuestion = newShuffled[0];
      setCurrentQuestion(firstQuestion);
      // setAskedQuestionIds(prev => new Set([...prev, firstQuestion.id || firstQuestion.question])); // Unused
    } else {
      // Get next question from shuffled list
      const nextQuestion = shuffledQuestions[currentQuestionIndex];
      setCurrentQuestion(nextQuestion);
      // setAskedQuestionIds(prev => new Set([...prev, nextQuestion.id || nextQuestion.question])); // Unused
      setCurrentQuestionIndex(prev => prev + 1);
    }
    
    setUserAnswer('');
    setCurrentAnswer('');
    setFeedback(null);
    setAnswerSummary('');
    setCurrentStep('waiting');
  };

  // Start automated interview flow
  const startAutomatedInterview = async () => {
    if (!voiceSupported) {
      alert('Voice features are not supported in your browser. Please use a modern browser with microphone access.');
      return;
    }
    
    setInterviewActive(true);
    setAutoMode(true);
    startTimeRef.current = Date.now();
    
    // Start the automated flow
    await speakCurrentQuestion();
  };

  // Stop automated interview (unused but kept for compatibility)
  // const stopAutomatedInterview = () => {
  //   setInterviewActive(false);
  //   setAutoMode(false);
  //   setCurrentStep('waiting');
  //   aiService.stopSpeaking();
  //   aiService.stopListening();
  //   
  //   if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
  //   if (autoFlowRef.current) clearTimeout(autoFlowRef.current);
  // };

  // Speak current question with AI voice
  const speakCurrentQuestion = async () => {
    if (!currentQuestion || !voiceSupported) return;
    
    setCurrentStep('speaking');
    setIsSpeaking(true);
    setStatus('🤖 AI is asking the question...');
    
    const questionText = `Here is your interview question: ${currentQuestion.question}. Please provide your answer.`;
    
    try {
      await aiService.speakQuestion(questionText);
      setIsSpeaking(false);
      setStatus('✅ Question asked. Ready for your answer.');
      
      // Always manual - user needs to click to start answering
      setCurrentStep('waiting');
    } catch (error) {
      console.error('Failed to speak question:', error);
      setIsSpeaking(false);
      setCurrentStep('waiting');
      setStatus('❌ Error speaking question. Please try again.');
    }
  };

  // Start listening for user's voice answer
  const listenForAnswer = async () => {
    if (!aiService.speechRecognition) {
      setStatus('Speech recognition not available');
      return;
    }

    setIsListening(true);
    setStatus('🎤 Listening... (I\'ll wait for you to finish - 5 sec pause to complete)');
    setCurrentAnswer('');

    // Set up interim result callback
    aiService.onInterimResult = (transcript) => {
      setCurrentAnswer(transcript);
      // Update status to show we're getting input
      if (transcript.trim().length > 0) {
        setStatus('🎤 Recording your answer... (pause 5 seconds when done)');
      }
    };

    try {
      const result = await aiService.startListening();
      
      if (result.success && result.transcript) {
        setCurrentAnswer(result.transcript);
        setIsListening(false);
        
        
        if (result.completedByPause) {
          setStatus('✅ Answer completed (5-second pause detected)');
        } else {
          setStatus('✅ Answer recorded');
          
        }
        
        // Small delay to show completion status
        setTimeout(() => {
          if (autoMode) {
            setStatus('🤖 Analyzing your answer...');
            analyzeAnswer(result.transcript);
            // console.log("result.transcript",result.transcript); // Debug log removed
          } else {
            setUserAnswer(result.transcript); // Use the actual transcript, not currentAnswer
            setStatus('✅ Answer recorded. Click "Analyze Answer" to continue.');
          }
        }, 1000);
      } else {
        setStatus('❌ Could not capture your answer. Please try again.');
        setIsListening(false);
      }
    } catch (error) {
      console.error('Error listening for answer:', error);
      setStatus('❌ Error capturing answer');
      setIsListening(false);
    }

    // Clean up callback
    aiService.onInterimResult = null;
  };

  // Analyze answer with AI
  const analyzeAnswer = async (answer) => {
    setCurrentStep('analyzing');
    setIsAnalyzing(true);

    try {
      // Generate answer summary
      const summary = await aiService.summarizeAnswer(answer);
      setAnswerSummary(summary);

      // Analyze answer quality
      const analysisResult = await aiService.analyzeAnswer(
        currentQuestion.question,
        answer,
        currentQuestion.answer
      );

      setFeedback(analysisResult);

      // Update session statistics
      const newStats = {
        questionsAnswered: sessionStats.questionsAnswered + 1,
        totalScore: sessionStats.totalScore + analysisResult.score,
        averageScore: Math.round((sessionStats.totalScore + analysisResult.score) / (sessionStats.questionsAnswered + 1)),
        timeSpent: startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
      };
      setSessionStats(newStats);

      // Add to question history
      const historyEntry = {
        ...currentQuestion,
        userAnswer: answer,
        answerSummary: summary,
        feedback: analysisResult,
        timestamp: new Date()
      };
      setQuestionHistory(prev => [...prev, historyEntry]);

      setIsAnalyzing(false);

      // Always speak feedback in manual mode
      await speakFeedback(analysisResult);

      setCurrentStep('waiting');

    } catch (error) {
      console.error('Failed to analyze answer:', error);
      setIsAnalyzing(false);
      setCurrentStep('waiting');
    }
  };

  // Move to next question (manual only)
  const moveToNextQuestion = async () => {
    await loadRandomQuestion();
    // Always manual - no auto-speaking
    setCurrentStep('waiting');
  };

  // Speak AI feedback
  const speakFeedback = async (feedbackData) => {
    if (!voiceSupported) return;
    
    let feedbackText = `Your answer scored ${feedbackData.score} out of 10. `;
    feedbackText += feedbackData.feedback;
    feedbackText += ' Click Next Question when ready to continue.';
    
    try {
      await aiService.speakQuestion(feedbackText);
      // No auto-progression - always manual
    } catch (error) {
      console.error('Failed to speak feedback:', error);
    }
  };

  // Manual controls
  const handleManualSpeak = () => {
    if (isSpeaking) {
      aiService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakCurrentQuestion();
    }
  };

  // Stop listening manually
  const stopListening = () => {
    if (aiService.speechRecognition && isListening) {
      aiService.stopListening();
      setIsListening(false);
      setStatus('🛑 Listening stopped');
    }
  };

  const handleManualListen = () => {
    if (isListening) {
      stopListening();
    } else {
      listenForAnswer();
    }
  };

  const handleSkipQuestion = async () => {
    aiService.stopSpeaking();
    aiService.stopListening();
    setCurrentStep('waiting');
    await loadRandomQuestion();
  };

  const handleRetryQuestion = () => {
    setUserAnswer('');
    setCurrentAnswer('');
    setFeedback(null);
    setAnswerSummary('');
    setCurrentStep('waiting');
  };

  // Start interview mode (manual progression)
  const startInterview = async () => {
    setInterviewActive(true);
    setAutoMode(false); // Always manual mode
    setCurrentStep('speaking');
    startTimeRef.current = Date.now();
    
    if (!currentQuestion) {
      await loadRandomQuestion();
    }
    
    speakCurrentQuestion();
  };

  // Stop interview
  const stopInterview = () => {
    setInterviewActive(false);
    setAutoMode(false);
    setCurrentStep('waiting');
    aiService.stopSpeaking();
    aiService.stopListening();
    
    if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    if (autoFlowRef.current) clearTimeout(autoFlowRef.current);
  };

  // Submit interview and show summary
  const handleSubmitInterview = () => {
    setInterviewActive(false);
    setAutoMode(false);
    setShowSummary(true);
    aiService.stopSpeaking();
    aiService.stopListening();
  };

  // Generate ideal answer suggestions
  const generateIdealAnswer = (question) => {
    // Return the actual expected answer from the question data
    if (question.answer) {
      return question.answer;
    }
    
    // Fallback for questions without predefined answers
    const fallbackAnswers = {
      "javascript": "Provide a comprehensive explanation covering syntax, use cases, and practical examples with code snippets.",
      "nodejs": "Explain the concept, its role in Node.js architecture, performance implications, and provide real-world examples.",
      "react": "Describe the feature, its benefits, implementation patterns, and best practices with code examples.",
      "default": "A thorough answer should include: definition, key concepts, practical examples, use cases, and best practices."
    };
    
    const questionText = question.question.toLowerCase();
    if (questionText.includes('node') || questionText.includes('npm')) return fallbackAnswers.nodejs;
    if (questionText.includes('react') || questionText.includes('jsx')) return fallbackAnswers.react;
    if (questionText.includes('javascript') || questionText.includes('js')) return fallbackAnswers.javascript;
    
    return fallbackAnswers.default;
  };

  // Calculate overall interview score
  const calculateOverallScore = () => {
    if (questionHistory.length === 0) return 0;
    const totalScore = questionHistory.reduce((sum, q) => sum + (q.feedback?.score || 0), 0);
    return Math.round(totalScore / questionHistory.length);
  };

  if (showSummary) {
    const overallScore = calculateOverallScore();
    const performanceLevel = overallScore >= 8 ? 'excellent' : overallScore >= 6 ? 'good' : overallScore >= 4 ? 'average' : 'needs-improvement';
    const performanceColor = overallScore >= 8 ? '#10b981' : overallScore >= 6 ? '#3b82f6' : overallScore >= 4 ? '#f59e0b' : '#ef4444';
    
    return (
      <div className="voice-ai-interview-container">
        <div className="interview-summary-modern">
          {/* Header Section */}
          <div className="summary-header-modern">
            <div className="header-content">
              <h1>🎯 Interview Complete!</h1>
              <p>Here's your comprehensive performance analysis</p>
            </div>
            <div className="overall-score-modern" style={{ borderColor: performanceColor }}>
              <div className="score-circle-modern" style={{ background: `linear-gradient(135deg, ${performanceColor}, ${performanceColor}dd)` }}>
                <span className="score-number-large">{overallScore}</span>
                <span className="score-label-small">/10</span>
              </div>
              <div className="performance-badge" style={{ backgroundColor: performanceColor }}>
                {performanceLevel.replace('-', ' ').toUpperCase()}
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="summary-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-number">{questionHistory.length}</span>
                <span className="stat-label">Questions Answered</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <span className="stat-number">{Math.floor(sessionStats.timeSpent / 60)}m {sessionStats.timeSpent % 60}s</span>
                <span className="stat-label">Total Time</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-number">{sessionStats.averageScore}%</span>
                <span className="stat-label">Average Score</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <span className="stat-number">{questionHistory.filter(q => q.feedback?.score >= 7).length}</span>
                <span className="stat-label">Strong Answers</span>
              </div>
            </div>
          </div>

          {/* Questions Review */}
          <div className="questions-review-modern">
            <h2>📝 Detailed Question Analysis</h2>
            <div className="questions-grid">
              {questionHistory.map((item, index) => (
                <div key={index} className="question-card-modern">
                  <div className="question-header-modern">
                    <div className="question-number">Q{index + 1}</div>
                    <div className="question-score-modern">
                      <span className={`score-badge-modern ${item.feedback?.score >= 7 ? 'excellent' : item.feedback?.score >= 5 ? 'good' : 'needs-work'}`}>
                        {item.feedback?.score || 0}/10
                      </span>
                    </div>
                  </div>
                  
                  <div className="question-text-modern">
                    <h4>{item.question}</h4>
                  </div>

                  <div className="answer-comparison">
                    {/* Your Answer */}
                    <div className="answer-block your-answer-modern">
                      <div className="answer-header">
                        <span className="answer-icon">🎤</span>
                        <h5>Your Answer</h5>
                      </div>
                      <div className="answer-content-modern">
                        <p>{item.userAnswer}</p>
                        {item.answerSummary && (
                          <div className="answer-summary-modern">
                            <strong>AI Summary:</strong> {item.answerSummary}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI Suggested Answer */}
                    <div className="answer-block suggested-answer-modern">
                      <div className="answer-header">
                        <span className="answer-icon">💡</span>
                        <h5>Suggested Answer</h5>
                      </div>
                      <div className="answer-content-modern">
                        <p>{generateIdealAnswer(item)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="feedback-modern">
                    <div className="feedback-header">
                      <span className="feedback-icon">🤖</span>
                      <h5>AI Analysis</h5>
                    </div>
                    <p className="feedback-text">{item.feedback?.feedback}</p>
                    
                    {item.feedback?.strengths?.length > 0 && (
                      <div className="feedback-points strengths-modern">
                        <h6>✅ Strengths</h6>
                        <ul>
                          {item.feedback.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.feedback?.improvements?.length > 0 && (
                      <div className="feedback-points improvements-modern">
                        <h6>🎯 Areas for Improvement</h6>
                        <ul>
                          {item.feedback.improvements.map((improvement, i) => (
                            <li key={i}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="summary-actions-modern">
            <button 
              className="btn-modern btn-primary-modern"
              onClick={() => {
                setShowSummary(false);
                setQuestionHistory([]);
                setSessionStats({ questionsAnswered: 0, totalScore: 0, averageScore: 0, timeSpent: 0 });
                loadRandomQuestion();
              }}
            >
              🔄 Start New Interview
            </button>
            <button 
              className="btn-modern btn-secondary-modern"
              onClick={() => navigate('/dashboard')}
            >
              🏠 Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isModelLoading) {
    return (
      <div className="voice-ai-interview-container">
        <div className="loading-section">
          <LoadingSpinner />
          <h3>Loading Advanced AI Models...</h3>
          <p>Initializing BART, TinyLlama, embeddings, and voice capabilities</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p>{Math.round(loadingProgress)}% Complete</p>
          <div className="loading-info">
            <p>🤖 BART Summarization Model</p>
            <p>🦙 TinyLlama Text Generation</p>
            <p>🔍 Vector Embeddings for Smart Question Selection</p>
            <p>🎤 Voice Recognition & Synthesis</p>
            <p>🇮🇳 Indian English Accent Support</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="voice-ai-interview-container">
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
    <div className="voice-ai-interview-container">
      {/* Header */}
      <div className="interview-header">
        <div className="header-content">
          <h1>🎤 Voice AI Interview</h1>
          <div className="session-stats">
            <div className="stat">
              <span className="stat-label">Questions:</span>
              <span className="stat-value">{sessionStats.questionsAnswered}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Score:</span>
              <span className="stat-value">{sessionStats.averageScore}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Time:</span>
              <span className="stat-value">{Math.floor(sessionStats.timeSpent / 60)}m</span>
            </div>
          </div>
        </div>
        <div className="header-controls">
          {!interviewActive ? (
            <>
              <button 
                className="btn start-interview"
                onClick={startInterview}
                disabled={!currentQuestion}
              >
                Start Interview
              </button>
              {questionHistory.length > 0 && (
                <button 
                  className="btn btn-success"
                  onClick={handleSubmitInterview}
                >
                  Submit Interview
                </button>
              )}
            </>
          ) : (
            <button 
              className="btn btn-danger"
              onClick={stopInterview}
            >
              Stop Interview
            </button>
          )}
          <button onClick={() => navigate('/')} className="btn-secondary">
            Exit
          </button>
        </div>
      </div>

      {/* Voice Support Warning */}
      {!voiceSupported && (
        <div className="warning-banner">
          <p>⚠️ Voice features require microphone access and a modern browser. Some features may be limited.</p>
        </div>
      )}

      {/* Interview Status */}
      <div className={`interview-status voice-status ${isListening ? 'listening' : ''}`}>
        <div className="status-indicator">
          <div className={`status-icon ${currentStep}`}>
            {currentStep === 'speaking' && <Volume2 size={24} />}
            {currentStep === 'listening' && <Mic size={24} />}
            {currentStep === 'analyzing' && <Brain size={24} />}
            {currentStep === 'waiting' && <Clock size={24} />}
          </div>
          <div className="status-text">
            <strong>{status}</strong>
            {isListening && currentAnswer && (
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                "{currentAnswer.slice(-100)}..."
              </div>
            )}
          </div>
        </div>
        {autoMode && (
          <div className="auto-mode-indicator">
            <span className="auto-badge">AUTO MODE</span>
          </div>
        )}
      </div>

      {/* Question Section */}
      <div className="question-section">
        <div className="question-card">
          <div className="question-header">
            <h2>Interview Question</h2>
            <div className="question-controls">
              <button 
                onClick={handleManualSpeak}
                className={`control-btn ${isSpeaking ? 'active' : ''}`}
                disabled={!voiceSupported}
                title="Speak Question"
              >
                {isSpeaking ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </div>
          <div className="question-content">
            <p>{currentQuestion.question}</p>
          </div>
          {currentQuestion.tags && (
            <div className="question-tags">
              {currentQuestion.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          {userAnswer && !feedback && !isAnalyzing && (
            <div className="question-actions">
              <button 
                onClick={() => analyzeAnswer(userAnswer)}
                className="btn btn-primary"
                disabled={isAnalyzing}
              >
                Analyze Answer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="voice-controls">
        <div className="control-group">
          <button 
            onClick={handleManualListen}
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            disabled={!voiceSupported || currentStep === 'analyzing'}
          >
            {isListening ? <MicOff /> : <Mic />}
            <span>{isListening ? 'Stop Listening' : 'Start Speaking'}</span>
          </button>
          
          <button 
            onClick={handleSkipQuestion}
            className="control-btn"
            disabled={currentStep === 'analyzing'}
          >
            <SkipForward />
            <span>Skip Question</span>
          </button>
          
          <button 
            onClick={handleRetryQuestion}
            className="control-btn"
            disabled={currentStep === 'analyzing'}
          >
            <RotateCcw />
            <span>Retry</span>
          </button>
        </div>
      </div>

      {/* Answer Display */}
      {userAnswer && (
        <div className="answer-section">
          <div className="answer-card">
            <h3>Your Voice Answer</h3>
            <div className="answer-content">
              <p>{userAnswer}</p>
            </div>
            {answerSummary && (
              <div className="answer-summary">
                <h4>AI Summary</h4>
                <p>{answerSummary}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Section */}
      {feedback && (
        <div className="feedback-section">
          <div className="feedback-card">
            <div className="feedback-header">
              <h3>AI Analysis</h3>
              <div className="score-badge">
                <span className="score">{feedback.score}%</span>
              </div>
            </div>

            <div className="feedback-content">
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
            </div>

            <div className="feedback-actions">
              <button onClick={moveToNextQuestion} className="btn-primary">
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview History */}
      {questionHistory.length > 0 && (
        <div className="history-section">
          <div className="history-card">
            <h3>Interview History</h3>
            <div className="history-list">
              {questionHistory.slice(-3).map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-question">
                    <strong>Q:</strong> {item.question.substring(0, 80)}...
                  </div>
                  <div className="history-summary">
                    <strong>Summary:</strong> {item.answerSummary}
                  </div>
                  <div className="history-score">
                    Score: {item.feedback.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAIInterview;
