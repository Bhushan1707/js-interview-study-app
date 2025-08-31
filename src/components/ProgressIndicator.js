import React from 'react';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';
import './ProgressIndicator.css';

export const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = '#3b82f6' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring">
        <circle
          className="progress-ring-background"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-progress"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      <div className="progress-text">
        {/* <span className="progress-percentage">{Math.round(percentage)}%</span> */}
      </div>
    </div>
  );
};

export const LinearProgress = ({ percentage, height = 8, color = '#3b82f6', showLabel = true }) => {
  return (
    <div className="linear-progress-container">
      {showLabel && (
        <div className="progress-labels">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="linear-progress" style={{ height }}>
        <div 
          className="linear-progress-fill"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`
          }}
        />
      </div>
    </div>
  );
};

export const AchievementBadge = ({ type, title, description, unlocked = false, progress = 0 }) => {
  const getIcon = () => {
    switch (type) {
      case 'trophy': return <Trophy size={24} />;
      case 'star': return <Star size={24} />;
      case 'target': return <Target size={24} />;
      case 'zap': return <Zap size={24} />;
      case 'first-steps': return <Award size={24} />;
      default: return <Award size={24} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'trophy': return '#f59e0b';
      case 'star': return '#8b5cf6';
      case 'target': return '#ef4444';
      case 'zap': return '#06d6a0';
      case 'first-steps': return '#3b82f6';
      default: return '#3b82f6';
    }
  };

  return (
    <div className={`achievement-badge ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="badge-icon" style={{ '--color': getColor() }}>
        {getIcon()}
        {!unlocked && progress > 0 && (
          <div className="badge-progress">
            <CircularProgress 
              percentage={progress} 
              size={60} 
              strokeWidth={4} 
              color={getColor()} 
            />
          </div>
        )}
      </div>
      <div className="badge-content">
        <h4 className="badge-title">{title}</h4>
        <p className="badge-description">{description}</p>
        {!unlocked && progress > 0 && (
          <div className="badge-progress-text">
            {Math.round(progress)}% complete
          </div>
        )}
      </div>
      {unlocked && <div className="badge-glow"></div>}
    </div>
  );
};

export const SkillMeter = ({ skill, level, maxLevel = 5, color = '#3b82f6' }) => {
  return (
    <div className="skill-meter">
      <div className="skill-header">
        <span className="skill-name">{skill}</span>
        <span className="skill-level">{level}/{maxLevel}</span>
      </div>
      <div className="skill-bars">
        {Array.from({ length: maxLevel }, (_, index) => (
          <div
            key={index}
            className={`skill-bar ${index < level ? 'filled' : ''}`}
            style={{
              '--color': color,
              '--delay': `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const StudyStreak = ({ days, maxStreak = 30 }) => {
  const percentage = (days / maxStreak) * 100;
  
  return (
    <div className="study-streak">
      <div className="streak-header">
        <div className="streak-icon">
          <Zap size={20} />
        </div>
        <div className="streak-info">
          <h3>{days} Day Streak</h3>
          <p>Keep it up!</p>
        </div>
      </div>
      <div className="streak-progress">
        <LinearProgress 
          percentage={percentage} 
          height={6} 
          color="#f59e0b" 
          showLabel={false} 
        />
        <div className="streak-milestones">
          {[7, 14, 21, 30].map(milestone => (
            <div
              key={milestone}
              className={`milestone ${days >= milestone ? 'reached' : ''}`}
              style={{ left: `${(milestone / maxStreak) * 100}%` }}
            >
              <div className="milestone-marker"></div>
              <span className="milestone-label">{milestone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgressIndicator = ({ children }) => {
  return <div className="progress-indicators">{children}</div>;
};

export default ProgressIndicator;
