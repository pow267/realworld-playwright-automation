# Sử dụng image chính thức đã tối ưu cho Playwright (Node Version 20+)
FROM mcr.microsoft.com/playwright:v1.42.0-jammy

# 1. Cài đặt các thư viện cần thiết cho Allure (Yêu cầu có Java JRE)
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless curl unzip && \
    apt-get clean

# 2. Cài đặt Allure Commandline bản mới nhất (2.27.0)
RUN curl -o allure.zip -L https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.zip && \
    unzip allure.zip -d /opt/ && \
    ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure && \
    rm allure.zip

# Thiết lập thư mục làm việc trong container là /playwright
WORKDIR /playwright

# Copy file package của bạn để cài đặt các package Node.js
COPY ./package*.json ./

# Cài đặt các package của Node.js (axios, playwright + allure-playwright)
RUN npm install && \
    npm install --save-dev allure-playwright

# Cài đặt các browser cần thiết cho Playwright
RUN npx playwright install --with-deps

# Copy toàn bộ code test vào trong folder /playwright của container
COPY . .

# Mặc định container này sẽ đợi hoặc chạy test, chúng ta sẽ để lệnh mặc định chạy test.
# Sau khi chạy test xong, bạn có thể sinh và xem report.
CMD ["sh", "-c", "npx playwright test && allure generate allure-results --clean -o allure-report"]
