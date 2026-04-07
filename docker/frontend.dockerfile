FROM node:20-alpine

WORKDIR /app

# Copy các tập tin cấu hình cần thiết để cài đặt cho Workspace Frontend
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Cài đặt tập trung cho folder frontend để đảm bảo có đủ các binary của Vite (esbuild, v.v.)
WORKDIR /app/frontend
RUN npm install

# Quay lại thư mục gốc để copy toàn bộ code
WORKDIR /app
COPY . .

# Tiến vào thư mục frontend để chạy server
WORKDIR /app/frontend
EXPOSE 3000

# Chạy server với --host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
