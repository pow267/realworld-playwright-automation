"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Mã hóa mật khẩu mẫu
    const hashedPassword = bcrypt.hashSync("123456", 10);

    const users = Array(5)
      .fill(null)
      .map((_, index) => ({
        username: `exampleUser${index + 1}`,
        email: `example${index + 1}@mail.com`,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // Thêm các tài khoản theo yêu cầu (Cũng đã mã hóa)
    const extraUsers = [
      {
        username: "Tester",
        email: "test@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user",
        email: "user@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    users.push(...extraUsers);

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
