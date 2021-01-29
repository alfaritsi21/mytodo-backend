const router = require("express").Router();
const { getAll, create, update, deleteData } = require("../controller/labels");

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", deleteData)



module.exports = router;
