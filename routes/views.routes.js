const { createViewPage } = require("../helpers/create_view_page");
const topicsModel = require("../schemas/Topic");
const dictModel = require("../schemas/Dict");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/authors", (req, res) => {
  res.render(createViewPage("authors"), {
    title: "Mualliflar",
    isAuthor: true,
  });
});

router.get("/dictionary", async (req, res) => {
  let dictionaries = await dictModel.find().lean();
  console.log(dictionaries)

  res.render(createViewPage("dictionary"), {
    title: "Lug'atlar",
    isDict: true,
    dictionaries,
  });
});

router.get("/topics", async (req, res) => {
  let topics = await topicsModel.find().lean();
  console.log(topics)
  res.render(createViewPage("topics"), {
    title: "Maqolalar",
    isTopic: true,
    topics,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Tizimga kirish",
    isLogin: true,
  });
});

module.exports = router;
