import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';
import './InteractiveChart.css';

export const ProgressChart = ({ data, type = 'line' }) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="chart-container">
        <div className="chart-header">
          <BarChart3 size={20} />
          <h3>Weekly Progress</h3>
        </div>
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div 
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="bar-value">{item.value}</div>
              </div>
              <div className="bar-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="chart-container">
        <div className="chart-header">
          <PieChart size={20} />
          <h3>Category Distribution</h3>
        </div>
        <div className="pie-chart">
          <svg viewBox="0 0 200 200" className="pie-svg">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color || `hsl(${index * 60}, 70%, 60%)`}
                  className="pie-slice"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              );
            })}
          </svg>
          <div className="pie-legend">
            {data.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color"
                  style={{ background: item.color || `hsl(${index * 60}, 70%, 60%)` }}
                />
                <span>{item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <TrendingUp size={20} />
        <h3>Progress Trend</h3>
      </div>
      <div className="line-chart">
        <svg viewBox="0 0 400 200" className="line-svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((item, index) => 
              `${(index / (data.length - 1)) * 400},${200 - (item.value / maxValue) * 180}`
            ).join(' ')}
            className="line-path"
            style={{ 
              strokeDasharray: '1000',
              strokeDashoffset: `${1000 - (animationProgress / 100) * 1000}`
            }}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#lineGradient)"
            points={[
              ...data.map((item, index) => 
                `${(index / (data.length - 1)) * 400},${200 - (item.value / maxValue) * 180}`
              ),
              '400,200',
              '0,200'
            ].join(' ')}
            className="area-fill"
            style={{ 
              clipPath: `inset(0 ${100 - animationProgress}% 0 0)`
            }}
          />
          
          {/* Data points */}
          {data.map((item, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 400}
              cy={200 - (item.value / maxValue) * 180}
              r="4"
              fill="#3b82f6"
              className="data-point"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </svg>
        <div className="chart-labels">
          {data.map((item, index) => (
            <span key={index} className="chart-label">{item.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StudyHeatmap = ({ data }) => {
  const weeks = 12;
  const daysPerWeek = 7;
  
  const getIntensity = (day) => {
    const activity = data.find(d => d.date === day);
    if (!activity) return 0;
    return Math.min(activity.count / 5, 1); // Normalize to 0-1
  };

  const getDateString = (weekIndex, dayIndex) => {
    const date = new Date();
    date.setDate(date.getDate() - (weeks - weekIndex - 1) * 7 - (6 - dayIndex));
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <Calendar size={20} />
        <h3>Study Activity</h3>
      </div>
      <div className="heatmap">
        <div className="heatmap-grid">
          {Array.from({ length: weeks }, (_, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {Array.from({ length: daysPerWeek }, (_, dayIndex) => {
                const dateString = getDateString(weekIndex, dayIndex);
                const intensity = getIntensity(dateString);
                return (
                  <div
                    key={dayIndex}
                    className="heatmap-day"
                    style={{
                      backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                      animationDelay: `${(weekIndex * 7 + dayIndex) * 0.02}s`
                    }}
                    title={`${dateString}: ${data.find(d => d.date === dateString)?.count || 0} questions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 0.25, 0.5, 0.75, 1].map(intensity => (
            <div
              key={intensity}
              className="legend-square"
              style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const InteractiveChart = ({ children }) => {
  return <div className="interactive-charts">{children}</div>;
};

export default InteractiveChart;
