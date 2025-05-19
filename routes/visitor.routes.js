const {
  add,
  findAll,
  findById,
  update,
  remove,
} = require("../controllers/visitor.controller");

const router = require("express").Router();

router.post("/", add);
router.get("/", findAll);
router.get("/:id", findById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
