import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, BookOpen, Code, Target, ChevronDown, ChevronUp } from 'lucide-react';
import dsaPatternsData from '../data/dsaPatternsData';
import './DSAPatterns.css';

const DSAPatterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [filteredPatterns, setFilteredPatterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedPattern, setExpandedPattern] = useState(null);

  useEffect(() => {
    setPatterns(dsaPatternsData.dsa_patterns);
    setFilteredPatterns(dsaPatternsData.dsa_patterns);
  }, []);

  useEffect(() => {
    let filtered = patterns;

    if (searchTerm) {
      filtered = filtered.filter(pattern =>
        pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPatterns(filtered);
  }, [searchTerm, selectedDifficulty, patterns]);

  const getDifficultyLevel = (id) => {
    if (id <= 5) return 'Beginner';
    if (id <= 10) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <div className="dsa-patterns-container">
      <div className="dsa-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        
        <div className="dsa-title-section">
          <h1>DSA Patterns Mastery</h1>
          <p>Master the 15 essential Data Structures & Algorithms patterns that appear in 90% of coding interviews</p>
        </div>

        <div className="dsa-stats">
          <div className="stat-card">
            <div className="stat-number">{patterns.length}</div>
            <div className="stat-label">Patterns</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {patterns.reduce((sum, p) => sum + (p.leetcode_problems?.length || 0), 0)}
            </div>
            <div className="stat-label">Problems</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Hours Content</div>
          </div>
        </div>
      </div>

      <div className="dsa-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button
              key={level}
              className={`filter-btn ${selectedDifficulty === level ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(level)}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>
      </div>

      <div className="patterns-list">
        {filteredPatterns.map((pattern) => (
          <div key={pattern.id} className="pattern-item">
            <div className="pattern-header" onClick={() => setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)}>
              <div className="pattern-title-section">
                <div className="pattern-number">{pattern.id}.</div>
                <div className="pattern-title-content">
                  <h3>{pattern.name}</h3>
                  <span className={`difficulty-badge ${getDifficultyLevel(pattern.id).toLowerCase()}`}>
                    {getDifficultyLevel(pattern.id)}
                  </span>
                </div>
              </div>
              <div className="pattern-meta">
                <p className="pattern-description">{pattern.description}</p>
                <div className="pattern-stats">
                  <span className="stat">
                    <BookOpen size={14} />
                    {pattern.leetcode_problems?.length || 0} problems
                  </span>
                  <span className="stat">
                    <Target size={14} />
                    Optimized
                  </span>
                </div>
              </div>
              <div className="expand-icon">
                {expandedPattern === pattern.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {expandedPattern === pattern.id && (
              <div className="pattern-expanded">
                <div className="simple-expanded-content">
                  <div className="pattern-visual">
                    <div className="visual-title">{pattern.name}</div>
                    <div className="visual-diagram">
                      {pattern.name === 'Two Pointers' && (
                        <div className="two-pointers-visual">
                          <div className="array-visual">
                            {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                              <div key={idx} className={`array-cell ${idx === 0 ? 'left-pointer' : idx === 5 ? 'right-pointer' : ''}`}>
                                {num}
                              </div>
                            ))}
                          </div>
                          <div className="pointer-labels">
                            <span className="left-label">left</span>
                            <span className="right-label">right</span>
                          </div>
                          <div className="source-credit">blog.algomaster.io</div>
                        </div>
                      )}
                      {pattern.name !== 'Two Pointers' && (
                        <div className="generic-visual">
                          <div className="pattern-description-simple">
                            {pattern.description}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pattern-explanation">
                    <p>{pattern.detailed_explanation || pattern.description}</p>
                    
                    <div className="when-to-use-simple">
                      <strong>Use this pattern when dealing with sorted arrays or lists where you need to find pairs that satisfy a specific condition.</strong>
                    </div>
                    
                    <div className="sample-problem">
                      <h4>Sample Problem:</h4>
                      <p>{pattern.sample_problem}</p>
                    </div>
                    
                    <div className="example-simple">
                      <h4>Example:</h4>
                      <ul>
                        <li><strong>Input:</strong> nums = [1, 2, 3, 4, 6], target = 6</li>
                        <li><strong>Output:</strong> [1, 3]</li>
                      </ul>
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
                    
                    <div className="leetcode-problems-simple">
                      <h4>LeetCode Problems:</h4>
                      <ol>
                        {pattern.leetcode_problems?.slice(0, 3).map((problem, idx) => (
                          <li key={idx}>
                            <a href={problem.url} target="_blank" rel="noopener noreferrer">
                              {problem.name} (LeetCode #{problem.number})
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pattern-actions">
              <Link to={`/dsa-pattern/${pattern.id}`} className="btn btn-outline">
                <BookOpen size={16} />
                Full Details
              </Link>
              <Link to={`/dsa-exam/${pattern.id}`} className="btn btn-primary">
                <Code size={16} />
                Practice Exam
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <div className="no-results">
          <h3>No patterns found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default DSAPatterns;
