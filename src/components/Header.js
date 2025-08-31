import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, BookOpen, Target, BarChart3 } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Link to="/" className="logo">
            <BookOpen size={28} />
            <span>JS Interview Study</span>
          </Link>
        </div>
        
        <div className="header-right">
          <nav className="header-nav">
            <Link to="/" className="nav-link">
              <Target size={18} />
              Dashboard
            </Link>
            <Link to="/study-plan" className="nav-link">
              <BookOpen size={18} />
              Study Plan
            </Link>
            <Link to="/progress" className="nav-link">
              <BarChart3 size={18} />
              Progress
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
