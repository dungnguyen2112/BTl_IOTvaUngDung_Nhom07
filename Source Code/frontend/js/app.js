// Smart Trash Monitor Application

// Authentication credentials (mock)
const AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Current user
let currentUser = null;
let weeklyChart = null;
let hourlyChart = null;
let activityInterval = null;

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserSpan = document.getElementById('currentUser');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showDashboard();
    }

    // Setup event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
});

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        showDashboard();
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Stop activity simulation
        if (activityInterval) {
            clearInterval(activityInterval);
        }
        
        // Destroy charts
        if (weeklyChart) weeklyChart.destroy();
        if (hourlyChart) hourlyChart.destroy();
        
        showLogin();
    }
}

// Show login page
function showLogin() {
    loginPage.classList.add('active');
    dashboardPage.classList.remove('active');
    loginForm.reset();
}

// Show dashboard
function showDashboard() {
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
    currentUserSpan.textContent = currentUser;
    
    // Initialize dashboard
    initDashboard();
}

// Initialize dashboard
function initDashboard() {
    // Update statistics
    updateStatistics();
    
    // Render bins
    renderBins();
    
    // Render activity table
    renderActivityTable();
    
    // Initialize charts
    initCharts();
    
    // Start real-time simulation (new activity every 10 seconds)
    activityInterval = setInterval(() => {
        addNewActivity();
    }, 10000);
}

// Update statistics
function updateStatistics() {
    const recyclableCount = window.mockData.activityLog.filter(a => a.type === 'recyclable').length;
    const nonRecyclableCount = window.mockData.activityLog.filter(a => a.type === 'non-recyclable').length;
    const totalCount = recyclableCount + nonRecyclableCount;
    
    // Calculate average AI accuracy
    const avgAccuracy = totalCount > 0 
        ? (window.mockData.activityLog.reduce((sum, a) => sum + a.confidence, 0) / totalCount).toFixed(1)
        : 0;
    
    // Update UI with animation
    animateValue('recyclableCount', 0, recyclableCount, 1000);
    animateValue('nonRecyclableCount', 0, nonRecyclableCount, 1000);
    animateValue('totalCount', 0, totalCount, 1000);
    animateValue('aiAccuracy', 0, avgAccuracy, 1000, '%');
}

// Animate number counting
function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Render trash bins
function renderBins() {
    const binsGrid = document.getElementById('binsGrid');
    binsGrid.innerHTML = '';
    
    window.mockData.trashBins.forEach(bin => {
        const binCard = createBinCard(bin);
        binsGrid.appendChild(binCard);
    });
}

// Create bin card element
function createBinCard(bin) {
    const card = document.createElement('div');
    card.className = 'bin-card';
    card.innerHTML = `
        <div class="bin-header">
            <div class="bin-name">${bin.name}</div>
            <span class="bin-status ${bin.status}">${getStatusText(bin.status)}</span>
        </div>
        <div class="bin-level">
            <div class="bin-level-label">
                <span>Mức đầy:</span>
                <strong>${bin.level}%</strong>
            </div>
            <div class="progress-bar">
                <div class="progress-fill ${getLevelClass(bin.level)}" style="width: ${bin.level}%"></div>
            </div>
        </div>
        <div class="bin-details">
            <div class="bin-detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${bin.location}</span>
            </div>
            <div class="bin-detail-item">
                <i class="fas fa-cube"></i>
                <span>${bin.itemsToday} items hôm nay</span>
            </div>
            <div class="bin-detail-item">
                <i class="fas fa-clock"></i>
                <span>${bin.lastCleaned}</span>
            </div>
            <div class="bin-detail-item">
                <i class="fas fa-tag"></i>
                <span>${bin.type === 'recyclable' ? 'Tái chế' : 'Không tái chế'}</span>
            </div>
        </div>
    `;
    return card;
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        'active': 'Hoạt động',
        'warning': 'Cảnh báo',
        'full': 'Đầy'
    };
    return statusMap[status] || status;
}

// Get level class for progress bar
function getLevelClass(level) {
    if (level < 50) return 'low';
    if (level < 80) return 'medium';
    return 'high';
}

// Render activity table
function renderActivityTable() {
    const tableBody = document.getElementById('activityTable');
    tableBody.innerHTML = '';
    
    // Show last 15 activities
    const recentActivities = window.mockData.activityLog.slice(0, 15);
    
    recentActivities.forEach(activity => {
        const row = createActivityRow(activity);
        tableBody.appendChild(row);
    });
}

// Create activity table row
function createActivityRow(activity) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${activity.timestamp}</td>
        <td>
            <span class="badge ${activity.type}">
                ${activity.type === 'recyclable' ? 'Tái chế' : 'Không tái chế'}
            </span>
        </td>
        <td>${activity.item}</td>
        <td>
            <span class="${getConfidenceClass(activity.confidence)}">
                ${activity.confidence}%
            </span>
        </td>
        <td>${activity.binName}</td>
        <td>
            <span class="badge ${activity.status}">
                ${activity.status === 'success' ? 'Thành công' : 'Thất bại'}
            </span>
        </td>
    `;
    return row;
}

// Get confidence class
function getConfidenceClass(confidence) {
    if (confidence >= 90) return 'confidence-high';
    if (confidence >= 75) return 'confidence-medium';
    return 'confidence-low';
}

// Add new activity (simulation)
function addNewActivity() {
    const newActivity = window.mockData.generateRandomActivity();
    window.mockData.activityLog.unshift(newActivity);
    
    // Keep only last 100 activities
    if (window.mockData.activityLog.length > 100) {
        window.mockData.activityLog.pop();
    }
    
    // Update UI
    updateStatistics();
    renderBins();
    renderActivityTable();
    
    // Show notification
    showNotification(newActivity);
}

// Show notification for new activity
function showNotification(activity) {
    // Simple console notification (you can enhance this with toast notifications)
    console.log(`Phát hiện mới: ${activity.item} (${activity.type}) - ${activity.confidence}% confidence`);
}

// Initialize charts
function initCharts() {
    // Weekly chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    weeklyChart = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: window.mockData.weeklyStats.labels,
            datasets: [
                {
                    label: 'Tái chế',
                    data: window.mockData.weeklyStats.recyclable,
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Không tái chế',
                    data: window.mockData.weeklyStats.nonRecyclable,
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Hourly chart
    const hourlyCtx = document.getElementById('hourlyChart').getContext('2d');
    hourlyChart = new Chart(hourlyCtx, {
        type: 'line',
        data: {
            labels: window.mockData.hourlyStats.labels,
            datasets: [{
                label: 'Số lượng',
                data: window.mockData.hourlyStats.data,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Utility function to format date
function formatDate(date) {
    return new Date(date).toLocaleString('vi-VN');
}

// Export functions for testing
window.app = {
    handleLogin,
    handleLogout,
    updateStatistics,
    renderBins,
    renderActivityTable,
    addNewActivity
};
