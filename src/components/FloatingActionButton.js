import React, { useState } from 'react';
import { Plus, BookOpen, Target, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <BookOpen size={20} />,
      label: 'All Questions',
      path: '/all-questions',
      color: '#3b82f6'
    },
    {
      icon: <Target size={20} />,
      label: 'JS Compiler',
      path: '/compiler',
      color: '#8b5cf6'
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Progress',
      path: '/progress',
      color: '#06d6a0'
    }
  ];

  return (
    <div className="fab-container">
      {/* Action Buttons */}
      {isOpen && (
        <div className="fab-actions">
          {actions.map((action, index) => (
            <Link
              key={action.path}
              to={action.path}
              className="fab-action"
              style={{ 
                '--delay': `${index * 0.1}s`,
                '--color': action.color
              }}
              onClick={() => setIsOpen(false)}
            >
              <div className="fab-action-icon">
                {action.icon}
              </div>
              <span className="fab-tooltip">{action.label}</span>
            </Link>
          ))}
        </div>
      )}
      
      {/* Main FAB Button */}
      <button
        className={`fab-main ${isOpen ? 'fab-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Actions"
      >
        <div className="fab-icon">
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
