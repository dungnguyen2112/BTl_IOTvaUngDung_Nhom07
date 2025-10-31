import React, { useState, useEffect } from 'react';
import Header from './Header';
import StatisticsCards from './StatisticsCards';
import BinsGrid from './BinsGrid';
import ActivityTable from './ActivityTable';
import Charts from './Charts';
import { initialTrashBins, generateInitialActivities, generateRandomActivity } from '../data/mockData';
import './Dashboard.css';

const Dashboard = ({ currentUser, onLogout }) => {
  const [bins, setBins] = useState(initialTrashBins);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Initialize activities
    setActivities(generateInitialActivities(30));

    // Simulate real-time updates every 10 seconds
    const interval = setInterval(() => {
      addNewActivity();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addNewActivity = () => {
    const newActivity = generateRandomActivity(bins);
    
    if (newActivity) {
      // Add new activity
      setActivities(prev => {
        const updated = [newActivity, ...prev];
        return updated.slice(0, 100); // Keep only last 100
      });

      // Update bin level
      setBins(prev => {
        return prev.map(bin => {
          if (bin.id === newActivity.binId) {
            const newLevel = Math.min(100, bin.level + Math.floor(Math.random() * 3) + 1);
            let newStatus = 'active';
            
            if (newLevel >= 90) {
              newStatus = 'full';
            } else if (newLevel >= 70) {
              newStatus = 'warning';
            }

            return {
              ...bin,
              level: newLevel,
              status: newStatus,
              itemsToday: bin.itemsToday + 1
            };
          }
          return bin;
        });
      });
    }
  };

  const calculateStats = () => {
    const recyclableCount = activities.filter(a => a.type === 'recyclable').length;
    const nonRecyclableCount = activities.filter(a => a.type === 'non-recyclable').length;
    const totalCount = recyclableCount + nonRecyclableCount;
    const avgAccuracy = totalCount > 0 
      ? (activities.reduce((sum, a) => sum + a.confidence, 0) / totalCount).toFixed(1)
      : 0;

    return {
      recyclableCount,
      nonRecyclableCount,
      totalCount,
      avgAccuracy
    };
  };

  const stats = calculateStats();

  return (
    <div className="dashboard animate-fade-in">
      <Header currentUser={currentUser} onLogout={onLogout} />
      
      <div className="dashboard-container">
        <StatisticsCards stats={stats} />
        <BinsGrid bins={bins} />
        <ActivityTable activities={activities.slice(0, 15)} />
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
