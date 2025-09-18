# Dự án Đặt Món Ăn Online

Một ứng dụng web đặt món ăn trực tuyến được xây dựng với Node.js, Express và Pug template engine.

## Tính năng

### Cho khách hàng:
- 🏠 **Trang chủ**: Xem danh sách món ăn với tìm kiếm và lọc theo danh mục
- 🛒 **Đặt món**: Thêm món ăn vào giỏ hàng với số lượng tùy chỉnh
- 👤 **Đăng nhập**: Hệ thống xác thực đơn giản
- 📱 **Responsive**: Giao diện thân thiện trên mọi thiết bị

### Cho quản trị viên:
- 📊 **Dashboard**: Thống kê tổng quan về đơn hàng và doanh thu
- 🍽️ **Quản lý món ăn**: Thêm, sửa, xóa món ăn
- 📋 **Quản lý đơn hàng**: Xem và cập nhật trạng thái đơn hàng
- 🔍 **Tìm kiếm và lọc**: Tìm kiếm đơn hàng theo nhiều tiêu chí

## Cài đặt và chạy

### Yêu cầu hệ thống:
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Các bước cài đặt:

1. **Clone hoặc tải dự án về máy**

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

4. **Truy cập ứng dụng:**
   - Mở trình duyệt và truy cập: `http://localhost:8080`

## Tài khoản demo

### Admin:
- **Username:** `admin`
- **Password:** `admin123`
- **Quyền:** Quản lý toàn bộ hệ thống

### User:
- **Username:** `user1`
- **Password:** `user123`
- **Quyền:** Đặt món ăn

## Cấu trúc dự án

```
project_DatMonAnhOnline/
├── index.js                 # File chính của ứng dụng
├── package.json            # Thông tin dự án và dependencies
├── views/                  # Pug templates
│   ├── layout.pug         # Layout chính
│   ├── login.pug          # Trang đăng nhập
│   ├── home.pug           # Trang chủ
│   └── admin/             # Trang admin
│       ├── dashboard.pug  # Dashboard admin
│       ├── foods.pug      # Quản lý món ăn
│       └── orders.pug     # Quản lý đơn hàng
├── public/                # Static files
│   ├── css/
│   │   └── style.css     # CSS chính
│   ├── js/
│   │   └── main.js       # JavaScript chính
│   └── images/           # Hình ảnh
└── README.md             # File hướng dẫn này
```

## Công nghệ sử dụng

### Backend:
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Express-session**: Quản lý session
- **Pug**: Template engine

### Frontend:
- **HTML5**: Cấu trúc trang
- **CSS3**: Styling với Flexbox và Grid
- **JavaScript (ES6+)**: Tương tác người dùng
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## API Endpoints

### Authentication:
- `GET /login` - Trang đăng nhập
- `POST /login` - Xử lý đăng nhập
- `GET /logout` - Đăng xuất

### Public:
- `GET /` - Trang chủ
- `GET /api/foods` - Lấy danh sách món ăn

### Protected (cần đăng nhập):
- `GET /api/orders` - Lấy đơn hàng của user
- `POST /api/orders` - Tạo đơn hàng mới

### Admin only:
- `GET /admin` - Dashboard admin
- `GET /admin/foods` - Quản lý món ăn
- `GET /admin/orders` - Quản lý đơn hàng

## Tính năng nổi bật

### 🎨 Giao diện đẹp mắt:
- Thiết kế hiện đại với gradient và shadow
- Responsive design cho mọi thiết bị
- Animation mượt mà và trải nghiệm người dùng tốt

### 🔐 Bảo mật:
- Session-based authentication
- Middleware bảo vệ các route admin
- Validation form phía client và server

### 📱 Responsive:
- Mobile-first design
- Tương thích với mọi kích thước màn hình
- Touch-friendly interface

### ⚡ Performance:
- CSS và JS được tối ưu
- Lazy loading cho hình ảnh
- Efficient DOM manipulation

## Phát triển thêm

### Có thể mở rộng:
- Kết nối database (MongoDB, MySQL)
- Upload hình ảnh món ăn
- Hệ thống thanh toán
- Email notifications
- Real-time updates với Socket.io
- API documentation với Swagger

### Cải thiện:
- Unit testing với Jest
- Error handling tốt hơn
- Logging system
- Rate limiting
- Caching với Redis

## Hỗ trợ

Nếu gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue hoặc liên hệ qua email.

## License

Dự án này được phát hành dưới giấy phép MIT.
