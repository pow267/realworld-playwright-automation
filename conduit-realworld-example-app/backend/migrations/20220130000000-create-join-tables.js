"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tạo bảng TagList
    await queryInterface.createTable("TagList", {
      articleId: {
        type: Sequelize.INTEGER,
        references: { model: "Articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: { model: "Tags", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    // 2. Tạo bảng Favorites
    await queryInterface.createTable("Favorites", {
      articleId: {
        type: Sequelize.INTEGER,
        references: { model: "Articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    // 3. Tạo bảng Followers (Người theo dõi)
    await queryInterface.createTable("Followers", {
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      followerId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TagList");
    await queryInterface.dropTable("Favorites");
    await queryInterface.dropTable("Followers");
  },
};
