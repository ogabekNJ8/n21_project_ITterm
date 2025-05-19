let router;

router = require("express").Router();

router.use("/dict", require("./dict.routes"));
router.use("/category", require("./category.routes"));
router.use("/social", require("./social.route"));
router.use("/description", require("./description.routes"));
router.use("/synonym", require("./synonym.routes"));
router.use("/author", require("./author.routes"));
router.use("/tag", require("./tag.routes"));
router.use("/topic", require("./topic.routes"));
router.use("/desc_topic", require("./desc_topic.routes"));
router.use("/user", require("./user.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/visitor", require("./visitor.routes"));

module.exports = router;
