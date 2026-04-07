# RealWorld Playwright Automation

Dự án này chứa bộ kịch bản kiểm thử tự động toàn diện (UI và API) cho ứng dụng Conduit/RealWorld sử dụng cấu trúc Playwright.

## Cấu trúc dự án
- `/pages`: Quản lý các thành phần theo mô hình Page Object Model (POM).
- `/tests`: Các kịch bản kiểm thử API, kiểm thử UI bao gồm luồng Đăng nhập, và quản trị nội dung (Article CRUD).
- `/data`: Vị trí quản lý dữ liệu kiểm thử tĩnh.
- `/fixtures`: Các pre-conditions (như xác thực session token và thiết lập trạng thái DB trước mỗi ca test).
- `/allure-report`: Kết quả báo cáo sau khi chạy bộ test.

## Hướng dẫn chạy hệ thống Web (Local/Docker)
1. Tải về và cài đặt Docker Desktop: `https://www.docker.com/`
2. Clone repo này về: `git clone https://github.com/pow267/realworld-playwright-automation.git`
3. Di chuyển vào trong thư mục gốc dự án.
4. Dùng lệnh docker compose để tạo lập Back-end và cơ sở dữ liệu: `docker-compose up -d --build`

## Hướng dẫn dùng Playwright
1. Cài đặt các packages phụ thuộc: `npm install`
2. Cài đặt Playwright cùng trình duyệt web: `npx playwright install --with-deps`
3. Lệnh chạy test cơ sở: `npm test`
4. Lệnh chạy chu trình test toàn diện (bao gồm xóa dữ liệu cũ và tổng hợp lại báo cáo): `npm run full-test`
5. Xem lại báo cáo định dạng HTML: `npm run allure:serve`
## Kế hoạch và Kịch bản Kiểm thử (Test Plan & Test Cases)

### 1. Phạm vi kiểm thử (Scope)
- **API Testing**: Kiểm thử các Endpoints cốt lõi (Authentication, User Management, Database Restore).
- **UI Testing**: Các luồng End-to-End từ giao diện (Đăng ký, Đăng nhập, Quản lý Article CRUD).

### 2. Danh sách Test Cases tiêu biểu
- **TS_01: Xác thực người dùng (Authentication)**
  - TC_01.1: Đăng nhập thành công, sinh session token (lưu qua fixture).
  - TC_01.2: Hiển thị lỗi tường minh khi sai thông tin đăng nhập.
  - TC_01.3: Đăng ký tạo người thủ thành công.
- **TS_02: Quản lý Bài Viết (Article CRUD)**
  - TC_02.1: Viết và đăng xuất bản một bài viết mới thành công.
  - TC_02.2: Bắt lỗi chặn Duplicate Title từ backend khi tạo bài trùng lặp.
  - TC_02.3: Mở form Edit và cập nhật dữ liệu của bài viết cũ.
  - TC_02.4: Xác nhận hộp thoại Dialog khi Xóa bài viết và đảm bảo data bị gỡ khỏi UI.
- **TS_03: Kiểm thử Backend API**
  - TC_03.1: Khôi phục CSDL nền (`/api/restore`) thành không trước mỗi luồng chạy giả lập.
  - TC_03.2: Đảm bảo mã trả về 200 OK trên các API bảo vệ hợp lệ (gắn JWT headers).
  - TC_03.3: Lọc trả status 401 Unauthorized khi can thiệp API với mã token giả mạo.


© 2026 RealWorld Automation Project
