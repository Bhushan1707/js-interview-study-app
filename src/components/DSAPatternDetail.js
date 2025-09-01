import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code, Copy, CheckCircle, Clock, Target, Lightbulb, ChevronRight, Play, ExternalLink } from 'lucide-react';
import dsaPatternsData from '../data/dsaPatternsData';
import './DSAPatternDetail.css';

const DSAPatternDetail = () => {
  const { patternId } = useParams();
  const [pattern, setPattern] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const foundPattern = dsaPatternsData.dsa_patterns.find(p => p.id === parseInt(patternId));
    setPattern(foundPattern);
  }, [patternId]);

  const getDifficultyLevel = (id) => {
    if (id <= 5) return 'Beginner';
    if (id <= 10) return 'Intermediate';
    return 'Advanced';
  };


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateSampleCode = (pattern) => {
    const codeExamples = {
      1: `// Prefix Sum Pattern
function prefixSum(nums) {
    const prefix = [0];
    for (let i = 0; i < nums.length; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}

function rangeSum(prefix, left, right) {
    return prefix[right + 1] - prefix[left];
}

// Example usage
const nums = [1, 2, 3, 4, 5, 6];
const prefix = prefixSum(nums);
console.log(rangeSum(prefix, 1, 3)); // Output: 9`,

      2: `// Two Pointers Pattern
function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1];
}

// Example usage
const nums = [1, 2, 3, 4, 6];
console.log(twoSum(nums, 6)); // Output: [1, 3]`,

      3: `// Sliding Window Pattern
function maxSumSubarray(nums, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Example usage
const nums = [2, 1, 5, 1, 3, 2];
console.log(maxSumSubarray(nums, 3)); // Output: 9`
    };

    return codeExamples[pattern.id] || `// ${pattern.name} Pattern Implementation
// TODO: Implement the ${pattern.name} pattern
function ${pattern.name.toLowerCase().replace(/\s+/g, '')}Pattern() {
    // Your implementation here
    return "Pattern implementation";
}`;
  };

  if (!pattern) {
    return (
      <div className="pattern-detail-container">
        <div className="pattern-not-found">
          <h2>Pattern not found</h2>
          <Link to="/dsa-patterns" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to Patterns
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="pattern-detail-container">
      <div className="pattern-detail-header">
        <Link to="/dsa-patterns" className="back-link">
          <ArrowLeft size={16} />
          Back to Patterns
        </Link>

        <div className="pattern-title-section">
          <div className="pattern-number">{pattern.id}.</div>
          <div className="pattern-title-content">
            <h1>{pattern.name}</h1>
            <span className={`difficulty-badge ${getDifficultyLevel(pattern.id).toLowerCase()}`}>
              {getDifficultyLevel(pattern.id)}
            </span>
          </div>
        </div>

        <p className="pattern-description">{pattern.description}</p>

        <div className="pattern-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span><strong>Time:</strong> {pattern.timeComplexity}</span>
          </div>
          <div className="meta-item">
            <Target size={16} />
            <span><strong>Space:</strong> {pattern.spaceComplexity}</span>
          </div>
          <div className="meta-item">
            <BookOpen size={16} />
            <span><strong>Problems:</strong> {pattern.leetcode_problems?.length || 0}</span>
          </div>
        </div>

        <div className="pattern-actions">
          <Link 
            to={`/dsa-exam/${pattern.id}`}
            className="btn btn-primary"
          >
            <Play size={16} />
            Take Exam
          </Link>
          <button 
            className="btn btn-outline"
            onClick={() => copyToClipboard(generateSampleCode(pattern))}
          >
            {copiedCode ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copiedCode ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      <div className="pattern-detail-content">
        <div className="pattern-tabs">
          {['overview', 'example', 'problems', 'code'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="concept-explanation">
                <h3><Lightbulb size={20} /> Pattern Explanation</h3>
                <div className="explanation-text">
                  <p>{pattern.detailed_explanation || pattern.explanation || `The ${pattern.name} pattern involves using ${pattern.name.toLowerCase()} to iterate through an array or list, often used to find pairs or elements that meet specific pair criteria.`}</p>
                  <p>{pattern.when_to_use || pattern.whenToUse}</p>
                </div>
              </div>
              
              {pattern.youtube_video && (
                <div className="youtube-section">
                  <h3><Play size={20} /> Video Tutorial</h3>
                  <div className="youtube-container">
                    <iframe
                      width="100%"
                      height="315"
                      src={pattern.youtube_video.replace('watch?v=', 'embed/')}
                      title={`${pattern.name} Tutorial`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="visual-example">
                <h3><Target size={20} /> Visual Example</h3>
                <div className="example-diagram">
                  <div className="array-visualization">
                    <div className="array-title">{pattern.name}</div>
                    <div className="array-elements">
                      {[1, 2, 3, 4, 5, 6].map((num, index) => (
                        <div key={index} className={`array-element ${index === 0 ? 'pointer-left' : index === 5 ? 'pointer-right' : ''}`}>
                          {num}
                        </div>
                      ))}
                    </div>
                    <div className="pointer-labels">
                      <span className="left-pointer">left</span>
                      <span className="right-pointer">right</span>
                    </div>
                    <div className="pattern-source">blog.algomaster.io</div>
                  </div>
                </div>
              </div>
              
              <div className="when-to-use">
                <h3><CheckCircle size={20} /> When to Use</h3>
                <p>Use this pattern when dealing with sorted arrays or lists where you need to find pairs that satisfy a specific condition.</p>
              </div>
              
              <div className="sample-problem">
                <h3><Code size={20} /> Sample Problem</h3>
                <p><strong>Find two numbers in a sorted array that add up to a target value.</strong></p>
                
                <div className="problem-example">
                  <p><strong>Example:</strong></p>
                  <div className="code-example">
                    <div>• Input: nums = [1, 2, 3, 4, 6], target = 6</div>
                    <div>• Output: [1, 3]</div>
                  </div>
                </div>
                
                <div className="explanation-steps">
                  <h4>Explanation:</h4>
                  <ol>
                    <li>Initialize two pointers, one at the start (left) and one at the end (right) of the array.</li>
                    <li>Check the sum of the elements at the two pointers.</li>
                    <li>If the sum equals the target, return the indices.</li>
                    <li>If the sum is less than the target, move the left pointer to the right.</li>
                    <li>If the sum is greater than the target, move the right pointer to the left.</li>
                  </ol>
                </div>
              </div>
              
              <div className="leetcode-problems">
                <h3><ExternalLink size={20} /> LeetCode Problems</h3>
                <div className="problems-list">
                  {(pattern.leetcode_problems || []).slice(0, 3).map((problem, index) => (
                    <div key={index} className="problem-item">
                      <span className="problem-number">{index + 1}.</span>
                      <a href={problem.url} target="_blank" rel="noopener noreferrer" className="problem-link">
                        {problem.name}
                      </a>
                      <span className={`problem-difficulty ${(problem.difficulty || 'Medium').toLowerCase()}`}>
                        {problem.difficulty || 'Medium'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'example' && (
            <div className="example-section">
              <h3>Step-by-step Example</h3>
              <div className="example-walkthrough">
                <p>Let's walk through how the {pattern.name} pattern works:</p>
                <div className="example-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Initialize</h4>
                      <p>Set up the initial state of the algorithm</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Process</h4>
                      <p>Apply the pattern logic to solve the problem</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Result</h4>
                      <p>Return the final result</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="problems-section">
              <h3>Practice Problems</h3>
              <div className="problems-list">
                {(pattern.leetcode_problems || []).map((problem, index) => (
                  <div key={index} className="problem-card">
                    <div className="problem-header">
                      <h4>{problem.name}</h4>
                      <span className={`difficulty-badge ${(problem.difficulty || 'Medium').toLowerCase()}`}>
                        {problem.difficulty || 'Medium'}
                      </span>
                    </div>
                    <p className="problem-description">{problem.description || 'Practice this problem to master the pattern.'}</p>
                    <div className="problem-actions">
                      <a 
                        href={problem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        <ExternalLink size={16} />
                        Solve on LeetCode
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="code-section">
              <h3>Implementation</h3>
              <div className="code-container">
                <div className="code-header">
                  <span className="code-language">JavaScript</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(generateSampleCode(pattern))}
                  >
                    {copiedCode ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{generateSampleCode(pattern)}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DSAPatternDetail;
