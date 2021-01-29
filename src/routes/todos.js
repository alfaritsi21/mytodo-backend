const router = require("express").Router();
const { getAll, getById, create, update, deleteData } = require("../controller/todos");
const { authorization } = require("../middleware/auth");

router.get("/", authorization, getAll);
router.get("/:id", getById);
router.post("/", authorization, create);
router.patch("/:id", update);
router.delete("/:id", deleteData)



module.exports = router;
