// AI-powered answer analysis system for JavaScript interview questions

export class AnswerAnalysisService {
  constructor() {
    this.keywordWeights = {
      // Core JavaScript concepts
      'closure': 3,
      'hoisting': 3,
      'prototype': 3,
      'async': 2,
      'await': 2,
      'promise': 2,
      'callback': 2,
      'scope': 2,
      'this': 2,
      'bind': 2,
      'call': 2,
      'apply': 2,
      'arrow function': 2,
      'event loop': 3,
      'execution context': 3,
      'lexical': 2,
      'variable': 1,
      'function': 1,
      'object': 1,
      'array': 1,
      'string': 1,
      'number': 1,
      'boolean': 1,
      'undefined': 1,
      'null': 1,
      'typeof': 1,
      'instanceof': 1,
      'constructor': 2,
      'inheritance': 2,
      'polymorphism': 2,
      'encapsulation': 2,
      'destructuring': 2,
      'spread': 2,
      'rest': 2,
      'template literal': 2,
      'module': 2,
      'import': 1,
      'export': 1,
      'class': 2,
      'extends': 2,
      'super': 2,
      'static': 2,
      'private': 2,
      'public': 1,
      'getter': 2,
      'setter': 2,
      'map': 1,
      'filter': 1,
      'reduce': 2,
      'forEach': 1,
      'find': 1,
      'some': 1,
      'every': 1,
      'includes': 1,
      'indexOf': 1,
      'slice': 1,
      'splice': 1,
      'push': 1,
      'pop': 1,
      'shift': 1,
      'unshift': 1,
      'concat': 1,
      'join': 1,
      'split': 1,
      'replace': 1,
      'match': 1,
      'test': 1,
      'regex': 2,
      'regular expression': 2,
      'json': 1,
      'parse': 1,
      'stringify': 1,
      'try': 1,
      'catch': 1,
      'finally': 1,
      'throw': 1,
      'error': 1,
      'dom': 2,
      'document': 1,
      'element': 1,
      'event': 1,
      'listener': 1,
      'bubbling': 2,
      'capturing': 2,
      'delegation': 2,
      'preventDefault': 1,
      'stopPropagation': 1
    };
  }

  analyzeAnswer(userAnswer, correctAnswer, question) {
    const analysis = {
      score: 0,
      maxScore: 10,
      feedback: [],
      strengths: [],
      improvements: [],
      keywordMatches: [],
      completeness: 0,
      accuracy: 0,
      clarity: 0
    };

    // Clean and normalize text
    const cleanUserAnswer = this.cleanText(userAnswer);
    const cleanCorrectAnswer = this.cleanText(correctAnswer);
    // const cleanQuestion = this.cleanText(question); // Unused for now

    // 1. Keyword Analysis (40% of score)
    const keywordScore = this.analyzeKeywords(cleanUserAnswer, cleanCorrectAnswer, analysis);
    
    // 2. Concept Coverage (30% of score)
    const conceptScore = this.analyzeConcepts(cleanUserAnswer, cleanCorrectAnswer, analysis);
    
    // 3. Structure and Clarity (20% of score)
    const clarityScore = this.analyzeClarity(cleanUserAnswer, analysis);
    
    // 4. Completeness (10% of score)
    const completenessScore = this.analyzeCompleteness(cleanUserAnswer, cleanCorrectAnswer, analysis);

    // Calculate final score
    analysis.score = Math.round(
      (keywordScore * 0.4) + 
      (conceptScore * 0.3) + 
      (clarityScore * 0.2) + 
      (completenessScore * 0.1)
    );

    analysis.accuracy = keywordScore;
    analysis.clarity = clarityScore;
    analysis.completeness = completenessScore;

    // Generate overall feedback
    this.generateOverallFeedback(analysis);

    return analysis;
  }

