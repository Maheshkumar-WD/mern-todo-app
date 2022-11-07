const express = require("express");
const { userControllers } = require("../controllers/user.controller");
const userRoute = express.Router();
userRoute.get("/", userControllers.getUser);
userRoute.post("/signup", userControllers.postUser);
userRoute.post("/login",userControllers.login);
module.exports = { userRoute };

