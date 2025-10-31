# Smart Trash Monitor - React App

Hệ thống giám sát thùng rác thông minh được xây dựng bằng **React.js** với AI nhận diện hình ảnh để phân loại rác tái chế.

## 🚀 Bắt đầu

### Cài đặt dependencies

```bash
npm install
```

### Chạy ứng dụng

```bash
npm start
```

Ứng dụng sẽ mở tại [http://localhost:3000](http://localhost:3000)

### Build cho production

```bash
npm run build
```

## 🎯 Tính năng

✅ **Xác thực người dùng** - Login với tài khoản demo  
✅ **Dashboard realtime** - Giám sát trạng thái thùng rác  
✅ **Thống kê thông minh** - Số liệu tái chế/không tái chế  
✅ **6 Thùng rác** - Hiển thị mức độ đầy và trạng thái  
✅ **Lịch sử hoạt động** - Bảng chi tiết các lần phân loại  
✅ **Biểu đồ trực quan** - Charts.js cho thống kê  
✅ **Mock data** - Dữ liệu mẫu tự động sinh  
✅ **Real-time simulation** - Cập nhật tự động mỗi 10 giây  
✅ **Responsive design** - Tương thích mọi thiết bị  

## 🔐 Đăng nhập

- **Username**: `admin`
- **Password**: `admin123`

## 📁 Cấu trúc project

```
BTL_IOT/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── Header.js
│   │   ├── StatisticsCards.js
│   │   ├── BinsGrid.js
│   │   ├── ActivityTable.js
│   │   └── Charts.js
│   ├── data/
│   │   └── mockData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Công nghệ

- **React 18** - UI Framework
- **Chart.js** - Biểu đồ thống kê
- **react-chartjs-2** - React wrapper cho Chart.js
- **lucide-react** - Icon library hiện đại
- **LocalStorage** - Lưu trạng thái đăng nhập

## 📊 Mock Data

- **6 thùng rác** tại 3 vị trí khác nhau
- **8 loại rác tái chế**: Chai nhựa, lon nước, giấy, v.v.
- **8 loại rác không tái chế**: Túi nilon, hộp xốp, pin, v.v.
- **Độ chính xác AI**: 75-99%
- **Tự động sinh hoạt động** mỗi 10 giây

## 🎨 Giao diện

### Login Page
- Form đăng nhập đẹp mắt với gradient background
- Validation và error handling
- Animation mượt mà

### Dashboard
- **Header**: Logo, user info, logout button
- **Statistics Cards**: 4 cards với icon và số liệu
- **Bins Grid**: 6 thùng rác với progress bar
- **Activity Table**: 15 hoạt động gần nhất
- **Charts**: Bar chart (tuần) và Line chart (giờ)

## 🔄 Real-time Features

- Tự động thêm hoạt động mới mỗi 10 giây
- Cập nhật mức độ đầy thùng rác
- Thay đổi trạng thái (Active → Warning → Full)
- Cập nhật thống kê và biểu đồ

## 🌟 Component Structure

- **App.js**: Main component, quản lý authentication
- **Login**: Form đăng nhập
- **Dashboard**: Container cho các component con
- **Header**: Navigation bar
- **StatisticsCards**: 4 cards thống kê
- **BinsGrid**: Hiển thị 6 thùng rác
- **ActivityTable**: Bảng hoạt động
- **Charts**: Biểu đồ thống kê

## 💡 Mở rộng trong tương lai

1. **Backend Integration**
   - REST API
   - WebSocket cho real-time
   - Database (MongoDB/PostgreSQL)

2. **AI Integration**
   - Kết nối model AI thật
   - Upload ảnh để phân loại
   - Training và fine-tuning

3. **Advanced Features**
   - Phân quyền user (Admin/User/Viewer)
   - Notifications (Email/Push/SMS)
   - Reports (PDF/Excel export)
   - Mobile app (React Native)

4. **IoT Integration**
   - Kết nối với sensors thật
   - MQTT protocol
   - Edge computing

## 🐛 Troubleshooting

Nếu gặp lỗi khi cài đặt:

```bash
# Xóa node_modules và lock file
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

## 📝 License

MIT License - Dự án BTL IoT

---

**Made with ❤️ and ♻️ for a greener future!**
