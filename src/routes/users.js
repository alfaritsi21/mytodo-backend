const router = require("express").Router();
const { registerUser, loginUser, getAll, update, deleteData } = require("../controller/users");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getAll);
router.patch("/:id", update);
router.delete("/:id", deleteData);



module.exports = router;
