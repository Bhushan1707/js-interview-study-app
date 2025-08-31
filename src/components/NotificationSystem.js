import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import './NotificationSystem.css';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} onRemove={onRemove} />
      ))}
    </div>
  );
};

const Toast = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(notification.id), 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div
      className={`toast toast-${notification.type} ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''}`}
    >
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-content">
        {notification.title && (
          <div className="toast-title">{notification.title}</div>
        )}
        <div className="toast-message">{notification.message}</div>
      </div>
      <button className="toast-close" onClick={handleRemove}>
        <X size={16} />
      </button>
      {notification.duration > 0 && (
        <div 
          className="toast-progress" 
          style={{ animationDuration: `${notification.duration}ms` }}
        />
      )}
    </div>
  );
};

// Custom hooks for easy use
export const useNotificationActions = () => {
  const { addNotification } = useNotification();
  
  const showSuccess = (message, title) => {
    return addNotification({
      type: 'success',
      title,
      message,
    });
  };

  const showError = (message, title) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 7000,
    });
  };

  const showWarning = (message, title) => {
    return addNotification({
      type: 'warning',
      title,
      message,
    });
  };

  const showInfo = (message, title) => {
    return addNotification({
      type: 'info',
      title,
      message,
    });
  };

  return { showSuccess, showError, showWarning, showInfo };
};

export default NotificationProvider;
