import React from 'react';
import { Trash2, MapPin, Clock, Package } from 'lucide-react';
import './BinsGrid.css';

const BinsGrid = ({ bins }) => {
  const getStatusText = (status) => {
    const statusMap = {
      'active': 'Hoạt động',
      'warning': 'Cảnh báo',
      'full': 'Đầy'
    };
    return statusMap[status] || status;
  };

  const getLevelClass = (level) => {
    if (level < 50) return 'low';
    if (level < 80) return 'medium';
    return 'high';
  };

  return (
    <div className="section">
      <h2>
        <Trash2 size={24} /> Trạng thái thùng rác
      </h2>
      <div className="bins-grid">
        {bins.map((bin, index) => (
          <div 
            key={bin.id} 
            className="bin-card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="bin-header">
              <div className="bin-name">{bin.name}</div>
              <span className={`bin-status ${bin.status}`}>
                {getStatusText(bin.status)}
              </span>
            </div>

            <div className="bin-level">
              <div className="bin-level-label">
                <span>Mức đầy:</span>
                <strong>{bin.level}%</strong>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${getLevelClass(bin.level)}`}
                  style={{ width: `${bin.level}%` }}
                />
              </div>
            </div>

            <div className="bin-details">
              <div className="bin-detail-item">
                <MapPin size={16} />
                <span>{bin.location}</span>
              </div>
              <div className="bin-detail-item">
                <Package size={16} />
                <span>{bin.itemsToday} items hôm nay</span>
              </div>
              <div className="bin-detail-item">
                <Clock size={16} />
                <span>{bin.lastCleaned}</span>
              </div>
              <div className="bin-detail-item">
                <Trash2 size={16} />
                <span>{bin.type === 'recyclable' ? 'Tái chế' : 'Không tái chế'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinsGrid;
