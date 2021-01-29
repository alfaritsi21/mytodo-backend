const route = require("express").Router();


const users = require("./users");
const labels = require("./labels");
const todos = require("./todos");



route.use("/users", users);
route.use("/labels", labels);
route.use("/todos", todos);



module.exports = route;
