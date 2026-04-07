require("dotenv").config({ path: require("path").resolve(__dirname, "..", ".env") });
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const errorHandler = require("./middleware/errorHandler");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec); // Biến exec thành Promise để AWAIT được

const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const articlesRoutes = require("./routes/articles");
const profilesRoutes = require("./routes/profiles");
const tagsRoutes = require("./routes/tags");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Connection with ${env} database has been established.`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/dist"));
} else {
  app.get("/", (req, res) => res.json({ status: "API is running on /api" }));
}

// [TEST ONLY] API to RESET
app.get("/api/reset", async (req, res) => {
  try {
    await sequelize.query(`
      TRUNCATE TABLE "Comments", "TagList", "Favorites", "Followers", "Articles", "Tags", "Users" 
      RESTART IDENTITY CASCADE;
    `);
    res.status(200).json({ message: "All tables have been TRUNCATED successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// [TEST ONLY] API to SEED (CHỜ ĐỢI 100% TRƯỚC KHI BÁO OK)
app.get("/api/seed", async (req, res) => {
  try {
    // 1. Truncate sạch sẽ
    await sequelize.query(`
      TRUNCATE TABLE "Comments", "TagList", "Favorites", "Followers", "Articles", "Tags", "Users" 
      RESTART IDENTITY CASCADE;
    `);

    // 2. PHẢI DÙNG AWAIT ĐỂ ĐỢI SEED XONG MỚI TRẢ VỀ CHO PLAYWRIGHT
    console.log("Start seeding...");
    const { stdout, stderr } = await exec("npx sequelize-cli db:seed:all");
    console.log("Seed finished!");

    res.status(200).json({ message: "Database has been CLEANSED and SEEDED successfully.", output: stdout });
  } catch (error) {
    res.status(500).json({ error: "Seed process CRASHED", details: error.message });
  }
});

app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/tags", tagsRoutes);

app.get("/*any", (req, res) =>
  res.status(404).json({ errors: { body: ["Not found"] } }),
);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
