// Mock Data for Smart Trash Monitor System

// Danh sách các loại rác có thể phân loại
const trashTypes = {
    recyclable: [
        'Chai nhựa', 'Lon nước ngọt', 'Giấy báo', 'Hộp giấy', 
        'Chai thủy tinh', 'Kim loại', 'Bìa carton', 'Túi giấy'
    ],
    nonRecyclable: [
        'Túi nilon', 'Hộp xốp', 'Bóng đèn', 'Pin', 
        'Thức ăn thừa', 'Giấy ăn', 'Rơm hút', 'Bao bì phức hợp'
    ]
};

// Danh sách thùng rác
const trashBins = [
    {
        id: 'BIN-001',
        name: 'Thùng rác tái chế A',
        location: 'Tầng 1 - Khu A',
        type: 'recyclable',
        level: 35,
        capacity: 100,
        status: 'active',
        lastCleaned: '2025-10-31 08:00',
        itemsToday: 0
    },
    {
        id: 'BIN-002',
        name: 'Thùng rác không tái chế A',
        location: 'Tầng 1 - Khu A',
        type: 'non-recyclable',
        level: 52,
        capacity: 100,
        status: 'active',
        lastCleaned: '2025-10-31 08:00',
        itemsToday: 0
    },
    {
        id: 'BIN-003',
        name: 'Thùng rác tái chế B',
        location: 'Tầng 2 - Khu B',
        type: 'recyclable',
        level: 78,
        capacity: 100,
        status: 'warning',
        lastCleaned: '2025-10-31 07:30',
        itemsToday: 0
    },
    {
        id: 'BIN-004',
        name: 'Thùng rác không tái chế B',
        location: 'Tầng 2 - Khu B',
        type: 'non-recyclable',
        level: 92,
        capacity: 100,
        status: 'full',
        lastCleaned: '2025-10-31 07:30',
        itemsToday: 0
    },
    {
        id: 'BIN-005',
        name: 'Thùng rác tái chế C',
        location: 'Tầng 3 - Khu C',
        type: 'recyclable',
        level: 18,
        capacity: 100,
        status: 'active',
        lastCleaned: '2025-10-31 09:00',
        itemsToday: 0
    },
    {
        id: 'BIN-006',
        name: 'Thùng rác không tái chế C',
        location: 'Tầng 3 - Khu C',
        type: 'non-recyclable',
        level: 45,
        capacity: 100,
        status: 'active',
        lastCleaned: '2025-10-31 09:00',
        itemsToday: 0
    }
];

// Dữ liệu hoạt động (sẽ được sinh tự động)
let activityLog = [];

// Dữ liệu thống kê theo tuần
const weeklyStats = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
    recyclable: [45, 52, 38, 61, 55, 42, 35],
    nonRecyclable: [32, 41, 29, 38, 45, 31, 28]
};

// Dữ liệu hoạt động theo giờ (24h)
const hourlyStats = {
    labels: Array.from({length: 24}, (_, i) => `${i}:00`),
    data: [
        2, 1, 0, 0, 1, 3, 8, 15, 12, 10, 14, 18,
        22, 20, 16, 19, 23, 21, 18, 14, 10, 8, 5, 3
    ]
};

// Hàm tạo hoạt động ngẫu nhiên
function generateRandomActivity() {
    const isRecyclable = Math.random() > 0.5;
    const types = isRecyclable ? trashTypes.recyclable : trashTypes.nonRecyclable;
    const item = types[Math.floor(Math.random() * types.length)];
    const confidence = 75 + Math.floor(Math.random() * 25); // 75-99%
    
    // Chọn thùng rác phù hợp
    const suitableBins = trashBins.filter(bin => 
        bin.type === (isRecyclable ? 'recyclable' : 'non-recyclable') && 
        bin.status !== 'full'
    );
    const bin = suitableBins[Math.floor(Math.random() * suitableBins.length)];
    
    const now = new Date();
    const activity = {
        id: Date.now() + Math.random(),
        timestamp: now.toLocaleString('vi-VN'),
        type: isRecyclable ? 'recyclable' : 'non-recyclable',
        item: item,
        confidence: confidence,
        binId: bin.id,
        binName: bin.name,
        status: 'success'
    };
    
    // Cập nhật level của thùng rác
    const binIndex = trashBins.findIndex(b => b.id === bin.id);
    if (binIndex !== -1) {
        trashBins[binIndex].level = Math.min(100, trashBins[binIndex].level + Math.floor(Math.random() * 3) + 1);
        trashBins[binIndex].itemsToday++;
        
        // Cập nhật trạng thái
        if (trashBins[binIndex].level >= 90) {
            trashBins[binIndex].status = 'full';
        } else if (trashBins[binIndex].level >= 70) {
            trashBins[binIndex].status = 'warning';
        } else {
            trashBins[binIndex].status = 'active';
        }
    }
    
    return activity;
}

// Hàm tạo dữ liệu hoạt động ban đầu
function generateInitialActivities(count = 20) {
    const activities = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const activity = generateRandomActivity();
        // Điều chỉnh thời gian để có các hoạt động trong quá khứ
        const pastTime = new Date(now.getTime() - (count - i) * 3 * 60 * 1000); // Mỗi hoạt động cách nhau 3 phút
        activity.timestamp = pastTime.toLocaleString('vi-VN');
        activities.push(activity);
    }
    
    return activities.reverse(); // Hoạt động mới nhất ở đầu
}

// Khởi tạo dữ liệu
activityLog = generateInitialActivities(30);

// Export data
window.mockData = {
    trashTypes,
    trashBins,
    activityLog,
    weeklyStats,
    hourlyStats,
    generateRandomActivity,
    generateInitialActivities
};
