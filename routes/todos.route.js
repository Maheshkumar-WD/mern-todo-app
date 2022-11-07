const express = require("express");
const { todoControllers } = require("../controllers/todo.controller");

const todoRoute = express.Router();

todoRoute.get("/", todoControllers.getTodos);
todoRoute.post("/addtodo", todoControllers.postTodo);
todoRoute.patch("/update/:id", todoControllers.updateTodo);
todoRoute.get("/getonetodo", todoControllers.getOneTodo);
todoRoute.delete("/delete/:id", todoControllers.deleteTodo);

module.exports = { todoRoute };
