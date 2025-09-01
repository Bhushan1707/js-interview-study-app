import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Target, TrendingUp, Book, Code, Brain, Award, ArrowRight, Star, BookOpen } from 'lucide-react';
import questionsData, { studyCategories } from '../data/questionsData';
import dsaPatternsData from '../data/dsaPatternsData';
import { loadCompletedQuestions, loadUserProgress, saveUserProgress, updateStudyStreak } from '../utils/localStorage';
import { CircularProgress, AchievementBadge, StudyStreak } from './ProgressIndicator';
import { ProgressChart, StudyHeatmap } from './InteractiveChart';
import { useNotification } from './NotificationSystem';
import LoadingSpinner, { SkeletonList } from './LoadingSpinner';
import './Dashboard.css';

const Dashboard = ({ completedQuestions, bookmarkedQuestions, setCompletedQuestions }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [studyStreak, setStudyStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotification();

  const totalQuestions = studyCategories.reduce((total, category) => total + category.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  useEffect(() => {
    // Simulate loading time for better UX
    const loadData = async () => {
      setIsLoading(true);

      // Load progress from localStorage on component mount
      const savedProgress = loadUserProgress();
      const savedCompleted = loadCompletedQuestions();

      // Update completed questions if there are saved ones
      if (savedCompleted.length > 0) {
        setCompletedQuestions(new Set(savedCompleted));
      }

      // Update study streak
      const newStreak = updateStudyStreak();
      setStudyStreak(newStreak);

      // Calculate and save current progress
      const currentProgress = {
        totalQuestions,
        completedQuestions: savedCompleted.length,
        progressPercentage: totalQuestions > 0 ? (savedCompleted.length / totalQuestions) * 100 : 0,
        studyStreak: newStreak
      };

      saveUserProgress(currentProgress);
      setUserProgress(currentProgress);


      // Set loading to false immediately
      setIsLoading(false);
    };

    loadData();
  }, [totalQuestions, setCompletedQuestions, addNotification]);

  useEffect(() => {
    // Update progress whenever completed questions change
    if (userProgress && (userProgress.completedQuestions !== completedCount || userProgress.progressPercentage !== progressPercentage)) {
      const updatedProgress = {
        ...userProgress,
        completedQuestions: completedCount,
        progressPercentage
      };
      saveUserProgress(updatedProgress);
      setUserProgress(updatedProgress);
    }
  }, [completedCount, progressPercentage]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-beginner';
      case 'Intermediate': return 'badge-intermediate';
      case 'Advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  // Sample data for charts
  const weeklyProgressData = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 12 },
    { label: 'Thu', value: 7 },
    { label: 'Fri', value: 15 },
    { label: 'Sat', value: 10 },
    { label: 'Sun', value: 6 }
  ];

  const categoryDistribution = studyCategories.map((category, index) => ({
    label: category.title,
    value: category.questions.filter(q => completedQuestions.has(q.id)).length,
    color: `hsl(${index * 60}, 70%, 60%)`
  })).filter(item => item.value > 0);

  const studyActivityData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 8)
    };
  });

  const achievements = [
    {
      type: 'trophy',
      title: 'First Steps',
      description: 'Complete your first question',
      unlocked: completedCount > 0,
      progress: completedCount > 0 ? 100 : 0
    },
    {
      type: 'star',
      title: 'Getting Started',
      description: 'Complete 10 questions',
      unlocked: completedCount >= 10,
      progress: Math.min((completedCount / 10) * 100, 100)
    },
    {
      type: 'target',
      title: 'Dedicated Learner',
      description: 'Complete 50 questions',
      unlocked: completedCount >= 50,
      progress: Math.min((completedCount / 50) * 100, 100)
    },
    {
      type: 'zap',
      title: 'Speed Demon',
      description: 'Maintain a 7-day streak',
      unlocked: studyStreak >= 7,
      progress: Math.min((studyStreak / 7) * 100, 100)
    }
  ];

  if (isLoading) {
    return (
      <div className="dashboard">
        <LoadingSpinner size="large" text="Loading your progress..." />
        <SkeletonList count={3} />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>JavaScript Interview Study Dashboard</h1>
        <p>Master JavaScript concepts with structured learning and practice</p>
      </div>

      {/* Progress Overview */}
      <div className="stats-grid">
        <Link to="/all-questions" className="stat-card clickable">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalQuestions}</h3>
            <p>Total Questions</p>
          </div>
        </Link>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bookmarked">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>{bookmarkedQuestions.size}</h3>
            <p>Bookmarked</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{Math.round(progressPercentage)}%</h3>
            <p>Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon streak">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{studyStreak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      {/* Overall Progress with Circular Progress */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Overall Progress</h2>
        </div>
        <div className="progress-section">
          <div className="circular-progress-container">
            <CircularProgress
              percentage={progressPercentage}
              size={150}
              strokeWidth={10}
              color="#3b82f6"
            />
            <div className="progress-details">
              <h3>{completedCount} / {totalQuestions}</h3>
              <p>Questions Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Streak */}
      <div className="card">
        <StudyStreak days={studyStreak} maxStreak={30} />
      </div>

      {/* Interactive Charts */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Progress Analytics</h2>
        </div>
        <div className="charts-container">
          <ProgressChart data={weeklyProgressData} type="bar" />
          {categoryDistribution.length > 0 && (
            <ProgressChart data={categoryDistribution} type="pie" />
          )}
        </div>
      </div>

      {/* Study Activity Heatmap */}
      <div className="card">
        <StudyHeatmap data={studyActivityData} />
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Achievements</h2>
        </div>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <AchievementBadge
              key={index}
              type={achievement.type}
              title={achievement.title}
              description={achievement.description}
              unlocked={achievement.unlocked}
              progress={achievement.progress}
            />
          ))}
        </div>
      </div>

      {/* DSA Patterns */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">DSA Patterns Mastery</h2>
          <br />
          <Link to="/dsa-patterns" className="btn btn-primary">
            Explore Patterns
          </Link>
        </div>
        <div className="dsa-patterns-preview">
          <div className="dsa-stats">
            <div className="dsa-stat">
              <div className="stat-number">{dsaPatternsData.dsa_patterns.length}</div>
              <div className="stat-label">Essential Patterns</div>
            </div>
            <div className="dsa-stat">
              <div className="stat-number">90%</div>
              <div className="stat-label">Interview Coverage</div>
            </div>
            <div className="dsa-stat">
              <div className="stat-number">100+</div>
              <div className="stat-label">Practice Problems</div>
            </div>
          </div>
          
          <div className="patterns-grid">
            {dsaPatternsData.dsa_patterns.map((pattern, index) => (
              <Link 
                key={pattern.id} 
                to={`/dsa-pattern/${pattern.id}`} 
                className="pattern-item"
              >
                <div className="pattern-number">{index + 1}</div>
                <div className="pattern-content">
                  <h4 className="pattern-title">{pattern.name}</h4>
                  <p className="pattern-description">{pattern.description}</p>
                </div>
                <ArrowRight size={16} className="pattern-arrow" />
              </Link>
            ))}
          </div>
          
          <div className="dsa-features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Pattern Recognition</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💻</span>
              <span>Live Code Editor</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Visual Examples</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span>Pattern Exams</span>
            </div>
          </div>
        </div>
      </div>

      {/* Study Categories */}
      <div className="card">
        <div className="card-header row">
          <h2 className="card-title col-8">Study Categories</h2>
          <br />
          <Link to="/study-plan" className="btn btn-outline col-4">View Study Plan</Link>
        </div>
        {/* <div className="card-header">
          <h2 className="card-title">Study Categories</h2>
          <Link to="/study-plan" className="btn btn-outline">
            View Study Plan
          </Link>
        </div> */}
        <div className="categories-grid">
          {studyCategories.map((category, index) => {
            const categoryCompleted = category.questions.filter(q =>
              completedQuestions.has(q.id)
            ).length;
            const categoryProgress = (categoryCompleted / category.questions.length) * 100;

            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="category-card"
                style={{ '--index': index }}
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <span className={`badge ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-meta">
                  <div className="meta-item">
                    <BookOpen size={16} />
                    {category.questions.length} questions
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    {category.estimatedTime}
                  </div>
                </div>
                <div className="category-progress">
                  <div className="progress-bar small">
                    <div
                      className="progress-fill"
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                  <span className="progress-label">
                    {categoryCompleted}/{category.questions.length}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="actions-grid">
          <Link to="/study-plan" className="action-card">
            <BookOpen size={32} />
            <h3>Study Plan</h3>
            <p>Follow a structured learning path</p>
          </Link>
          <Link to="/progress" className="action-card">
            <TrendingUp size={32} />
            <h3>View Progress</h3>
            <p>Track your learning journey</p>
          </Link>
          <Link to="/all-questions" className="action-card">
            <BookOpen size={32} />
            <h3>All Questions</h3>
            <p>View all questions in one place</p>
          </Link>
          <Link to="/compiler" className="action-card">
            <Target size={32} />
            <h3>JS Compiler</h3>
            <p>Test and run JavaScript code</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
