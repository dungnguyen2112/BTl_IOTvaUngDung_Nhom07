import React from 'react';
import { Recycle, Trash2, TrendingUp, Target } from 'lucide-react';
import './StatisticsCards.css';

const StatisticsCards = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card animate-slide-up">
        <div className="stat-icon recyclable">
          <Recycle size={30} />
        </div>
        <div className="stat-info">
          <h3>Rác tái chế</h3>
          <p className="stat-number">{stats.recyclableCount}</p>
          <span className="stat-label">items hôm nay</span>
        </div>
      </div>

      <div className="stat-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="stat-icon non-recyclable">
          <Trash2 size={30} />
        </div>
        <div className="stat-info">
          <h3>Rác không tái chế</h3>
          <p className="stat-number">{stats.nonRecyclableCount}</p>
          <span className="stat-label">items hôm nay</span>
        </div>
      </div>

      <div className="stat-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="stat-icon total">
          <TrendingUp size={30} />
        </div>
        <div className="stat-info">
          <h3>Tổng số</h3>
          <p className="stat-number">{stats.totalCount}</p>
          <span className="stat-label">items hôm nay</span>
        </div>
      </div>

      <div className="stat-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="stat-icon accuracy">
          <Target size={30} />
        </div>
        <div className="stat-info">
          <h3>Độ chính xác AI</h3>
          <p className="stat-number">{stats.avgAccuracy}%</p>
          <span className="stat-label">trung bình</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
