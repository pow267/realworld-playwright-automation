"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("I AM IN THE SEEDER!");
    const allUsers = await User.findAll();
    const users = allUsers.filter(user => user.email !== 'user@gmail.com');
    const articlesPerUser = 15;

    const articles = users.flatMap((user) =>
      Array.from({ length: articlesPerUser }, (_, index) => ({
        slug: `${user.username.toLowerCase()}-${index + 1}`,
        title: `${user.username} ${index + 1}`,
        description: `${user.username} article ${index + 1} description.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    await queryInterface.bulkInsert("Articles", articles, {});

    const { Article, Tag } = require("../models");
    
    const defaultTags = ["playwright", "automation", "testing", "sqa"];
    for (const tagName of defaultTags) {
      await Tag.findOrCreate({ where: { name: tagName } });
    }

    const tagsInDB = await Tag.findAll();
    const createdArticles = await Article.findAll();

    for (let i = 0; i < createdArticles.length; i++) {
        const article = createdArticles[i];
        // Add 1 or 2 random tags to each article
        const numTags = Math.floor(Math.random() * 2) + 1;
        const shuffledTags = tagsInDB.sort(() => 0.5 - Math.random());
        const selectedTags = shuffledTags.slice(0, numTags);
        await article.addTagList(selectedTags);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
