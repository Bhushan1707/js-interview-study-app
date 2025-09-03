// Basic AI Service for Voice Interview
class AIService {
  constructor() {
    this.speechSynthesis = null;
    this.speechRecognition = null;
    this.isListening = false;
    this.currentUtterance = null;
    this.onInterimResult = null;
  }

  // Initialize speech synthesis
  initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
      return true;
    }
    return false;
  }

  // Initialize speech recognition
  initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-IN'; // Indian English
      this.speechRecognition.maxAlternatives = 3;
      return true;
    }
    return false;
  }

  // Speak question with voice
  async speakQuestion(text) {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not available');
      return false;
    }
    
    // Stop any current speech
    this.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find Indian English voice
    const voices = this.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      voice.name.toLowerCase().includes('indian')
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else {
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    this.currentUtterance = utterance;
    
    return new Promise((resolve) => {
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
      this.speechSynthesis.speak(utterance);
    });
  }

  // Stop current speech
  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  // Enhanced speech recognition with pause detection
  async startListening() {
    if (!this.speechRecognition) return { success: false, transcript: '' };
    
    return new Promise((resolve) => {
      let finalTranscript = '';
      let lastSpeechTime = Date.now();
      let pauseTimer = null;
      let isListening = true;
      
      const PAUSE_THRESHOLD = 5000; // 5 seconds pause
      const MIN_ANSWER_LENGTH = 10;
      
      const finishListening = () => {
        if (!isListening) return;
        isListening = false;
        
        if (pauseTimer) {
          clearTimeout(pauseTimer);
          pauseTimer = null;
        }
        
        try {
          this.speechRecognition.stop();
        } catch (e) {
          // Already stopped
        }
        
        resolve({ 
          success: true, 
          transcript: finalTranscript.trim(),
          completedByPause: true
        });
      };
      
      const resetPauseTimer = () => {
        if (pauseTimer) {
          clearTimeout(pauseTimer);
        }
        
        if (finalTranscript.trim().length >= MIN_ANSWER_LENGTH) {
          pauseTimer = setTimeout(() => {
            console.log('5-second pause detected, finishing answer...');
            finishListening();
          }, PAUSE_THRESHOLD);
        }
      };
      
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      
      this.speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        let hasNewFinalResult = false;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            hasNewFinalResult = true;
            lastSpeechTime = Date.now();
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (hasNewFinalResult || interimTranscript.trim().length > 0) {
          lastSpeechTime = Date.now();
          resetPauseTimer();
        }
        
        if (this.onInterimResult && isListening) {
          const currentText = finalTranscript + interimTranscript;
          this.onInterimResult(currentText);
        }
      };
      
      this.speechRecognition.onend = () => {
        if (isListening) {
          const timeSinceLastSpeech = Date.now() - lastSpeechTime;
          
          if (finalTranscript.trim().length >= MIN_ANSWER_LENGTH && timeSinceLastSpeech > 2000) {
            finishListening();
          } else if (isListening) {
            try {
              this.speechRecognition.start();
            } catch (e) {
              setTimeout(() => {
                if (isListening) {
                  try {
                    this.speechRecognition.start();
                  } catch (e2) {
                    finishListening();
                  }
                }
              }, 100);
            }
          }
        }
      };
      
      this.speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'no-speech') {
          console.log('No speech detected, continuing to listen...');
          if (isListening) {
            setTimeout(() => {
              try {
                this.speechRecognition.start();
              } catch (e) {
                console.log('Could not restart recognition:', e);
              }
            }, 500);
          }
          return;
        } else if (event.error === 'aborted') {
          return;
        } else if (event.error === 'not-allowed') {
          resolve({ 
            success: false, 
            transcript: '', 
            error: 'Microphone permission denied. Please allow microphone access.' 
          });
          return;
        } else if (event.error === 'network') {
          console.log('Network error, attempting to continue...');
          if (isListening && finalTranscript.trim().length > 0) {
            finishListening();
          }
          return;
        } else {
          console.log('Speech recognition error:', event.error);
          if (finalTranscript.trim().length > 0) {
            finishListening();
          } else {
            if (isListening) {
              setTimeout(() => {
                try {
                  this.speechRecognition.start();
                } catch (e) {
                  resolve({ success: false, transcript: '', error: event.error });
                }
              }, 1000);
            }
          }
        }
      };
      
      setTimeout(() => {
        if (isListening && finalTranscript.trim().length < MIN_ANSWER_LENGTH) {
          resetPauseTimer();
        }
      }, 1000);
      
      try {
        this.speechRecognition.start();
      } catch (e) {
        resolve({ success: false, transcript: '', error: e.message });
      }
    });
  }

  // Stop listening
  stopListening() {
    if (this.speechRecognition && this.isListening) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }

  // Basic answer analysis (simplified)
  async analyzeAnswer(question, userAnswer, expectedAnswer) {
    // Simple keyword-based analysis
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    const expectedWords = expectedAnswer.toLowerCase().split(/\s+/);
    
    const keywordMatches = userWords.filter(word => 
      expectedWords.some(expectedWord => 
        expectedWord.includes(word) || word.includes(expectedWord)
      )
    );
    
    const keywordScore = Math.min(keywordMatches.length / Math.max(expectedWords.length * 0.3, 5), 1);
    const lengthScore = Math.min(userWords.length / Math.max(expectedWords.length * 0.5, 20), 1);
    
    const score = Math.round((keywordScore * 0.7 + lengthScore * 0.3) * 100);

    return {
      score: Math.min(score, 100),
      feedback: score > 70 ? "Good understanding demonstrated!" : 
                score > 50 ? "Decent answer, but could include more details." :
                "Consider reviewing the key concepts and providing more comprehensive explanation.",
      strengths: score > 60 ? ["Good coverage of key concepts"] : [],
      improvements: score < 60 ? ["Include more technical details", "Expand on key concepts"] : []
    };
  }

  // Basic answer summarization
  async summarizeAnswer(userAnswer) {
    if (userAnswer.length < 50) {
      return userAnswer;
    }
    return userAnswer.substring(0, 100) + '...';
  }

  // Dummy methods for compatibility
  async initializeQAModel() { return true; }
  async initializeSummarizer() { return true; }
  async initializeTextGenerator() { return true; }
  async initializeEmbedder() { return true; }
  async generateQuestionEmbeddings() { return true; }
  async findSimilarQuestions(currentQuestion, allQuestions, count = 3) { 
    return allQuestions.slice(0, count); 
  }
  
  getLoadingStatus() {
    return { isLoading: false, progress: 100 };
  }
  
  isReady() {
    return true;
  }
}

// Create singleton instance
const aiService = new AIService();

export default aiService;