  cleanText(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  analyzeKeywords(userAnswer, correctAnswer, analysis) {
    // const userWords = new Set(userAnswer.split(' ')); // Unused for now
    // const correctWords = new Set(correctAnswer.split(' ')); // Unused for now
    
    let totalWeight = 0;
    let matchedWeight = 0;
    let keywordMatches = [];

    // Check for important keywords
    Object.entries(this.keywordWeights).forEach(([keyword, weight]) => {
      const keywordInCorrect = correctAnswer.includes(keyword);
      const keywordInUser = userAnswer.includes(keyword);
      
      if (keywordInCorrect) {
        totalWeight += weight;
        if (keywordInUser) {
          matchedWeight += weight;
          keywordMatches.push(keyword);
        }
      }
    });

    analysis.keywordMatches = keywordMatches;

    // Calculate keyword score (0-10)
    const keywordScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 10 : 5;
    
    if (keywordMatches.length > 0) {
      analysis.strengths.push(`Good use of technical terms: ${keywordMatches.slice(0, 3).join(', ')}`);
    }

    return Math.min(10, keywordScore);
  }

  analyzeConcepts(userAnswer, correctAnswer, analysis) {
    // Analyze concept understanding based on explanation patterns
    const conceptPatterns = [
      { pattern: /because|since|due to|as a result/, weight: 2, concept: 'causality' },
      { pattern: /for example|such as|like|instance/, weight: 1, concept: 'examples' },
      { pattern: /however|but|although|whereas/, weight: 1, concept: 'contrast' },
      { pattern: /first|second|then|next|finally/, weight: 1, concept: 'sequence' },
      { pattern: /function|method|returns|parameter/, weight: 2, concept: 'functions' },
      { pattern: /object|property|key|value/, weight: 2, concept: 'objects' },
      { pattern: /variable|declare|assign|scope/, weight: 2, concept: 'variables' }
    ];

    let conceptScore = 5; // Base score
    let conceptsFound = [];

    conceptPatterns.forEach(({ pattern, weight, concept }) => {
      if (pattern.test(userAnswer)) {
        conceptScore += weight;
        conceptsFound.push(concept);
      }
    });

    if (conceptsFound.length > 0) {
      analysis.strengths.push(`Good conceptual understanding: ${conceptsFound.slice(0, 2).join(', ')}`);
    }

    return Math.min(10, conceptScore);
  }

  analyzeClarity(userAnswer, analysis) {
    let clarityScore = 5; // Base score

    // Check sentence structure
    const sentences = userAnswer.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = userAnswer.split(' ').length / sentences.length;

    // Optimal sentence length (10-20 words)
    if (avgSentenceLength >= 10 && avgSentenceLength <= 20) {
      clarityScore += 2;
      analysis.strengths.push('Clear sentence structure');
    } else if (avgSentenceLength < 5) {
      clarityScore -= 1;
      analysis.improvements.push('Try to provide more detailed explanations');
    } else if (avgSentenceLength > 30) {
      clarityScore -= 1;
      analysis.improvements.push('Break down complex sentences for better clarity');
    }

    // Check for filler words
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
    const fillerCount = fillerWords.reduce((count, word) => {
      return count + (userAnswer.match(new RegExp(word, 'g')) || []).length;
    }, 0);

    if (fillerCount > 3) {
      clarityScore -= 1;
      analysis.improvements.push('Reduce filler words for clearer communication');
    }

    // Check for technical precision
    const technicalWords = userAnswer.match(/\b(function|variable|object|array|string|number|boolean|undefined|null)\b/g) || [];
    if (technicalWords.length > 2) {
      clarityScore += 1;
      analysis.strengths.push('Good use of technical terminology');
    }

    return Math.min(10, Math.max(0, clarityScore));
  }

  analyzeCompleteness(userAnswer, correctAnswer, analysis) {
    const userLength = userAnswer.split(' ').length;
    const correctLength = correctAnswer.split(' ').length;
    
    let completenessScore = 5; // Base score

    // Compare length (should be at least 30% of correct answer length)
    const lengthRatio = userLength / correctLength;
    
    if (lengthRatio >= 0.5) {
      completenessScore += 3;
      analysis.strengths.push('Comprehensive answer');
    } else if (lengthRatio >= 0.3) {
      completenessScore += 1;
    } else {
      completenessScore -= 2;
      analysis.improvements.push('Provide more detailed explanation');
    }

    // Check for code examples if present in correct answer
    const hasCodeInCorrect = /\b(function|var|let|const|if|for|while)\b/.test(correctAnswer);
    const hasCodeInUser = /\b(function|var|let|const|if|for|while)\b/.test(userAnswer);
    
    if (hasCodeInCorrect && hasCodeInUser) {
      completenessScore += 2;
      analysis.strengths.push('Included code examples');
    } else if (hasCodeInCorrect && !hasCodeInUser) {
      analysis.improvements.push('Consider including code examples');
    }

    return Math.min(10, Math.max(0, completenessScore));
  }

  generateOverallFeedback(analysis) {
    const score = analysis.score;
    
    if (score >= 9) {
      analysis.feedback.push('Excellent answer! You demonstrate strong understanding of JavaScript concepts.');
    } else if (score >= 7) {
      analysis.feedback.push('Good answer with solid understanding. Minor improvements could make it even better.');
    } else if (score >= 5) {
      analysis.feedback.push('Decent answer but could benefit from more detail and technical accuracy.');
    } else if (score >= 3) {
      analysis.feedback.push('Basic understanding shown but needs significant improvement in depth and accuracy.');
    } else {
      analysis.feedback.push('Answer needs major improvement. Consider reviewing the topic more thoroughly.');
    }

    // Add specific improvement suggestions
    if (analysis.keywordMatches.length < 2) {
      analysis.improvements.push('Include more relevant technical terms');
    }
    
    if (analysis.clarity < 6) {
      analysis.improvements.push('Focus on clearer explanations and better structure');
    }
    
    if (analysis.completeness < 6) {
      analysis.improvements.push('Provide more comprehensive coverage of the topic');
    }
  }

  // Quick scoring for simple answers
  quickScore(userAnswer, expectedKeywords = []) {
    const cleanAnswer = this.cleanText(userAnswer);
    let score = 5; // Base score
    
    expectedKeywords.forEach(keyword => {
      if (cleanAnswer.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    
    return Math.min(10, score);
  }
}

export const answerAnalysis = new AnswerAnalysisService();
