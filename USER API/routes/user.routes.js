const express = require("express");

const {
    createUser,
    getAllusers,
    deleteUser,
    loginUser
} = require("../controller/user.controller");

const routes = express.Router();

 
routes.post("/user", createUser);
routes.get("/user", getAllusers);
routes.delete("/user", deleteUser );
routes.post("/login", loginUser);

module.exports = routes;