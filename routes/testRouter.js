const { Router } = require("express");
const testRouter = Router();
const db = require("../databaseInterface");
// endpoint to get all posts
testRouter.get("/hello", (req, res) => {
  res.json({
    message: "Hello, World!",
    status: "success",
    data: {
      greeting: "Welcome to the Kufu-2.0 API!",
    },
  });
});

testRouter.get("/test", async (req, res) => {
  var posts = await db.executeSql("SELECT * FROM products", []);
  console.log(posts);
  res.json(posts);
});

testRouter.get("/get-notion-data", async (req, res) => {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_POST_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Status",
            status: {
              equals: "公開中",
            },
          },
          {
            property: "Category",
            select: {
              equals: "🛸テスト記事",
            },
          },
        ],
      },
    });
    res.json(response.results);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    res.status(500).json({ error: "Failed to fetch Notion data" });
  }
});

module.exports = testRouter;
