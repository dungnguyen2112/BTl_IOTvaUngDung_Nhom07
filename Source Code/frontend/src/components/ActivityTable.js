import React from 'react';
import { History } from 'lucide-react';
import './ActivityTable.css';

const ActivityTable = ({ activities }) => {
  const getConfidenceClass = (confidence) => {
    if (confidence >= 90) return 'confidence-high';
    if (confidence >= 75) return 'confidence-medium';
    return 'confidence-low';
  };

  return (
    <div className="section">
      <h2>
        <History size={24} /> Hoạt động gần đây
      </h2>
      <div className="activity-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Loại rác</th>
              <th>Vật phẩm</th>
              <th>Độ tin cậy</th>
              <th>Thùng rác</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.timestamp}</td>
                <td>
                  <span className={`badge ${activity.type}`}>
                    {activity.type === 'recyclable' ? 'Tái chế' : 'Không tái chế'}
                  </span>
                </td>
                <td>{activity.item}</td>
                <td>
                  <span className={getConfidenceClass(activity.confidence)}>
                    {activity.confidence}%
                  </span>
                </td>
                <td>{activity.binName}</td>
                <td>
                  <span className={`badge ${activity.status}`}>
                    {activity.status === 'success' ? 'Thành công' : 'Thất bại'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
