import React, { useState, useEffect } from 'react';
import { User, Settings, Download, Upload, Trash2, Plus, LogOut } from 'lucide-react';
import { 
  getAllUsers, 
  getCurrentUser, 
  setCurrentUser, 
  createUser, 
  deleteUser, 
  exportUserData, 
  importUserData,
  getUserStats 
} from '../utils/userManager';
import './UserProfile.css';

const UserProfile = ({ onUserChange }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUserState] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [userStats, setUserStats] = useState(null);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    const current = getCurrentUser();
    setUsers(allUsers);
    setCurrentUserState(current);
    
    if (current) {
      const stats = getUserStats();
      setUserStats(stats);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    try {
      const user = createUser(newUsername.trim(), newEmail.trim());
      setNewUsername('');
      setNewEmail('');
      setShowCreateForm(false);
      loadUsers();
      onUserChange && onUserChange(user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSwitchUser = (userId) => {
    try {
      const user = setCurrentUser(userId);
      loadUsers();
      setShowUserList(false);
      onUserChange && onUserChange(user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUser = (userId) => {
    if (users.length <= 1) {
      alert('Cannot delete the last user');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user? All progress will be lost.')) {
      deleteUser(userId);
      loadUsers();
      
      // If deleted user was current user, switch to first available user
      if (currentUser && currentUser.id === userId) {
        const remainingUsers = getAllUsers();
        if (remainingUsers.length > 0) {
          handleSwitchUser(remainingUsers[0].id);
        }
      }
    }
  };

  const handleExportData = () => {
    const data = exportUserData();
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentUser.username}_progress_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        importUserData(data);
        loadUsers();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (!currentUser) {
    return (
      <div className="user-profile no-user">
        <div className="create-user-prompt">
          <User size={48} />
          <h2>Welcome to JS Interview Study</h2>
          <p>Create your profile to start tracking your progress</p>
          <form onSubmit={handleCreateUser} className="create-user-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Create Profile
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="user-avatar" style={{ backgroundColor: currentUser.avatar.backgroundColor }}>
          {currentUser.avatar.initials}
        </div>
        <div className="user-info">
          <h2>{currentUser.username}</h2>
          {currentUser.email && <p className="user-email">{currentUser.email}</p>}
          <p className="user-since">
            Member since {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="profile-actions">
          <button 
            className="btn btn-outline"
            onClick={() => setShowUserList(!showUserList)}
          >
            <LogOut size={16} />
            Switch User
          </button>
        </div>
      </div>

      {userStats && (
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-label">Questions Completed</span>
            <span className="stat-value">{userStats.completedQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Study Streak</span>
            <span className="stat-value">{userStats.studyStreak} days</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{Math.round(userStats.averageScore)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Study Days</span>
            <span className="stat-value">{userStats.totalStudyDays}</span>
          </div>
        </div>
      )}

      <div className="profile-actions-grid">
        <button className="action-btn" onClick={handleExportData}>
          <Download size={20} />
          <span>Export Progress</span>
        </button>
        <label className="action-btn">
          <Upload size={20} />
          <span>Import Progress</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImportData}
            style={{ display: 'none' }}
          />
        </label>
        <button 
          className="action-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {showUserList && (
        <div className="user-list-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Switch User</h3>
              <button 
                className="close-btn"
                onClick={() => setShowUserList(false)}
              >
                ×
              </button>
            </div>
            <div className="user-list">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className={`user-item ${user.id === currentUser.id ? 'active' : ''}`}
                >
                  <div className="user-avatar small" style={{ backgroundColor: user.avatar.backgroundColor }}>
                    {user.avatar.initials}
                  </div>
                  <div className="user-details">
                    <span className="username">{user.username}</span>
                    <span className="last-active">
                      Last active: {new Date(user.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="user-actions">
                    {user.id !== currentUser.id && (
                      <button 
                        className="btn btn-sm"
                        onClick={() => handleSwitchUser(user.id)}
                      >
                        Switch
                      </button>
                    )}
                    {users.length > 1 && (
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCreateForm && (
        <div className="user-list-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New User</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <input
                type="text"
                placeholder="Enter name"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
