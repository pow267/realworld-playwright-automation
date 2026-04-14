# RealWorld Playwright Automation

Dự án này chứa bộ kịch bản kiểm thử tự động toàn diện (UI và API) cho ứng dụng Conduit/RealWorld sử dụng cấu trúc Playwright.

## Cấu trúc dự án

- `/pages`: Quản lý các thành phần theo mô hình Page Object Model (POM).
- `/tests`: Các kịch bản kiểm thử API, kiểm thử UI bao gồm luồng Đăng nhập, và quản trị nội dung (Article CRUD).
- `/data`: Vị trí quản lý dữ liệu kiểm thử tĩnh.
- `/fixtures`: Các pre-conditions (như xác thực session token và thiết lập trạng thái DB trước mỗi ca test).
- `/allure-report`: Kết quả báo cáo sau khi chạy bộ test.

### AUTOMATION TEST PLAN

### **1. Scope of Automation Testing**

#### **1.1 API Testing**

Tập trung kiểm thử các endpoint cốt lõi của hệ thống:

* Authentication (Login, Register)
* User & Authorization (JWT validation)
* Article API (CRUD operations)
* System API (Database Restore)

Mục tiêu:

* Xác nhận tính đúng đắn của business logic backend
* Đảm bảo response status và data trả về đúng theo expected

---

#### **1.2 UI Testing (End-to-End)**

Kiểm thử các luồng nghiệp vụ chính từ góc nhìn người dùng:

* Đăng ký / Đăng nhập
* Tạo bài viết (Create)
* Cập nhật bài viết (Update)
* Xóa bài viết (Delete)
* Tương tác bài viết (Favorite, Comment…)

Mục tiêu:

* Xác nhận hệ thống hoạt động đúng từ UI → API → Database
* Đảm bảo trải nghiệm người dùng không bị lỗi

---

### **2. Automation Strategy**

* Sử dụng **Playwright** cho cả UI và API testing
* Áp dụng **Page Object Model (POM)** cho UI
* Dùng **Fixtures** để:
* Tái sử dụng data
* Lưu token (authentication)
* Test được thiết kế:
* Độc lập (independent)
* Có thể chạy song song (parallel execution)
* Reset data trước test bằng API `/api/restore`


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

© 2026 RealWorld Automation Project
