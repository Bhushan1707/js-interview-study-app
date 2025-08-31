import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ onSearch, placeholder = "Search questions..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sample suggestions - in real app, this would come from your data
  const sampleSuggestions = [
    'JavaScript closures',
    'React hooks',
    'Async await',
    'Array methods',
    'Event loop',
    'Promises',
    'Arrow functions',
    'Destructuring',
    'Spread operator',
    'Template literals',
    'ES6 features',
    'DOM manipulation',
    'Event handling',
    'AJAX requests',
    'JSON parsing'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = sampleSuggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions(recentSearches.slice(0, 5));
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [query, recentSearches]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (query.length === 0 && recentSearches.length > 0) {
      setSuggestions(recentSearches.slice(0, 5));
      setShowSuggestions(true);
    } else if (query.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleSearch = (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    // Add to recent searches
    const updatedRecent = [
      trimmedQuery,
      ...recentSearches.filter(item => item !== trimmedQuery)
    ].slice(0, 10);
    
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    // Call parent search handler
    onSearch(trimmedQuery);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-suggestions">
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input-enhanced"
        />
        {query && (
          <button
            className="clear-search"
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="suggestions-header">
              <div className="suggestions-title">
                <Clock size={16} />
                Recent Searches
              </div>
              <button 
                className="clear-recent"
                onClick={clearRecentSearches}
              >
                Clear
              </button>
            </div>
          )}
          
          {query.length > 0 && (
            <div className="suggestions-header">
              <div className="suggestions-title">
                <TrendingUp size={16} />
                Suggestions
              </div>
            </div>
          )}

          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion-item ${
                  index === selectedIndex ? 'selected' : ''
                }`}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="suggestion-icon">
                  {query.length === 0 ? (
                    <Clock size={16} />
                  ) : (
                    <Search size={16} />
                  )}
                </div>
                <span className="suggestion-text">
                  {query.length > 0 ? (
                    <HighlightMatch text={suggestion} query={query} />
                  ) : (
                    suggestion
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HighlightMatch = ({ text, query }) => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="highlight">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default SearchSuggestions;
