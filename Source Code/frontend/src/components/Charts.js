import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { PieChart, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { weeklyStats, hourlyStats } from '../data/mockData';
import './Charts.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = () => {
  const weeklyChartData = {
    labels: weeklyStats.labels,
    datasets: [
      {
        label: 'Tái chế',
        data: weeklyStats.recyclable,
        backgroundColor: 'rgba(46, 204, 113, 0.8)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2
      },
      {
        label: 'Không tái chế',
        data: weeklyStats.nonRecyclable,
        backgroundColor: 'rgba(231, 76, 60, 0.8)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 2
      }
    ]
  };

  const hourlyChartData = {
    labels: hourlyStats.labels,
    datasets: [
      {
        label: 'Số lượng',
        data: hourlyStats.data,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="charts-grid">
      <div className="chart-card animate-slide-up">
        <h3>
          <PieChart size={20} /> Phân loại trong tuần
        </h3>
        <Bar data={weeklyChartData} options={chartOptions} />
      </div>

      <div className="chart-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3>
          <BarChart3 size={20} /> Hoạt động theo giờ
        </h3>
        <Line data={hourlyChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Charts;
