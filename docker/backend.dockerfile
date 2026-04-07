FROM node:20-alpine

WORKDIR /app

# Copy các tập tin package chính
COPY package*.json ./
COPY backend/package*.json ./backend/

# Cài đặt dependencies cho backend (bao gồm cả sequelize-cli)
WORKDIR /app/backend
RUN npm install

# Copy toàn bộ mã nguồn
WORKDIR /app
COPY . .

# Tiến vào thư mục backend
WORKDIR /app/backend
EXPOSE 3001


CMD ["sh", "-c", "rm -rf migrations && node index.js"]
